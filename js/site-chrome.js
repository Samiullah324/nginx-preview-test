(function () {
  var data = window.SITE_CHROME;
  if (!data) {
    return;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderHeader() {
    var mount = document.getElementById('site-header-mount');
    if (!mount) {
      return;
    }

    var navLinks = (data.nav || [])
      .map(function (link) {
        var className = 'site-nav__link' + (link.cta ? ' site-nav__link--cta' : '');
        return (
          '<a class="' +
          className +
          '" href="' +
          escapeHtml(link.href) +
          '">' +
          escapeHtml(link.label) +
          '</a>'
        );
      })
      .join('');

    mount.innerHTML =
      '<header class="site-header site-chrome">' +
      '<div class="site-header__inner container">' +
      '<a class="logo" href="' +
      escapeHtml(data.brand.href) +
      '">' +
      escapeHtml(data.brand.label) +
      '</a>' +
      '<nav class="site-nav" aria-label="Main">' +
      navLinks +
      '</nav>' +
      '</div>' +
      '</header>';
  }

  function renderFooter() {
    var mount = document.getElementById('site-footer-mount');
    if (!mount || !data.footer) {
      return;
    }

    var footer = data.footer;
    var links = (footer.links || [])
      .map(function (link) {
        return (
          '<li><a href="' +
          escapeHtml(link.href) +
          '">' +
          escapeHtml(link.label) +
          '</a></li>'
        );
      })
      .join('');

    mount.innerHTML =
      '<footer class="site-footer site-chrome">' +
      '<div class="container footer-inner">' +
      '<p class="footer-brand">&copy; ' +
      footer.year +
      ' ' +
      escapeHtml(footer.org) +
      '</p>' +
      '<ul class="footer-links">' +
      links +
      '</ul>' +
      '</div>' +
      '</footer>';
  }

  function init() {
    renderHeader();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
