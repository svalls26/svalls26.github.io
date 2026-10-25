(() => {
  const story = document.querySelector('.research-story');
  const process = document.querySelector('.join-process');
  const canvas = document.querySelector('.cue-explorer__canvas');
  if (!story || !process || !canvas) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = process.querySelector('.join-process__desktop');
  const mobileScenes = process.querySelectorAll('.join-process__mobile');
  const cues = ['macro', 'textual', 'micro'];
  const guides = ['columns', 'ruling', 'width', 'spacing'];
  let frame = 0;

  function update() {
    frame = 0;
    if (motion.matches) return;
    const readingLine = window.innerHeight * 0.82;
    const desktopVisible = desktop.getBoundingClientRect().height > 0;
    ['discovery', 'confirmation'].forEach((stage, index) => {
      const scene = desktopVisible ? desktop : mobileScenes[index];
      const rect = scene.getBoundingClientRect();
      const progress = desktopVisible ? 0.25 + index * 0.3 : 0.3;
      if (rect.top + rect.height * progress < readingLine) {
        process.classList.add(`is-${stage}-revealed`);
      }
    });
    const manuscript = canvas.querySelector('.cue-manuscript').getBoundingClientRect();
    guides.forEach((guide, index) => {
      if (manuscript.top + manuscript.height * (0.15 + index * 0.18) < readingLine) {
        canvas.classList.add(`is-${guide}-revealed`);
      }
    });
    cues.forEach(cue => {
      const rect = canvas.querySelector(`[data-cue="${cue}"]`).getBoundingClientRect();
      if (rect.top + rect.height / 2 < readingLine) canvas.classList.add(`is-${cue}-revealed`);
    });
  }

  function queueUpdate() {
    if (!frame && !motion.matches) frame = window.requestAnimationFrame(update);
  }

  function applyMotionPreference() {
    story.classList.toggle('research-reveals', !motion.matches);
    queueUpdate();
  }

  // Keyboard users see every control as soon as focus reaches the explorer.
  canvas.addEventListener('focusin', () => {
    cues.concat(guides).forEach(part => canvas.classList.add(`is-${part}-revealed`));
  });
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate);
  window.addEventListener('pageshow', queueUpdate);
  motion.addEventListener('change', applyMotionPreference);
  applyMotionPreference();
})();
