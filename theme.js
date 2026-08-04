(function () {
  var STORAGE_KEY = 'sl-theme';
  var ORDER = ['auto', 'light', 'dark'];
  var root = document.documentElement;

  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function writeSaved(theme) {
    try {
      if (theme === 'auto') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function apply(theme) {
    if (theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }

  var state = { theme: readSaved() || 'auto', touched: false };
  apply(state.theme);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    var label = document.getElementById('theme-label');
    var live = document.getElementById('theme-announcement');
    if (!btn || !label) return;

    label.textContent = state.theme;

    btn.addEventListener('click', function () {
      var next = ORDER[(ORDER.indexOf(state.theme) + 1) % ORDER.length];
      state.theme = next;
      state.touched = true;
      apply(next);
      writeSaved(next);
      label.textContent = next;
      if (live) live.textContent = 'Colour theme: ' + next;
    });
  });
})();
