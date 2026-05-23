(function () {
  var STORAGE_KEY = 'auth-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'dark' || stored === 'light' ? stored : null;
    } catch {
      return null;
    }
  }

  function getEffectiveTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function setTheme(theme, persist) {
    var root = document.documentElement;

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        /* ignore storage errors */
      }
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }

    updateToggleButton(theme);
  }

  function updateToggleButton(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }

    var isDark = theme === 'dark';
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    button.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );

    var icon = button.querySelector('.theme-toggle__icon');
    var label = button.querySelector('.theme-toggle__label');

    if (icon) {
      icon.textContent = isDark ? '☀️' : '🌙';
    }

    if (label) {
      label.textContent = isDark ? 'Light mode' : 'Dark mode';
    }
  }

  function initThemeToggle() {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }

    updateToggleButton(getEffectiveTheme());

    button.addEventListener('click', function () {
      var nextTheme = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme, true);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!getStoredTheme()) {
      updateToggleButton(getSystemTheme());
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
