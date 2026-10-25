(() => {
  const links = Array.from(document.querySelectorAll('.research-contents a[href^="#"]'));
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  if (!links.length || sections.some(section => !section)) return;

  let frame = 0;

  function updateCurrentSection() {
    frame = 0;
    let current = 0;
    const readingLine = window.innerHeight * 0.25;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) current = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function queueUpdate() {
    if (!frame) frame = window.requestAnimationFrame(updateCurrentSection);
  }

  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate);
  updateCurrentSection();
})();
