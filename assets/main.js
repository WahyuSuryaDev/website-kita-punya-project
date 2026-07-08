(function(){
  'use strict';

  var LS_DRAFT = 'kpp-draft-v1';
  var CAT_LABEL = {event:'Event Activation', marketing:'Marketing & Digital', branding:'Branding & Website', service:'Service Management'};
  var CAT_SHORT = {event:'Event', marketing:'Marketing', branding:'Branding', service:'Service'};
  var IS_SPA = !!document.querySelector('.page[data-page]');
  var CONTENT = loadContent();

  function loadContent(){
    var base = window.KPP_CONTENT || {t:{}, img:{}, kontak:{}, projects:[]};
    try{
      var draft = JSON.parse(localStorage.getItem(LS_DRAFT) || 'null');
      if(draft && draft.t) return draft;
    }catch(e){}
    return base;
  }

  function qsa(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  /* ---------- Terapkan konten ke elemen ---------- */
  function applyAll(){
    var t = CONTENT.t || {};
    Object.keys(t).forEach(function(k){
      qsa('[data-c="' + k + '"]').forEach(function(el){ el.textContent = t[k]; });
    });
    qsa('[data-c-word]').forEach(function(el){
      var k = el.getAttribute('data-c-word');
      if(t[k] != null) el.setAttribute('data-word', t[k]);
    });
    var img = CONTENT.img || {};
    qsa('[data-c-img]').forEach(function(el){
      var k = el.getAttribute('data-c-img');
      if(img[k]) el.src = img[k];
    });
    var K = CONTENT.kontak || {};
    if(K.wa) qsa('a[data-wa]').forEach(function(a){ a.href = 'https://wa.me/' + K.wa; });
    if(K.email) qsa('a[data-mail]').forEach(function(a){ a.href = 'mailto:' + K.email; });
    if(K.ig) qsa('a[data-ig]').forEach(function(a){ a.href = 'https://instagram.com/' + K.ig; });
    qsa('[data-ck]').forEach(function(el){
      var f = el.getAttribute('data-ck');
      var v = (f === 'ig') ? (K.ig ? '@' + K.ig : '') : K[f];
      if(v) el.textContent = v;
    });
    renderWorks();
    renderFeatured();
  }

  /* ---------- Kartu proyek ---------- */
  function coverHTML(p){
    var cls, style = '';
    if(p.img){
      cls = 'cover cv-img';
      style = ' style="background-image:url(&quot;' + esc(p.img) + '&quot;)"';
    } else {
      cls = 'cover ' + (p.cv || 'cv-red');
    }
    return '<div class="' + cls + '"' + style + '>' +
      '<span class="wc-tag">' + esc(CAT_LABEL[p.cat] || p.cat) + '</span>' +
      '<h3 class="wc-title">' + esc(p.title) + '</h3>' +
      '<span class="wc-year">’' + esc(String(p.year).slice(-2)) + '</span>' +
      '<span class="wc-cta">Lihat Detail +</span>' +
      '</div>';
  }
  function infoHTML(p){
    return '<div class="work-info">' +
      '<span class="wi-meta">' + esc(CAT_SHORT[p.cat] || p.cat) + ' • ' + esc(p.year) + '</span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      '</div>';
  }

  function renderWorks(){
    var grid = document.getElementById('worksGrid');
    if(!grid) return;
    var projects = CONTENT.projects || [];
    grid.innerHTML = projects.map(function(p, i){
      return '<article class="work reveal in" data-idx="' + i + '" data-category="' + esc(p.cat) + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="' + esc(p.title) + '">' +
        coverHTML(p) + infoHTML(p) + '</article>';
    }).join('');
    applyFilter(currentFilter());
  }

  function renderFeatured(){
    var grid = document.getElementById('featuredGrid');
    var more = document.getElementById('featuredMore');
    if(!grid || !more) return;
    qsa('.work', grid).forEach(function(el){ el.remove(); });
    var projects = (CONTENT.projects || []).slice(0, 3);
    var href = IS_SPA ? '#/portofolio" data-goto="portofolio' : 'portofolio.html';
    var html = projects.map(function(p){
      return '<a class="work reveal in" href="' + href + '">' + coverHTML(p) + infoHTML(p) + '</a>';
    }).join('');
    more.insertAdjacentHTML('beforebegin', html);
  }

  /* ---------- Filter portofolio ---------- */
  function currentFilter(){
    var active = document.querySelector('.fbtn.active');
    return active ? active.getAttribute('data-filter') : 'all';
  }
  function applyFilter(f){
    var grid = document.getElementById('worksGrid');
    if(!grid) return;
    var shown = 0;
    qsa('.work', grid).forEach(function(w){
      var match = (f === 'all') || (w.getAttribute('data-category') === f);
      w.classList.toggle('hidden', !match);
      if(match) shown++;
    });
    var n = document.getElementById('fcountNum');
    if(n) n.textContent = shown;
  }
  qsa('.fbtn').forEach(function(btn){
    btn.addEventListener('click', function(){
      qsa('.fbtn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  /* ---------- Modal detail proyek ---------- */
  var modal = document.getElementById('workModal');
  if(modal){
    var CV_ALL = ['cv-red','cv-ink','cv-blush','cv-grad','cv-stripe','cv-glow','cv-img'];
    var mCover = document.getElementById('mCover');
    var closeBtn = document.getElementById('modalClose');
    var lastFocus = null;
    var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

    var openModal = function(p, focusEl){
      lastFocus = focusEl || null;
      CV_ALL.forEach(function(c){ mCover.classList.remove(c); });
      mCover.style.backgroundImage = '';
      if(p.img){
        mCover.classList.add('cv-img');
        mCover.style.backgroundImage = 'url("' + p.img + '")';
      } else {
        mCover.classList.add(p.cv || 'cv-red');
      }
      document.getElementById('mTag').textContent = CAT_LABEL[p.cat] || p.cat;
      document.getElementById('mTitle').textContent = p.title;
      document.getElementById('mYear').textContent = '’' + String(p.year).slice(-2);
      document.getElementById('mClient').textContent = p.client || '-';
      document.getElementById('mYearMeta').textContent = p.year || '-';
      document.getElementById('mLoc').textContent = p.loc || '-';
      document.getElementById('mCat').textContent = CAT_LABEL[p.cat] || p.cat;
      document.getElementById('mDesc').textContent = p.desc || '';
      var scope = document.getElementById('mScope');
      scope.innerHTML = '';
      String(p.scope || '').split('|').forEach(function(s){
        s = s.trim(); if(!s) return;
        var span = document.createElement('span'); span.textContent = s; scope.appendChild(span);
      });
      var res = document.getElementById('mResults');
      res.innerHTML = '';
      String(p.results || '').split('|').forEach(function(r){
        r = r.trim(); if(!r) return;
        var li = document.createElement('li'); li.innerHTML = CHECK;
        li.appendChild(document.createTextNode(r)); res.appendChild(li);
      });
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    };
    var closeModal = function(){
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if(lastFocus) lastFocus.focus();
    };
    document.addEventListener('click', function(e){
      var card = e.target.closest('#worksGrid .work');
      if(card){
        var p = (CONTENT.projects || [])[parseInt(card.getAttribute('data-idx'), 10)];
        if(p) openModal(p, card);
      }
    });
    document.addEventListener('keydown', function(e){
      if((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('#worksGrid .work')){
        e.preventDefault();
        var card = e.target.closest('.work');
        var p = (CONTENT.projects || [])[parseInt(card.getAttribute('data-idx'), 10)];
        if(p) openModal(p, card);
      }
      if(e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
  }

  /* ---------- Header & menu ---------- */
  var header = document.getElementById('header');
  var menuBtn = document.getElementById('menuBtn');
  var mobileNav = document.getElementById('mobileNav');
  function onScroll(){ if(header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(menuBtn && header){
    menuBtn.addEventListener('click', function(){
      var open = header.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if(mobileNav && header){
    mobileNav.addEventListener('click', function(e){
      if(e.target.closest('a')){
        header.classList.remove('open');
        if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  qsa('.reveal').forEach(function(el){
    var d = el.getAttribute('data-d');
    if(d) el.style.transitionDelay = d + 'ms';
  });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    qsa('.reveal:not(.in)').forEach(function(el){ io.observe(el); });
  } else {
    qsa('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Tahun footer ---------- */
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  /* ---------- Form kontak -> WhatsApp ---------- */
  var waForm = document.getElementById('waForm');
  if(waForm){
    waForm.addEventListener('submit', function(e){
      e.preventDefault();
      var v = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var num = (CONTENT.kontak && CONTENT.kontak.wa) || '6281200000000';
      var lines = [
        'Halo Kita Punya Project!', '',
        'Nama: ' + v('fNama'),
        'Perusahaan/Instansi: ' + (v('fInstansi') || '-'),
        'Kontak: ' + v('fKontak'),
        'Kebutuhan: ' + v('fJenis'),
        '', 'Pesan:', v('fPesan')
      ];
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  /* ---------- API untuk admin (pratinjau langsung) ---------- */
  window.KPP_REFRESH = function(newContent){
    CONTENT = newContent || loadContent();
    applyAll();
  };

  applyAll();
})();
