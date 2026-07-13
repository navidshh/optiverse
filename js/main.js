/* ==========================================================
   OptiVerse Academy — Main Interactions
   ========================================================== */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const courses = window.COURSES || [];

  /* ---------- Small helpers ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));

  /* ---------- Header scroll state ---------- */
  const header = $('#siteHeader');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const menuBtn   = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Category counts ---------- */
  const aiCount     = courses.filter(c => c.category === 'ai').length;
  const energyCount = courses.filter(c => c.category === 'energy').length;
  const setText = (id, txt) => { const el = $('#' + id); if (el) el.textContent = txt; };
  setText('count-ai', `${aiCount} courses`);
  setText('count-energy', `${energyCount} courses`);
  setText('stat-courses', String(courses.length));

  /* ---------- SEO: inject Course JSON-LD (ItemList of all Udemy courses) ---------- */
  try {
    if (courses.length) {
      const itemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': 'OptiVerse Academy Courses',
        'itemListElement': courses.map((c, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'item': {
            '@type': 'Course',
            'name': c.title,
            'description': c.description,
            'url': c.url,
            'provider': {
              '@type': 'Organization',
              'name': 'Udemy',
              'sameAs': 'https://www.udemy.com/'
            },
            'author': { '@id': 'https://optiverse.academy/#instructor' },
            'offers': {
              '@type': 'Offer',
              'price': String(c.price),
              'priceCurrency': 'USD',
              'category': 'Paid',
              'url': c.url
            },
            'hasCourseInstance': {
              '@type': 'CourseInstance',
              'courseMode': 'Online',
              'inLanguage': 'en'
            }
          }
        }))
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(itemList);
      document.head.appendChild(script);
    }
  } catch (e) { /* non-fatal — SEO only */ }

  /* ==========================================================
     Cover art generator — SVG scenes per course
     No external images. Fully vector, crisp at any size.
     ========================================================== */
  const coverThemes = {
    pink:     { from: '#FF7AA2', to: '#FFB199', ink: '#7A1F42', accent: '#FFE1EA' },
    purple:   { from: '#8A6BFF', to: '#B08BFF', ink: '#2E1A7A', accent: '#E9E1FF' },
    teal:     { from: '#22C1DC', to: '#66E0D0', ink: '#0E3A46', accent: '#D3F1F7' },
    yellow:   { from: '#FFB020', to: '#FFD86B', ink: '#5A3B00', accent: '#FFEBBF' },
    green:    { from: '#35C08A', to: '#7DDBA8', ink: '#0F4A33', accent: '#D6F2E4' },
    blue:     { from: '#4C7BFF', to: '#7EA7FF', ink: '#122B7A', accent: '#DDE6FF' },
    coral:    { from: '#FF7A5A', to: '#FFB088', ink: '#7A2C15', accent: '#FFE0D6' },
    sunset:   { from: '#FF5A87', to: '#FFB020', ink: '#5A1F2E', accent: '#FFE1EA' },
    forest:   { from: '#1F9A76', to: '#F5C265', ink: '#0F3D30', accent: '#D6F2E4' },
    midnight: { from: '#3A2E7A', to: '#7C5CFF', ink: '#F3EEFF', accent: '#E9E1FF' }
  };

  /* Each icon is a paths-string using currentColor for its main strokes/fills.
     Designed on a 100x100 viewBox, centered around (50,50). */
  const coverIcons = {
    brain: `
      <path d="M35 30c-8 0-14 6-14 14 0 3 1 6 2 8-2 2-3 5-3 8 0 6 5 11 11 11h4v-41h0z" fill="currentColor" opacity=".9"/>
      <path d="M65 30c8 0 14 6 14 14 0 3-1 6-2 8 2 2 3 5 3 8 0 6-5 11-11 11h-4v-41h0z" fill="currentColor" opacity=".9"/>
      <path d="M50 24v52M42 40h16M42 55h16M42 68h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/>
      <circle cx="30" cy="44" r="2" fill="currentColor"/>
      <circle cx="70" cy="44" r="2" fill="currentColor"/>
      <circle cx="30" cy="58" r="2" fill="currentColor"/>
      <circle cx="70" cy="58" r="2" fill="currentColor"/>
    `,
    rocket: `
      <path d="M50 15c8 6 14 16 14 28 0 6-1 11-3 15l-4 8H43l-4-8c-2-4-3-9-3-15 0-12 6-22 14-28z" fill="currentColor"/>
      <circle cx="50" cy="40" r="5" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".5"/>
      <path d="M36 58l-8 6 4 10 8-4M64 58l8 6-4 10-8-4" fill="currentColor" opacity=".7"/>
      <path d="M46 78h8M45 82h10M46 86h8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    `,
    chip: `
      <rect x="26" y="26" width="48" height="48" rx="6" fill="currentColor" opacity=".2"/>
      <rect x="26" y="26" width="48" height="48" rx="6" fill="none" stroke="currentColor" stroke-width="2.6"/>
      <rect x="38" y="38" width="24" height="24" rx="3" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <path d="M42 26v-8M50 26v-8M58 26v-8M42 82v-8M50 82v-8M58 82v-8M26 42h-8M26 50h-8M26 58h-8M82 42h-8M82 50h-8M82 58h-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    `,
    code: `
      <path d="M35 32L18 50l17 18M65 32l17 18-17 18" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M56 25L44 75" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    `,
    chart: `
      <path d="M18 78h64" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M22 78V56M36 78V44M50 78V32M64 78V50M78 78V38" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity=".8"/>
      <path d="M18 30l16 12 16-8 16-14 16 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".9"/>
      <circle cx="18" cy="30" r="3" fill="currentColor"/>
      <circle cx="82" cy="26" r="3" fill="currentColor"/>
    `,
    flask: `
      <path d="M42 20h16v18l14 30c2 4-1 8-5 8H33c-4 0-7-4-5-8l14-30V20z" fill="currentColor" opacity=".85"/>
      <path d="M42 20h16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="62" r="2.5" fill="#FFFAF0"/>
      <circle cx="55" cy="58" r="1.8" fill="#FFFAF0"/>
      <circle cx="52" cy="70" r="2" fill="#FFFAF0"/>
    `,
    wind: `
      <circle cx="50" cy="50" r="4" fill="currentColor"/>
      <path d="M50 46 C 50 30, 60 22, 74 22 C 66 26, 60 34, 54 46 Z" fill="currentColor"/>
      <path d="M54 54 C 68 54, 76 64, 80 78 C 72 72, 62 68, 50 58 Z" fill="currentColor"/>
      <path d="M46 54 C 46 68, 36 78, 22 80 C 30 72, 34 62, 46 56 Z" fill="currentColor"/>
      <path d="M50 78v10M45 92h10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    `,
    building: `
      <path d="M15 80h70" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M22 80V38l28-16 28 16v42" fill="currentColor" opacity=".8"/>
      <path d="M22 80V38l28-16 28 16v42" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
      <rect x="34" y="46" width="8" height="8" fill="#FFFAF0"/>
      <rect x="46" y="46" width="8" height="8" fill="#FFFAF0"/>
      <rect x="58" y="46" width="8" height="8" fill="#FFFAF0"/>
      <rect x="34" y="60" width="8" height="8" fill="#FFFAF0"/>
      <rect x="58" y="60" width="8" height="8" fill="#FFFAF0"/>
      <rect x="44" y="60" width="12" height="20" fill="#FFFAF0"/>
    `,
    bolt: `
      <path d="M56 12L28 56h16L40 88l32-46H54l6-30z" fill="currentColor"/>
    `,
    leaf: `
      <path d="M20 80 C 20 50, 50 20, 80 20 C 80 50, 50 80, 20 80 Z" fill="currentColor" opacity=".85"/>
      <path d="M20 80 C 40 60, 60 40, 80 20" stroke="#FFFAF0" stroke-width="2.4" fill="none" opacity=".8"/>
      <path d="M28 72c8-2 14-6 20-12M40 76c6-2 10-6 14-10" stroke="#FFFAF0" stroke-width="1.6" fill="none" opacity=".7"/>
    `,
    gears: `
      <circle cx="38" cy="42" r="14" fill="none" stroke="currentColor" stroke-width="2.8"/>
      <circle cx="38" cy="42" r="5" fill="currentColor"/>
      <path d="M38 22v6M38 56v6M18 42h6M52 42h6M24 28l4 4M52 52l-4-4M24 56l4-4M52 32l-4 4" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="66" cy="66" r="10" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <circle cx="66" cy="66" r="3.5" fill="currentColor"/>
      <path d="M66 52v4M66 76v4M52 66h4M76 66h4" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    `,
    target: `
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2.6"/>
      <circle cx="50" cy="50" r="4" fill="currentColor"/>
      <path d="M50 12v-6M50 88v6M12 50h-6M88 50h6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M74 26l10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <path d="M76 22h8v8" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
    `,
    git: `
      <circle cx="30" cy="30" r="8" fill="currentColor"/>
      <circle cx="30" cy="70" r="8" fill="currentColor"/>
      <circle cx="70" cy="50" r="8" fill="currentColor"/>
      <path d="M30 38v24" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <path d="M30 50 C 30 42, 45 42, 50 42 C 62 42, 62 50, 62 50" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    `,
    data: `
      <ellipse cx="50" cy="26" rx="24" ry="8" fill="currentColor"/>
      <path d="M26 26v14c0 4 11 8 24 8s24-4 24-8V26" fill="currentColor" opacity=".85"/>
      <path d="M26 40v14c0 4 11 8 24 8s24-4 24-8V40" fill="currentColor" opacity=".7"/>
      <path d="M26 54v14c0 4 11 8 24 8s24-4 24-8V54" fill="currentColor" opacity=".55"/>
    `,
    terminal: `
      <rect x="16" y="22" width="68" height="56" rx="6" fill="currentColor" opacity=".85"/>
      <rect x="16" y="22" width="68" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M16 34h68" stroke="#FFFAF0" stroke-width="2" opacity=".4"/>
      <circle cx="24" cy="28" r="2" fill="#FFFAF0"/>
      <circle cx="32" cy="28" r="2" fill="#FFFAF0"/>
      <circle cx="40" cy="28" r="2" fill="#FFFAF0"/>
      <path d="M26 52l8 6-8 6M40 66h18" stroke="#FFFAF0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
    atom: `
      <circle cx="50" cy="50" r="6" fill="currentColor"/>
      <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="currentColor" stroke-width="2.6"/>
      <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="currentColor" stroke-width="2.6" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="30" ry="12" fill="none" stroke="currentColor" stroke-width="2.6" transform="rotate(-60 50 50)"/>
    `
  };

  const coverBg = (theme, id) => `
    <defs>
      <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0"  stop-color="${theme.from}"/>
        <stop offset="1"  stop-color="${theme.to}"/>
      </linearGradient>
      <radialGradient id="glow-${id}" cx="20%" cy="20%" r="70%">
        <stop offset="0" stop-color="rgba(255,255,255,0.55)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <pattern id="grid-${id}" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M16 0H0V16" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="400" height="225" fill="url(#bg-${id})"/>
    <rect width="400" height="225" fill="url(#grid-${id})"/>
    <rect width="400" height="225" fill="url(#glow-${id})"/>
    <circle cx="340" cy="40"  r="60" fill="rgba(255,255,255,0.10)"/>
    <circle cx="60"  cy="200" r="80" fill="rgba(0,0,0,0.06)"/>
  `;

  const buildCoverSvg = (course, index) => {
    const themeKey = coverThemes[course.theme] ? course.theme : 'purple';
    const theme    = coverThemes[themeKey];
    const iconKey  = coverIcons[course.icon] ? course.icon : 'chip';
    const iconSvg  = coverIcons[iconKey];
    const uid      = `c${index}`;

    return `
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeHtml(course.title)} cover art">
        ${coverBg(theme, uid)}
        <g transform="translate(140, 47) scale(1.35)" style="color: ${theme.ink}">
          ${iconSvg}
        </g>
      </svg>
    `;
  };

  /* Encode a file path for use as a URL (preserves slashes, encodes spaces / special chars) */
  const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');

  /* Render the cover: real image if provided, otherwise fall back to the generated SVG scene. */
  const buildCover = (course, index) => {
    if (course.image) {
      const src = encodePath(course.image);
      return `<img src="${src}" alt="${escapeHtml(course.title)}" loading="lazy" decoding="async" />`;
    }
    return buildCoverSvg(course, index);
  };

  /* ---------- Card rendering ---------- */
  const categoryLabel = (cat) => cat === 'ai' ? 'AI · ML · Data' : 'Energy · Optimization';

  const renderStarsInline = (rating) => {
    const full  = Math.floor(rating);
    const half  = (rating - full) >= 0.25 && (rating - full) < 0.75;
    const total = 5;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (half && full < total) stars += '½';
    const empty = total - full - (half ? 1 : 0);
    for (let i = 0; i < empty; i++) stars += '☆';
    return stars;
  };

  const cardHtml = (course, index) => {
    const tag     = categoryLabel(course.category);
    const cover   = buildCover(course, index);
    const stars   = renderStarsInline(course.rating);
    const safeUrl = /^https?:\/\//i.test(course.url) ? course.url : '#';

    return `
      <article class="course-card cat-${course.category}"
               data-category="${course.category}"
               data-title="${escapeHtml(course.title.toLowerCase())}">
        <div class="course-cover">
          ${cover}
          <span class="cover-tag">${tag}</span>
          <span class="cover-rating">★ ${course.rating.toFixed(1)}</span>
        </div>
        <div class="course-body">
          <h3 class="course-title">${escapeHtml(course.title)}</h3>
          <p class="course-desc">${escapeHtml(course.description)}</p>
          <div class="course-meta">
            <span class="stars-inline" aria-label="Rating ${course.rating} out of 5">
              <span class="star-y" aria-hidden="true">${stars}</span>
              <span>${course.rating.toFixed(1)}</span>
            </span>
          </div>
          <a class="course-cta" href="${safeUrl}" target="_blank" rel="noopener noreferrer">
            Get the Course <span class="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `;
  };

  const grid       = $('#courseGrid');
  const noResults  = $('#noResults');

  const renderCourses = () => {
    if (!grid) return;
    // Highest-rated first, then keep source order for equal ratings
    const sorted = courses
      .map((c, i) => ({ c, i }))
      .sort((a, b) => (b.c.rating - a.c.rating) || (a.i - b.i))
      .map(({ c, i }) => cardHtml(c, i));
    grid.innerHTML = sorted.join('');
  };
  renderCourses();

  /* ---------- Filters + search ---------- */
  const filterButtons = $$('.filter-btn');
  const searchInput   = $('#courseSearch');
  let currentFilter = 'all';
  let currentQuery  = '';

  const applyFilters = () => {
    if (!grid) return;
    const cards = $$('.course-card', grid);
    let visible = 0;
    cards.forEach((card) => {
      const cat   = card.getAttribute('data-category');
      const title = card.getAttribute('data-title') || '';
      const okCat = currentFilter === 'all' || cat === currentFilter;
      const okQ   = !currentQuery || title.includes(currentQuery);
      const show  = okCat && okQ;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  /* ---------- Category card → filter + scroll ---------- */
  $$('.category-card').forEach((card) => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      if (!cat) return;
      const targetBtn = filterButtons.find((b) => b.getAttribute('data-filter') === cat);
      if (targetBtn) targetBtn.click();
      const coursesSection = $('#courses');
      if (coursesSection) coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = $$('.section-head, .category-card, .course-card, .about-inner, .feature, .form-inner, .stat, .hero-image');
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  /* ==========================================================
     Contact + Workshop forms (via Web3Forms — no backend)
     ----------------------------------------------------------
     Web3Forms delivers submissions straight to your inbox with
     zero activation dance. Get a free access key at:
       https://web3forms.com/
     Paste it into WEB3FORMS_ACCESS_KEY below and you're live.
     ========================================================== */
  const CONTACT_EMAIL         = 'navid.shirzadi@hotmail.com';
  const WEB3FORMS_ACCESS_KEY  = '23f2a30c-d006-4b17-8253-60b877283278';
  const FORM_ENDPOINT         = 'https://api.web3forms.com/submit';

  const setupForm = (form) => {
    const status    = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const type      = form.getAttribute('data-form');
    const origHtml  = submitBtn ? submitBtn.innerHTML : '';

    const setStatus = (msg, kind) => {
      if (!status) return;
      status.className = 'form-status' + (kind ? ' ' + kind : '');
      status.innerHTML = msg;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('', '');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Honeypot: bots typically fill hidden fields
      const hp = form.elements['_honey'];
      if (hp && hp.value) return;

      const data = Object.fromEntries(new FormData(form).entries());
      // Web3Forms required + convenience fields
      data.access_key = WEB3FORMS_ACCESS_KEY;
      data.subject    = type === 'workshop'
        ? 'OptiVerse — Workshop Request'
        : 'OptiVerse — Contact Form Message';
      data.from_name  = data.name || 'OptiVerse Website';
      data.replyto    = data.email || CONTACT_EMAIL;
      data.botcheck   = ''; // Web3Forms built-in honeypot

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending…';
      }

      // Build a mailto: fallback that pre-fills the user's mail client
      // with the same data — used if the AJAX submission fails for any
      // reason (network error, provider outage, missing access key, …).
      const buildMailto = () => {
        const subject = data.subject;
        const lines   = Object.entries(data)
          .filter(([k]) => !['access_key', 'subject', 'from_name', 'replyto', 'botcheck', '_honey'].includes(k))
          .map(([k, v]) => {
            const label = k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            return `${label}: ${v || '—'}`;
          });
        const body = lines.join('\n');
        return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      };

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await res.json().catch(() => ({}));
        const ok = res.ok && result.success === true;
        if (!ok) {
          console.error('[OptiVerse form] provider response:', res.status, result);
          throw new Error(result.message || `Provider returned status ${res.status}`);
        }

        setStatus(
          type === 'workshop'
            ? '✓ Thanks! Your workshop request has been sent. I’ll be in touch soon.'
            : '✓ Thanks! Your message has been sent. I’ll reply personally.',
          'success'
        );
        form.reset();
      } catch (err) {
        console.error('[OptiVerse form] submit failed:', err);
        const mailto = buildMailto();
        setStatus(
          `Couldn't submit through the form right now. ` +
          `<a href="${mailto}">Click here to send it by email instead</a> ` +
          `or write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> directly.`,
          'error'
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origHtml;
        }
      }
    });
  };

  $$('form[data-form]').forEach(setupForm);

  /* ---------- Smooth-scroll offset for sticky header ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();
