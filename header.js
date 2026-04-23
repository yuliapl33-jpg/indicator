(function () {
  // ── Determine active nav item from current page ──────────────────────────
  var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var navItems = [
    { href: 'index.html',            label: 'בית',
      active: page === 'index.html' || page === '' },
    { href: 'courses.html',          label: 'קורסים',
      active: page === 'courses.html' },
    { href: 'analysis.html',         label: 'ניתוח מניות ומדדים',
      active: page === 'analysis.html' },
    { href: 'about.html',            label: 'אודות',
      active: page === 'about.html' },
    { href: 'contact.html',          label: 'יצירת קשר',
      active: page === 'contact.html' },
  ];

  function navLi(item) {
    return '<li' + (item.active ? ' class="active"' : '') + '>'
      + '<a href="' + item.href + '">' + item.label + '</a>'
      + '</li>';
  }

  var desktopLinks = navItems.map(navLi).join('\n          ');
  var mobileLinks  = navItems.map(navLi).join('\n        ');

  var headerHTML = [
    '<header class="site-header">',
    '  <nav class="nav-pill" role="navigation" aria-label="ניווט ראשי">',
    '    <div class="nav-inner">',
    '',
    '      <a href="index.html" class="nav-logo" aria-label="Indicator - עמוד הבית">',
    '        <img src="images/logo.svg" alt="Indicator - האקדמיה ללימוד שוק ההון" width="215" height="58">',
    '      </a>',
    '',
    '      <ul class="nav-links" role="list">',
    '        ' + desktopLinks,
    '      </ul>',
    '',
    '      <a href="#" class="btn-students">כניסת סטודנטים</a>',
    '',
    '      <button class="hamburger" aria-label="פתח תפריט" aria-expanded="false" aria-controls="mobile-menu">',
    '        <span></span>',
    '        <span></span>',
    '        <span></span>',
    '      </button>',
    '',
    '    </div>',
    '  </nav>',
    '',
    '  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">',
    '    <ul role="list">',
    '      ' + mobileLinks,
    '    </ul>',
    '    <a href="#" class="btn-students">כניסת סטודנטים</a>',
    '  </div>',
    '</header>',
  ].join('\n');

  // Insert header before this <script> tag
  document.currentScript.insertAdjacentHTML('beforebegin', headerHTML);

  // ── Mobile menu toggle ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var hamburger  = document.querySelector('.hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });
  });
}());
