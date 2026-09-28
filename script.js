(function () {
  'use strict';

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeNav();
      toggle.focus();
    }
  });

  // Fade-in on scroll (CSS only animates when motion is allowed)
  var faders = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Booking form
  var form = document.getElementById('booking-form');
  var success = document.getElementById('form-success');
  var status = document.getElementById('form-status');
  var f = {
    name: document.getElementById('f-name'),
    email: document.getElementById('f-email'),
    checkin: document.getElementById('f-checkin'),
    checkout: document.getElementById('f-checkout'),
    guests: document.getElementById('f-guests'),
    room: document.getElementById('f-room')
  };

  // "Request this room" buttons preselect the room and jump to the form
  document.querySelectorAll('[data-room]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      f.room.value = btn.getAttribute('data-room');
      setError(f.room, '');
      document.getElementById('booking').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      setTimeout(function () { f.name.focus({ preventScroll: true }); }, prefersReducedMotion() ? 0 : 450);
    });
  });

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Dates: no past check-in; check-out min follows check-in
  function isoDate(d) {
    var off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
  }
  var today = isoDate(new Date());
  f.checkin.min = today;
  f.checkout.min = today;
  f.checkin.addEventListener('change', function () {
    if (f.checkin.value) {
      var next = new Date(f.checkin.value + 'T12:00:00');
      next.setDate(next.getDate() + 1);
      f.checkout.min = isoDate(next);
    }
  });

  function setError(input, msg) {
    var err = document.getElementById(input.id + '-err');
    if (err) err.textContent = msg;
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', input.id + '-err');
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function validate() {
    var errors = [];
    function check(input, msg) {
      setError(input, msg || '');
      if (msg) errors.push(input);
    }

    check(f.name, f.name.value.trim() ? '' : 'Please enter your name.');

    var email = f.email.value.trim();
    check(f.email, !email ? 'Please enter your email.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Please enter a valid email address.' : '');

    check(f.checkin, !f.checkin.value ? 'Please choose a check-in date.'
      : f.checkin.value < today ? 'Check-in can\'t be in the past.' : '');

    check(f.checkout, !f.checkout.value ? 'Please choose a check-out date.'
      : (f.checkin.value && f.checkout.value <= f.checkin.value) ? 'Check-out must be after check-in.' : '');

    var g = Number(f.guests.value);
    check(f.guests, !f.guests.value || !Number.isInteger(g) || g < 1 ? 'Please enter at least 1 guest.'
      : g > 27 ? 'We can host up to 27 guests. For bigger groups, please call us.' : '');

    check(f.room, f.room.value ? '' : 'Please choose a room type.');

    return errors;
  }

  // Re-validate a field once the user fixes it
  Object.keys(f).forEach(function (k) {
    f[k].addEventListener('change', function () {
      if (f[k].getAttribute('aria-invalid') === 'true') validate();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    var errors = validate();
    if (errors.length) {
      errors[0].focus();
      return;
    }

    var endpoint = form.getAttribute('data-endpoint');
    if (endpoint.indexOf('{') !== -1) {
      status.textContent = 'This preview form is not connected yet. Please call 01244 324524 or message us on WhatsApp.';
      return;
    }

    var submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Sending…';

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || data.success === false || data.success === 'false') throw new Error(data.message || 'Request failed');
        });
      })
      .then(function () {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      })
      .catch(function () {
        status.textContent = 'Sorry, something went wrong sending your enquiry. Please try again, or call 01244 324524.';
        submit.disabled = false;
        submit.textContent = 'Send enquiry';
      });
  });
})();
