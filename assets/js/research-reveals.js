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
  const stages = ['discovery', 'confirmation'].map(name => ({ name, start: 0, duration: 1, progress: 0 }));
  let reveals = [];
  let initialY = 0;
  let lastY = window.scrollY;
  let armed = false;
  let frame = 0;

  function measure() {
    const height = window.innerHeight;
    const desktopVisible = desktop.getBoundingClientRect().height > 0;
    stages.forEach((stage, index) => {
      const scene = desktopVisible ? desktop : mobileScenes[index];
      const rect = scene.getBoundingClientRect();
      const point = desktopVisible ? 0.15 + index * 0.35 : 0.2;
      stage.start = Math.max(window.scrollY + rect.top + rect.height * point - height * 0.55, initialY);
      stage.duration = height * 0.28;
      if (desktopVisible && index === 1) stage.start = Math.max(stage.start, stages[0].start + stage.duration * 0.6);
    });
    const manuscript = canvas.querySelector('.cue-manuscript').getBoundingClientRect();
    const top = window.scrollY + manuscript.top;
    const guideStart = Math.max(top - height * 0.55, initialY);
    const cueStart = Math.max(top - height * 0.5, initialY);
    reveals = guides.map((name, index) => ({ name, start: guideStart + manuscript.height * index * 0.18 }))
      .concat(cues.map((name, index) => ({ name, start: cueStart + manuscript.height * index * 0.18 })));
  }

  function update() {
    frame = 0;
    stages.forEach(stage => {
      let progress = Math.max(0, Math.min(1, (window.scrollY - stage.start) / stage.duration));
      if (motion.matches) progress = progress >= 0.5 ? 1 : 0;
      stage.progress = Math.max(stage.progress, progress);
      process.style.setProperty(`--${stage.name}-progress`, stage.progress.toFixed(3));
      process.style.setProperty(`--${stage.name}-head`, stage.progress >= 0.995 ? '1' : '0');
    });
    reveals.forEach(reveal => {
      if (window.scrollY > reveal.start) canvas.classList.add(`is-${reveal.name}-revealed`);
    });
  }

  function queueUpdate() {
    if (!frame && armed) frame = window.requestAnimationFrame(update);
  }

  function arm() {
    if (armed) return;
    // Wait for input so browser scroll restoration cannot reveal anything on load.
    initialY = window.scrollY;
    lastY = initialY;
    measure();
    armed = true;
  }

  canvas.addEventListener('focusin', () => {
    cues.concat(guides).forEach(part => canvas.classList.add(`is-${part}-revealed`));
  });
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    // Returning above a restored starting point enables the normal reading sequence.
    if (armed && y < initialY) { initialY = y; measure(); }
    if (y > lastY) queueUpdate();
    lastY = y;
  }, { passive: true });
  window.addEventListener('resize', () => { if (armed) measure(); });
  motion.addEventListener('change', queueUpdate);
  story.classList.add('research-reveals');
  ['wheel', 'touchmove', 'pointerdown', 'keydown'].forEach(type => {
    window.addEventListener(type, arm, { once: true, passive: true });
  });
})();
