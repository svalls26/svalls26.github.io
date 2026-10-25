// Register after the theme so its heading permalinks can be removed.
window.jQuery(function () {
  document.querySelectorAll(".page__content .header-link").forEach(link => link.remove());

  const background = document.querySelector(".background");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!background || reducedMotion.matches) return;

  const timelines = Array.from(background.querySelectorAll(".timeline"));
  const entries = Array.from(background.querySelectorAll(".timeline__item"));
  const progress = timelines.map(() => 0);
  let frame = 0;

  function updateBackground() {
    frame = 0;
    const revealPoint = window.innerHeight * 0.84;
    const lineInset = parseFloat(getComputedStyle(background).fontSize) * 0.5;

    // Read positions together before applying styles; shared grid rows stay intact.
    const positions = timelines.map(timeline => timeline.getBoundingClientRect());
    const visibleEntries = entries.filter(entry => entry.getBoundingClientRect().top < revealPoint);

    positions.forEach((position, index) => {
      const length = Math.max(position.height - lineInset * 2, 1);
      const reached = (revealPoint - position.top - lineInset) / length;
      // Keep the journey revealed when the visitor scrolls back up.
      progress[index] = Math.max(progress[index], Math.min(1, Math.max(0, reached)));
      timelines[index].style.setProperty("--timeline-progress", progress[index]);
    });
    visibleEntries.forEach(entry => entry.classList.add("is-revealed"));
  }

  function queueUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateBackground);
  }

  // Content is visible by default, including when JavaScript is unavailable.
  updateBackground();
  background.classList.add("background--animated");
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    background.classList.remove("background--animated");
    window.removeEventListener("scroll", queueUpdate);
    window.removeEventListener("resize", queueUpdate);
    if (frame) window.cancelAnimationFrame(frame);
  });
});
