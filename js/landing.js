(function () {
  var data = window.LANDING_DATA;
  if (!data) {
    return;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderHero() {
    var hero = data.hero;
    if (!hero) {
      return;
    }

    var badge = document.getElementById('hero-badge');
    var title = document.getElementById('hero-title');
    var tagline = document.getElementById('hero-tagline');
    var primaryCta = document.getElementById('hero-primary-cta');
    var secondaryCta = document.getElementById('hero-secondary-cta');

    if (badge) {
      badge.textContent = hero.badge;
    }
    if (title) {
      title.textContent = hero.title;
    }
    if (tagline) {
      tagline.textContent = hero.tagline;
    }
    if (primaryCta && hero.primaryCta) {
      primaryCta.textContent = hero.primaryCta.label;
      primaryCta.href = hero.primaryCta.href;
    }
    if (secondaryCta && hero.secondaryCta) {
      secondaryCta.textContent = hero.secondaryCta.label;
      secondaryCta.href = hero.secondaryCta.href;
    }
  }

  function renderStats() {
    var container = document.getElementById('stats-grid');
    if (!container) {
      return;
    }

    container.innerHTML = data.stats
      .map(function (stat) {
        return (
          '<div class="stat-card">' +
          '<p class="stat-card__value">' +
          escapeHtml(stat.value) +
          '</p>' +
          '<p class="stat-card__label">' +
          escapeHtml(stat.label) +
          '</p>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderFeatures() {
    var container = document.getElementById('features-grid');
    if (!container) {
      return;
    }

    container.innerHTML = data.features
      .map(function (feature) {
        return (
          '<article class="feature-card">' +
          '<span class="feature-card__icon" aria-hidden="true">' +
          escapeHtml(feature.icon) +
          '</span>' +
          '<h3>' +
          escapeHtml(feature.title) +
          '</h3>' +
          '<p>' +
          escapeHtml(feature.description) +
          '</p>' +
          '<p class="feature-card__metric">' +
          escapeHtml(feature.metric) +
          '</p>' +
          '</article>'
        );
      })
      .join('');
  }

  function renderSteps() {
    var container = document.getElementById('steps-grid');
    if (!container) {
      return;
    }

    container.innerHTML = data.steps
      .map(function (step) {
        var link = step.href
          ? '<a class="step-card__link" href="' + escapeHtml(step.href) + '">Get started</a>'
          : '';

        return (
          '<article class="step-card">' +
          '<div class="step-card__number" aria-hidden="true">' +
          step.number +
          '</div>' +
          '<h3>' +
          escapeHtml(step.title) +
          '</h3>' +
          '<p>' +
          escapeHtml(step.description) +
          '</p>' +
          link +
          '</article>'
        );
      })
      .join('');
  }

  function renderStudents() {
    var tbody = document.getElementById('students-tbody');
    if (!tbody) {
      return;
    }

    tbody.innerHTML = data.students
      .map(function (student) {
        return (
          '<tr>' +
          '<td>' +
          escapeHtml(student.name) +
          '</td>' +
          '<td>' +
          escapeHtml(student.grade) +
          '</td>' +
          '<td>' +
          escapeHtml(student.className) +
          '</td>' +
          '<td>' +
          escapeHtml(student.attendance) +
          '</td>' +
          '<td>' +
          escapeHtml(student.average) +
          '</td>' +
          '</tr>'
        );
      })
      .join('');
  }

  function renderTestimonials() {
    var container = document.getElementById('testimonials-grid');
    if (!container) {
      return;
    }

    container.innerHTML = data.testimonials
      .map(function (item) {
        return (
          '<blockquote class="testimonial-card">' +
          '<p class="testimonial-card__quote">“' +
          escapeHtml(item.quote) +
          '”</p>' +
          '<footer>' +
          '<cite>' +
          escapeHtml(item.author) +
          '</cite>' +
          '<span class="testimonial-card__role">' +
          escapeHtml(item.role) +
          '</span>' +
          '</footer>' +
          '</blockquote>'
        );
      })
      .join('');
  }

  function renderFooter() {
    var footer = data.footer;
    if (!footer) {
      return;
    }

    var brand = document.getElementById('footer-brand');
    if (brand) {
      brand.textContent =
        '\u00A9 ' + footer.year + ' ' + footer.org;
    }

    renderFooterLinks();
  }

  function renderFooterLinks() {
    var container = document.getElementById('footer-links');
    if (!container) {
      return;
    }

    container.innerHTML = data.footer.links
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
  }

  function init() {
    renderHero();
    renderStats();
    renderFeatures();
    renderSteps();
    renderStudents();
    renderTestimonials();
    renderFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
