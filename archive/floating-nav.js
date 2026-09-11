/* Floating pill nav — fixed bottom-center on every page.
   Injected as a single shared script so the pill is edited in one place. */
(function () {
  const EMAIL = 'azadielshan@gmail.com';

  const style = document.createElement('style');
  style.textContent = `
    #float-nav {
      position: fixed;
      left: 50%;
      bottom: calc(52px + env(safe-area-inset-bottom, 0px));
      transform: translateX(-50%);
      z-index: 45;
      display: flex;
      align-items: center;
      gap: 2px;
      padding: 5px;
      background: rgba(14, 14, 14, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 999px;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.55);
    }
    .fn-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: #d9d9d9;
      transition: background 0.18s, color 0.18s;
    }
    .fn-item svg { display: block; }
    .fn-item:hover { background: rgba(255, 255, 255, 0.09); color: #f5f5f5; }
    .fn-item.is-active { background: rgba(255, 255, 255, 0.18); color: #f5f5f5; }
    .fn-item:focus-visible { outline: 2px solid #c8e899; outline-offset: 2px; }
  `;
  document.head.appendChild(style);

  const icons = {
    home: '<svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H48V120l80-80,80,80Z"/></svg>',
    person: '<svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>',
    chat: '<svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H80a8,8,0,0,0-5.23,1.95L40,224V64H216Z"/></svg>'
  };

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isHome = page === '' || page === 'index.html';
  const isAbout = page === 'about.html';

  const nav = document.createElement('nav');
  nav.id = 'float-nav';
  nav.setAttribute('aria-label', 'Quick navigation');
  nav.innerHTML =
    '<a class="fn-item' + (isHome ? ' is-active' : '') + '" href="index.html" aria-label="Home" title="Home">' + icons.home + '</a>' +
    '<a class="fn-item' + (isAbout ? ' is-active' : '') + '" href="about.html" aria-label="About" title="About">' + icons.person + '</a>' +
    '<a class="fn-item" href="mailto:' + EMAIL + '" aria-label="Contact" title="Contact">' + icons.chat + '</a>';
  document.body.appendChild(nav);
})();
