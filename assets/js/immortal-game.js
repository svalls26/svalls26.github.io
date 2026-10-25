import { Chess } from "./vendor/chess.js";

const viewer = document.querySelector(".viewer");
const board = document.getElementById("board");
const moveList = document.getElementById("move-list");
const status = document.getElementById("position-status");
const playButton = document.getElementById("play");
const controls = Object.fromEntries(["first", "previous", "next", "last", "flip"].map(id => [id, document.getElementById(id)]));
const names = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" };
let lastHeight = 0;

function reportHeight() {
  const height = Math.ceil(viewer.getBoundingClientRect().height) + 2;
  if (window.parent !== window && height !== lastHeight) {
    lastHeight = height;
    window.parent.postMessage({ type: "chess-viewer:height", height }, window.location.origin);
  }
}

if ("ResizeObserver" in window) new ResizeObserver(reportHeight).observe(viewer);
window.addEventListener("resize", reportHeight);
window.addEventListener("message", event => {
  if (event.origin === window.location.origin && event.source === window.parent && event.data?.type === "chess-viewer:measure") {
    lastHeight = 0;
    reportHeight();
  }
});

async function start() {
  const response = await fetch(new URL("../chess/immortal-game.pgn", import.meta.url));
  if (!response.ok) throw new Error("PGN could not load");
  const game = new Chess();
  game.loadPgn(await response.text());
  const moves = game.history({ verbose: true });
  const positions = [new Chess().fen(), ...moves.map(move => move.after)];
  const position = new Chess();
  const moveButtons = [];
  let ply = 0;
  let orientation = "b";
  let timer = null;

  function pause() {
    clearInterval(timer);
    timer = null;
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play game");
    playButton.setAttribute("aria-pressed", "false");
    playButton.title = "Play game";
  }

  function setPlayer(id, color) {
    const element = document.getElementById(id);
    element.dataset.color = color;
    element.replaceChildren();
    const name = document.createElement("strong");
    name.textContent = color === "b" ? "Sara Valls Navarro" : "Josep Garcia Sancho";
    if (color === "w") {
      const title = document.createElement("abbr");
      title.className = "player-title";
      title.title = "FIDE Master";
      title.textContent = "FM";
      name.prepend(title, document.createTextNode(" "));
    }
    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = color === "b" ? "1879 · Black" : "2057 · White";
    element.append(name, rating);
  }

  function render() {
    position.load(positions[ply]);
    const files = orientation === "b" ? "hgfedcba" : "abcdefgh";
    const ranks = orientation === "b" ? "12345678" : "87654321";
    const lastMove = moves[ply - 1];
    const fragment = document.createDocumentFragment();
    const description = [];
    for (const rank of ranks) {
      for (const file of files) {
        const square = file + rank;
        const piece = position.get(square);
        const cell = document.createElement("div");
        const light = ("abcdefgh".indexOf(file) + Number(rank)) % 2 === 0;
        cell.className = "square " + (light ? "light" : "dark");
        cell.dataset.square = square;
        if (lastMove && (square === lastMove.from || square === lastMove.to)) cell.classList.add("last-move");
        if (piece) {
          const glyph = document.createElement("img");
          glyph.className = "piece " + (piece.color === "w" ? "white" : "black");
          glyph.src = new URL(`../images/chess/classic/${piece.color}${piece.type.toUpperCase()}.svg`, import.meta.url).href;
          glyph.alt = "";
          glyph.draggable = false;
          glyph.width = 45;
          glyph.height = 45;
          cell.append(glyph);
          const label = `${piece.color === "w" ? "White" : "Black"} ${names[piece.type]} on ${square}`;
          cell.title = label;
          description.push(label);
          if (piece.type === "k" && piece.color === position.turn() && position.isCheck()) cell.classList.add("in-check");
        }
        if (file === files[0]) {
          const coordinate = document.createElement("span");
          coordinate.className = "coordinate rank";
          coordinate.textContent = rank;
          cell.append(coordinate);
        }
        if (rank === ranks[7]) {
          const coordinate = document.createElement("span");
          coordinate.className = "coordinate file";
          coordinate.textContent = file;
          cell.append(coordinate);
        }
        cell.setAttribute("aria-hidden", "true");
        fragment.append(cell);
      }
    }
    board.replaceChildren(fragment);
    board.setAttribute("aria-label", "Chessboard. " + description.join("; ") + ".");
    setPlayer("player-top", orientation === "b" ? "w" : "b");
    setPlayer("player-bottom", orientation);

    moveButtons.forEach((button, index) => {
      if (index + 1 === ply) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    const current = moveButtons[ply - 1];
    if (current) {
      const top = current.offsetTop;
      if (top < moveList.scrollTop || top + current.offsetHeight > moveList.scrollTop + moveList.clientHeight) {
        moveList.scrollTop = top - moveList.clientHeight / 2;
      }
    } else moveList.scrollTop = 0;

    controls.first.disabled = controls.previous.disabled = ply === 0;
    controls.last.disabled = controls.next.disabled = ply === moves.length;
    status.textContent = ply === 0 ? "Starting position" : `${Math.ceil(ply / 2)}${ply % 2 ? "." : "..."} ${lastMove.san} · ${ply} / ${moves.length}`;
    if (ply === moves.length) status.textContent += " · Sara wins, 0–1";
  }

  function goTo(next) {
    pause();
    ply = Math.max(0, Math.min(moves.length, next));
    render();
  }

  let row;
  moves.forEach((move, index) => {
    if (index % 2 === 0) {
      row = document.createElement("div");
      row.className = "move-row";
      const number = document.createElement("span");
      number.className = "move-number";
      number.textContent = `${Math.floor(index / 2) + 1}.`;
      row.append(number);
      moveList.append(row);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = move.san;
    button.setAttribute("aria-label", `Move ${Math.floor(index / 2) + 1}, ${index % 2 === 0 ? "White" : "Black"}: ${move.san}`);
    button.addEventListener("click", () => goTo(index + 1));
    row.append(button);
    moveButtons.push(button);
  });

  controls.first.addEventListener("click", () => goTo(0));
  controls.previous.addEventListener("click", () => goTo(ply - 1));
  controls.next.addEventListener("click", () => goTo(ply + 1));
  controls.last.addEventListener("click", () => goTo(moves.length));
  controls.flip.addEventListener("click", () => {
    orientation = orientation === "b" ? "w" : "b";
    render();
  });
  playButton.addEventListener("click", () => {
    if (timer !== null) return pause();
    if (ply === moves.length) ply = 0;
    render();
    playButton.textContent = "Ⅱ";
    playButton.setAttribute("aria-label", "Pause game");
    playButton.setAttribute("aria-pressed", "true");
    playButton.title = "Pause game";
    timer = setInterval(() => {
      ply += 1;
      render();
      if (ply === moves.length) pause();
    }, 1100);
  });
  document.addEventListener("keydown", event => {
    const destinations = { ArrowLeft: ply - 1, ArrowRight: ply + 1, Home: 0, End: moves.length };
    if (!(event.key in destinations) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    goTo(destinations[event.key]);
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
  window.addEventListener("pagehide", pause);

  document.getElementById("game-loading").hidden = true;
  document.getElementById("game-content").hidden = false;
  render();
  reportHeight();
}

start().catch(error => {
  console.error("Could not initialize chess replay:", error);
  document.getElementById("game-loading").hidden = true;
  document.getElementById("game-error").hidden = false;
  reportHeight();
});
