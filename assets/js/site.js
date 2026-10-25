// Register after the theme so its heading permalinks can be removed.
window.jQuery(function () {
  document.querySelectorAll(".page__content .header-link").forEach(link => link.remove());
});
