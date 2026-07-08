(function(){
  'use strict';
  var app = document.getElementById('adminApp');
  if(!app) return;

  /* GANTI: kode akses panel admin */
  var PASS = 'kpp2026';
  var LS_DRAFT = 'kpp-draft-v1';
  var LS_GATE = 'kpp-admin-ok';

  var CAT_LABEL = {event:'Event Activation', marketing:'Marketing & Digital', branding:'Branding & Website', service:'Service Management'};
  var CV_OPTIONS = [
    ['cv-red','Merah Solid'], ['cv-ink','Gelap Berbintik'], ['cv-blush','Krem Berbingkai'],
    ['cv-grad','Gradien Merah'], ['cv-stripe','Garis-garis'], ['cv-glow','Gelap Menyala']
  ];
  var TABS = [
    {id:'umum',      label:'Umum & Navigasi', groups:['umum'], logo:true},
    {id:'beranda',   label:'Beranda',          groups:['beranda','fakta']},
    {id:'tentang',   label:'Tentang',          groups:['tentang']},
    {id:'layanan',   label:'Layanan',          groups:['layanan']},
    {id:'portofolio',label:'Portofolio',       groups:['portofolio'], projects:true},
    {id:'kontak',    label:'Kontak & Info',    groups:['kontak'], kontak:true},
    {id:'lainnya',   label:'CTA & Footer',     groups:['cta','footer']}
  ];
  var GROUP_TITLES = {
    umum:'Navigasi & Merek', beranda:'Teks Halaman Beranda', fakta:'Kartu Fakta (Beranda & Tentang)',
    tentang:'Teks Halaman Tentang', layanan:'Teks Halaman Layanan', portofolio:'Teks Halaman Portofolio',
    kontak:'Teks Halaman Kontak & FAQ', cta:'Kotak Ajakan (muncul di beberapa halaman)', footer:'Footer'
  };

  function clone(o){ return JSON.parse(JSON.stringify(o)); }
  var base = clone(window.KPP_CONTENT || {t:{}, img:{}, kontak:{}, projects:[]});
  var work;
  try{ work = JSON.parse(localStorage.getItem(LS_DRAFT) || 'null'); }catch(e){ work = null; }
  if(!work || !work.t) work = clone(base);
  work.t = work.t || {}; work.img = work.img || {}; work.kontak = work.kontak || {}; work.projects = work.projects || [];

  /* ---------- Gate ---------- */
  var gate = document.getElementById('admGate');
  var unlocked = false;
  try{ unlocked = sessionStorage.getItem(LS_GATE) === '1'; }catch(e){}
  function openApp(){
    gate.style.display = 'none';
    app.hidden = false;
    renderTabs();
    showTab(TABS[0].id);
  }
  document.getElementById('gateBtn').addEventListener('click', tryUnlock);
  document.getElementById('gatePass').addEventListener('keydown', function(e){ if(e.key === 'Enter') tryUnlock(); });
  function tryUnlock(){
    if(document.getElementById('gatePass').value === PASS){
      try{ sessionStorage.setItem(LS_GATE, '1'); }catch(e){}
      openApp();
    } else {
      document.getElementById('gateErr').textContent = 'Kode akses salah.';
    }
  }

  /* ---------- Simpan draf ---------- */
  var saveTimer = null;
  function scheduleSave(){
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function(){
      try{ localStorage.setItem(LS_DRAFT, JSON.stringify(work)); }catch(e){}
      if(window.KPP_REFRESH) window.KPP_REFRESH(clone(work));
      toast('Draf tersimpan ✓');
    }, 500);
  }
  var toastTimer = null;
  function toast(msg){
    var el = document.getElementById('admStatus');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ el.classList.remove('show'); }, 1600);
  }

  /* ---------- UI helpers ---------- */
  function h(tag, attrs, children){
    var el = document.createElement(tag);
    if(attrs) Object.keys(attrs).forEach(function(k){
      if(k === 'text') el.textContent = attrs[k];
      else if(k === 'html') el.innerHTML = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function(c){ el.appendChild(c); });
    return el;
  }
  function labelFor(key){
    var s = key.split('.').slice(1).join('.');
    s = s.replace(/-/g, ' ');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function textField(key){
    var val = work.t[key] != null ? work.t[key] : '';
    var long = String(val).length > 72;
    var field = h('div', {class:'adm-field' + (long ? ' full' : '')});
    field.appendChild(h('label', {text: labelFor(key)}));
    var input = long ? h('textarea') : h('input', {type:'text'});
    input.value = val;
    input.addEventListener('input', function(){ work.t[key] = input.value; scheduleSave(); });
    field.appendChild(input);
    return field;
  }

  /* ---------- Gambar ---------- */
  function processImage(file, maxW, cb){
    var reader = new FileReader();
    reader.onload = function(){
      var raw = reader.result;
      if(file.type === 'image/png' && file.size < 250000){ cb(raw); return; }
      var im = new Image();
      im.onload = function(){
        var scale = Math.min(1, maxW / im.width);
        var cv = document.createElement('canvas');
        cv.width = Math.round(im.width * scale);
        cv.height = Math.round(im.height * scale);
        cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
        cb(file.type === 'image/png' ? cv.toDataURL('image/png') : cv.toDataURL('image/jpeg', .85));
      };
      im.src = raw;
    };
    reader.readAsDataURL(file);
  }

  /* ---------- Tabs ---------- */
  var tabsNav = document.getElementById('admTabs');
  var main = document.getElementById('admMain');
  function renderTabs(){
    tabsNav.innerHTML = '';
    TABS.forEach(function(tb){
      var b = h('button', {class:'adm-tab', type:'button', text: tb.label, 'data-tab': tb.id});
      b.addEventListener('click', function(){ showTab(tb.id); });
      tabsNav.appendChild(b);
    });
  }
  function showTab(id){
    Array.prototype.forEach.call(tabsNav.children, function(b){
      b.classList.toggle('active', b.getAttribute('data-tab') === id);
    });
    var tb = TABS.filter(function(t){ return t.id === id; })[0];
    main.innerHTML = '';
    if(tb.logo) main.appendChild(logoSection());
    if(tb.kontak) main.appendChild(kontakSection());
    if(tb.projects) main.appendChild(projectsSection());
    tb.groups.forEach(function(g){
      var keys = Object.keys(work.t).filter(function(k){ return k.indexOf(g + '.') === 0; });
      if(!keys.length) return;
      var sec = h('div', {class:'adm-sec'});
      sec.appendChild(h('h3', {text: GROUP_TITLES[g] || g}));
      var grid = h('div', {class:'adm-grid'});
      keys.forEach(function(k){ grid.appendChild(textField(k)); });
      sec.appendChild(grid);
      main.appendChild(sec);
    });
  }

  /* ---------- Bagian logo ---------- */
  function logoSection(){
    var sec = h('div', {class:'adm-sec'});
    sec.appendChild(h('h3', {text:'Logo Website'}));
    sec.appendChild(h('p', {class:'adm-hint', text:'Logo tampil di navigasi semua halaman. Unggah PNG dengan latar transparan agar hasilnya rapi.'}));
    var row = h('div', {class:'adm-imgrow'});
    var prev = h('div', {class:'adm-imgprev'});
    var img = h('img', {alt:'Logo'});
    img.src = work.img.logo || 'assets/logo.png';
    prev.appendChild(img);
    var file = h('input', {type:'file', accept:'image/*', hidden:''});
    var pick = h('button', {class:'adm-mini', type:'button', text:'Ganti Logo'});
    var del = h('button', {class:'adm-mini danger', type:'button', text:'Kembalikan Bawaan'});
    pick.addEventListener('click', function(){ file.click(); });
    file.addEventListener('change', function(){
      if(!file.files[0]) return;
      processImage(file.files[0], 900, function(url){
        work.img.logo = url; img.src = url; scheduleSave();
      });
    });
    del.addEventListener('click', function(){
      delete work.img.logo; img.src = 'assets/logo.png'; scheduleSave();
    });
    row.appendChild(prev); row.appendChild(pick); row.appendChild(del); row.appendChild(file);
    sec.appendChild(row);
    return sec;
  }

  /* ---------- Bagian kontak ---------- */
  function kontakSection(){
    var sec = h('div', {class:'adm-sec'});
    sec.appendChild(h('h3', {text:'Info Kontak & Sosial Media'}));
    sec.appendChild(h('p', {class:'adm-hint', text:'Dipakai otomatis di seluruh tombol WhatsApp, email, Instagram, dan formulir kontak.'}));
    var grid = h('div', {class:'adm-grid'});
    var defs = [
      ['wa', 'Nomor WhatsApp', 'format internasional tanpa +, contoh: 6281234567890'],
      ['waTampil', 'Nomor WhatsApp (tampilan)', 'contoh: +62 812-3456-7890'],
      ['email', 'Alamat email', ''],
      ['ig', 'Username Instagram', 'tanpa @'],
      ['alamat', 'Alamat / kota kantor', '']
    ];
    defs.forEach(function(d){
      var f = h('div', {class:'adm-field'});
      var lb = h('label', {text: d[1] + ' '});
      if(d[2]) lb.appendChild(h('small', {text: '— ' + d[2]}));
      f.appendChild(lb);
      var input = h('input', {type:'text'});
      input.value = work.kontak[d[0]] || '';
      input.addEventListener('input', function(){ work.kontak[d[0]] = input.value; scheduleSave(); });
      f.appendChild(input);
      grid.appendChild(f);
    });
    sec.appendChild(grid);
    return sec;
  }

  /* ---------- Bagian proyek portofolio ---------- */
  function projectsSection(){
    var sec = h('div', {class:'adm-sec'});
    sec.appendChild(h('h3', {text:'Proyek Portofolio (' + work.projects.length + ')'}));
    sec.appendChild(h('p', {class:'adm-hint', text:'Tambah, ubah, urutkan, atau hapus proyek. Tiga proyek teratas tampil di beranda. Sampul bisa memakai desain poster atau foto unggahan.'}));
    work.projects.forEach(function(p, i){ sec.appendChild(projectCard(p, i)); });
    var add = h('button', {class:'adm-add', type:'button', text:'+ Tambah Proyek Baru'});
    add.addEventListener('click', function(){
      work.projects.push({
        title:'Proyek Baru', cat:'event', year:String(new Date().getFullYear()),
        client:'Nama Klien', loc:'Kota', cv:'cv-red', img:'',
        desc:'Deskripsi singkat proyek.', scope:'Lingkup 1|Lingkup 2', results:'Hasil 1|Hasil 2'
      });
      scheduleSave(); showTab('portofolio');
    });
    sec.appendChild(add);
    return sec;
  }

  function projectCard(p, i){
    var det = h('details', {class:'adm-proj'});
    var sum = h('summary');
    var thumb = h('div', {class:'adm-thumb'});
    thumb.style.background = p.img ? 'url("' + p.img + '") center/cover' : 'var(--red)';
    sum.appendChild(thumb);
    var st = h('div');
    st.appendChild(h('b', {text: p.title || '(tanpa judul)'}));
    st.appendChild(h('small', {text: (CAT_LABEL[p.cat] || p.cat) + ' • ' + (p.year || '-')}));
    sum.appendChild(st);
    det.appendChild(sum);

    var body = h('div', {class:'adm-proj-body'});
    var grid = h('div', {class:'adm-grid'});

    function field(label, prop, long, hint){
      var f = h('div', {class:'adm-field' + (long ? ' full' : '')});
      var lb = h('label', {text: label + ' '});
      if(hint) lb.appendChild(h('small', {text: '— ' + hint}));
      f.appendChild(lb);
      var input = long ? h('textarea') : h('input', {type:'text'});
      input.value = p[prop] || '';
      input.addEventListener('input', function(){
        p[prop] = input.value; scheduleSave();
        if(prop === 'title') st.querySelector('b').textContent = input.value || '(tanpa judul)';
      });
      f.appendChild(input);
      return f;
    }

    grid.appendChild(field('Judul proyek', 'title'));
    var catF = h('div', {class:'adm-field'});
    catF.appendChild(h('label', {text:'Kategori'}));
    var catSel = h('select');
    Object.keys(CAT_LABEL).forEach(function(c){
      var o = h('option', {value:c, text: CAT_LABEL[c]});
      if(p.cat === c) o.selected = true;
      catSel.appendChild(o);
    });
    catSel.addEventListener('change', function(){ p.cat = catSel.value; scheduleSave(); });
    catF.appendChild(catSel);
    grid.appendChild(catF);
    grid.appendChild(field('Tahun', 'year'));
    grid.appendChild(field('Klien', 'client'));
    grid.appendChild(field('Lokasi', 'loc'));

    var cvF = h('div', {class:'adm-field'});
    cvF.appendChild(h('label', {text:'Desain sampul (jika tanpa foto)'}));
    var cvSel = h('select');
    CV_OPTIONS.forEach(function(o){
      var opt = h('option', {value:o[0], text:o[1]});
      if(p.cv === o[0]) opt.selected = true;
      cvSel.appendChild(opt);
    });
    cvSel.addEventListener('change', function(){ p.cv = cvSel.value; scheduleSave(); });
    cvF.appendChild(cvSel);
    grid.appendChild(cvF);

    grid.appendChild(field('Deskripsi', 'desc', true));
    grid.appendChild(field('Lingkup kerja', 'scope', true, 'pisahkan tiap poin dengan tanda |'));
    grid.appendChild(field('Hasil', 'results', true, 'pisahkan tiap poin dengan tanda |'));

    var imgF = h('div', {class:'adm-field full'});
    imgF.appendChild(h('label', {text:'Foto sampul (opsional, menggantikan desain poster)'}));
    var row = h('div', {class:'adm-imgrow'});
    var file = h('input', {type:'file', accept:'image/*', hidden:''});
    var pick = h('button', {class:'adm-mini', type:'button', text: p.img ? 'Ganti Foto' : 'Unggah Foto'});
    var delImg = h('button', {class:'adm-mini danger', type:'button', text:'Hapus Foto'});
    pick.addEventListener('click', function(){ file.click(); });
    file.addEventListener('change', function(){
      if(!file.files[0]) return;
      processImage(file.files[0], 1200, function(url){
        p.img = url;
        thumb.style.background = 'url("' + url + '") center/cover';
        pick.textContent = 'Ganti Foto';
        scheduleSave();
      });
    });
    delImg.addEventListener('click', function(){
      p.img = '';
      thumb.style.background = 'var(--red)';
      pick.textContent = 'Unggah Foto';
      scheduleSave();
    });
    row.appendChild(pick); row.appendChild(delImg); row.appendChild(file);
    imgF.appendChild(row);
    grid.appendChild(imgF);

    body.appendChild(grid);

    var tools = h('div', {class:'adm-proj-tools'});
    var up = h('button', {class:'adm-mini', type:'button', text:'↑ Naik'});
    var down = h('button', {class:'adm-mini', type:'button', text:'↓ Turun'});
    var dup = h('button', {class:'adm-mini', type:'button', text:'Duplikat'});
    var del = h('button', {class:'adm-mini danger', type:'button', text:'Hapus Proyek'});
    up.addEventListener('click', function(){
      if(i === 0) return;
      work.projects.splice(i - 1, 0, work.projects.splice(i, 1)[0]);
      scheduleSave(); showTab('portofolio');
    });
    down.addEventListener('click', function(){
      if(i >= work.projects.length - 1) return;
      work.projects.splice(i + 1, 0, work.projects.splice(i, 1)[0]);
      scheduleSave(); showTab('portofolio');
    });
    dup.addEventListener('click', function(){
      work.projects.splice(i + 1, 0, clone(p));
      scheduleSave(); showTab('portofolio');
    });
    del.addEventListener('click', function(){
      if(!confirm('Hapus proyek "' + (p.title || '') + '"?')) return;
      work.projects.splice(i, 1);
      scheduleSave(); showTab('portofolio');
    });
    tools.appendChild(up); tools.appendChild(down); tools.appendChild(dup); tools.appendChild(del);
    body.appendChild(tools);
    det.appendChild(body);
    return det;
  }

  /* ---------- Aksi toolbar ---------- */
  document.getElementById('btnDownload').addEventListener('click', function(){
    var text = 'window.KPP_CONTENT = ' + JSON.stringify(work, null, 2) + ';\n';
    var blob = new Blob([text], {type:'text/javascript'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'content.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 2000);
    toast('content.js diunduh — timpa file di assets/ hosting Anda');
  });

  document.getElementById('fileImport').addEventListener('change', function(e){
    var f = e.target.files[0];
    if(!f) return;
    var reader = new FileReader();
    reader.onload = function(){
      try{
        var text = String(reader.result);
        var obj = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
        if(!obj.t || !obj.projects) throw new Error('format');
        work = obj;
        work.img = work.img || {}; work.kontak = work.kontak || {};
        scheduleSave(); showTab('umum');
        toast('Konten berhasil diimpor ✓');
      }catch(err){
        alert('File tidak dikenali. Pastikan memilih file content.js hasil unduhan panel ini.');
      }
      e.target.value = '';
    };
    reader.readAsText(f);
  });

  document.getElementById('btnReset').addEventListener('click', function(){
    if(!confirm('Buang semua perubahan dan kembali ke konten bawaan?')) return;
    try{ localStorage.removeItem(LS_DRAFT); }catch(e){}
    work = clone(base);
    if(window.KPP_REFRESH) window.KPP_REFRESH(clone(work));
    showTab('umum');
    toast('Draf dibuang — kembali ke bawaan');
  });

  document.getElementById('btnPreview').addEventListener('click', function(){
    if(window.KPP_REFRESH){
      window.KPP_REFRESH(clone(work));
      location.hash = '#/beranda';
    } else {
      window.open('index.html', '_blank');
    }
  });

  /* Buka langsung jika sudah pernah masuk di sesi ini
     (dipanggil paling akhir agar semua elemen & fungsi siap) */
  if(unlocked) openApp();
})();
