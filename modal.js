(function () {
  var modalHTML = [
    '<div class="login-modal" id="loginModal" role="dialog" aria-modal="true" aria-labelledby="loginModalTitle" hidden>',
    '  <div class="login-modal-backdrop"></div>',
    '  <div class="login-modal-card">',
    '    <button class="login-modal-close" aria-label="סגור">&#x2715;</button>',
    '    <h2 class="login-modal-title" id="loginModalTitle">כניסת סטודנטים</h2>',
    '    <form class="login-modal-form" novalidate>',
    '      <div class="login-field">',
    '        <input class="login-input" id="login-username" type="text" placeholder=" " required autocomplete="username">',
    '        <label class="login-label" for="login-username">שם משתמש</label>',
    '      </div>',
    '      <div class="login-field">',
    '        <input class="login-input" id="login-password" type="password" placeholder=" " required autocomplete="current-password">',
    '        <label class="login-label" for="login-password">סיסמה</label>',
    '      </div>',
    '      <p class="login-error" id="login-error" hidden>שם משתמש או סיסמה שגויים</p>',
    '      <button type="submit" class="login-submit">כניסה</button>',
    '    </form>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var modal    = document.getElementById('loginModal');
  var backdrop = modal.querySelector('.login-modal-backdrop');
  var closeBtn = modal.querySelector('.login-modal-close');

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('#login-username').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-students').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  var form     = modal.querySelector('.login-modal-form');
  var errorMsg = modal.querySelector('#login-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var username = modal.querySelector('#login-username').value.trim();
    var password = modal.querySelector('#login-password').value;
    if (username === 'admin' && password === '1234') {
      window.location.href = 'course-viewer.html';
    } else {
      errorMsg.hidden = false;
    }
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.prototype.slice.call(
      modal.querySelectorAll('button, input, a[href]')
    ).filter(function (el) { return !el.disabled; });
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}());
