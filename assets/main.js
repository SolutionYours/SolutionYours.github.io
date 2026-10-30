/* SolutionYours — small progressive enhancements. The site works without JS. */

// Subscribe forms: post to data-endpoint when one is configured, otherwise fall back to mailto.
document.querySelectorAll('form[data-subscribe]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    var endpoint = (form.dataset.endpoint || '').trim();
    var input = form.querySelector('input[type="email"]');
    var email = input ? input.value.trim() : '';
    if (!email) return;

    if (endpoint) return; // let the browser post to the real list provider

    event.preventDefault();
    var subject = form.dataset.subject || 'Subscribe';
    var body = 'Please add me to the list: ' + email;
    window.location.href =
      'mailto:' + form.dataset.email +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    form.reset();
  });
});

// Mark the current section in the header nav.
(function () {
  var path = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === 'h' || href.charAt(0) === 'm') return;
    var target = new URL(href, window.location.href).pathname;
    if (target !== '/' && path.indexOf(target) === 0) {
      a.style.color = 'var(--text)';
      a.style.background = 'var(--card-hi)';
    }
  });
})();
