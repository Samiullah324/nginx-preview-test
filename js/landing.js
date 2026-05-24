(function () {
  'use strict';

  var data = window.LANDING_DATA;
  if (!data) return;

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderStats(container) {
    if (!container || !data.stats) return;
    container.innerHTML = data.stats.map(function (stat) {
      return (
        '<article class="stat-card">' +
          '<p class="stat-value">' + stat.value + '</p>' +
          '<p class="stat-label">' + stat.label + '</p>' +
          '<p class="stat-trend">' + stat.trend + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderFeatures(container) {
    if (!container || !data.features) return;
    container.innerHTML = data.features.map(function (feature) {
      return (
        '<article class="feature-card">' +
          '<div class="feature-icon" aria-hidden="true">' + feature.icon + '</div>' +
          '<h3>' + feature.title + '</h3>' +
          '<p>' + feature.description + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderEnrollments(container) {
    if (!container || !data.recentEnrollments) return;
    var rows = data.recentEnrollments.map(function (row) {
      var statusClass = row.status === 'Enrolled' ? 'status-enrolled' : 'status-pending';
      return (
        '<tr>' +
          '<td>' + row.student + '</td>' +
          '<td>' + row.course + '</td>' +
          '<td>' + row.date + '</td>' +
          '<td><span class="status-badge ' + statusClass + '">' + row.status + '</span></td>' +
        '</tr>'
      );
    }).join('');
    container.innerHTML = rows;
  }

  function renderAnnouncements(container) {
    if (!container || !data.announcements) return;
    container.innerHTML = data.announcements.map(function (item) {
      return (
        '<article class="announcement-card">' +
          '<time datetime="' + item.date + '">' + item.date + '</time>' +
          '<h3>' + item.title + '</h3>' +
          '<p>' + item.body + '</p>' +
        '</article>'
      );
    }).join('');
  }

  function renderTestimonials(container) {
    if (!container || !data.testimonials) return;
    container.innerHTML = data.testimonials.map(function (item) {
      return (
        '<blockquote class="testimonial-card">' +
          '<p class="testimonial-quote">&ldquo;' + item.quote + '&rdquo;</p>' +
          '<footer>' +
            '<cite>' + item.author + '</cite>' +
            '<span class="testimonial-role">' + item.role + '</span>' +
          '</footer>' +
        '</blockquote>'
      );
    }).join('');
  }

  if (data.app) {
    setText('app-name', data.app.name);
    setText('app-tagline', data.app.tagline);
    setText('hero-badge', data.app.badge);
    setText('build-tag', data.app.buildTag);
    document.title = data.app.name + ' — Home';
  }

  renderStats(document.getElementById('stats-grid'));
  renderFeatures(document.getElementById('features-grid'));
  renderEnrollments(document.getElementById('enrollments-body'));
  renderAnnouncements(document.getElementById('announcements-list'));
  renderTestimonials(document.getElementById('testimonials-grid'));
})();
