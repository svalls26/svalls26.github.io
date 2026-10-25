(() => {
  const explorer = document.querySelector('[data-cue-explorer]');
  if (!explorer) return;

  const buttons = Array.from(explorer.querySelectorAll('[data-cue]'));
  const panels = Array.from(explorer.querySelectorAll('[data-cue-panel]'));
  const connections = Array.from(explorer.querySelectorAll('[data-cue-connection]'));
  const overlays = Array.from(explorer.querySelectorAll('[data-cue-overlay]'));
  const status = explorer.querySelector('[data-cue-status]');

  function selectCue(button, announce = true) {
    const cue = button.dataset.cue;
    explorer.dataset.activeCue = cue;
    buttons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.cuePanel !== cue; });
    connections.forEach(connection => {
      connection.classList.toggle('is-active', connection.dataset.cueConnection === cue);
    });
    overlays.forEach(overlay => {
      if (overlay.dataset.cueOverlay === cue) overlay.removeAttribute('hidden');
      else overlay.setAttribute('hidden', '');
    });
    if (announce) status.textContent = `Showing ${button.textContent.trim().replace(/^\d+\s*/, '')} cues.`;
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => selectCue(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      buttons[next].focus();
      selectCue(buttons[next]);
    });
  });

  // Without JavaScript, all three explanations remain available in the page.
  selectCue(buttons[0], false);
})();
