(function () {
  "use strict";
  var frame = document.getElementById("immortal-game-viewer");
  if (!frame) return;

  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin || event.source !== frame.contentWindow) return;
    var data = event.data;
    if (!data || data.type !== "chess-viewer:height") return;
    if (!Number.isInteger(data.height) || data.height < 280 || data.height > 1600) return;
    frame.style.height = data.height + "px";
  });

  frame.addEventListener("load", function () {
    frame.contentWindow.postMessage({ type: "chess-viewer:measure" }, window.location.origin);
  });
})();
