# Website Company Profile — PT Kita Punya Project

Website statis 5 halaman + panel admin, tanpa framework — cukup HTML, CSS, dan JavaScript murni. Bisa di-hosting di mana saja (GitHub Pages, Netlify, Vercel, cPanel).

## Struktur

| File | Fungsi |
|---|---|
| `index.html` | Beranda |
| `tentang.html` | Profil, visi & misi, nilai perusahaan |
| `layanan.html` | Event Activation & Service Management |
| `portofolio.html` | Galeri proyek (filter + detail) |
| `kontak.html` | Formulir (terhubung WhatsApp) + FAQ |
| `admin.html` | **Panel admin** — kelola semua teks, gambar & proyek |
| `assets/content.js` | **Seluruh isi website** (teks, kontak, proyek) |
| `assets/style.css` / `main.js` | Tampilan & perilaku |

## Cara mengubah isi website

1. Buka `admin.html` (bisa langsung dari komputer atau dari hosting).
2. Masukkan kode akses (bawaan: `kpp2026` — ganti di `assets/admin.js`, variabel `PASS`).
3. Ubah teks, ganti logo, kelola proyek portofolio. Perubahan otomatis tersimpan
   sebagai **draf di browser** dan bisa dipratinjau lewat tombol *Pratinjau Situs*.
4. Klik **Unduh content.js**, lalu timpa file `assets/content.js` di repo/hosting ini
   (di GitHub: buka file → ikon pensil ✏️ / *Upload files* → commit). Perubahan langsung tayang.

## Catatan

- Seluruh proyek portofolio saat ini adalah **contoh (dummy)** — ganti lewat panel admin.
- Data kontak (WhatsApp, email, Instagram, alamat) masih placeholder — ubah di tab
  **Kontak & Info** pada panel admin, atau langsung di `assets/content.js`.
- `admin.html` tidak ditautkan dari halaman publik dan diberi `noindex`. Kode aksesnya
  hanya pembatas ringan (bukan keamanan sungguhan) — perubahan tetap tidak bisa tayang
  tanpa akses ke repo/hosting ini.

---

Dibuat dengan bantuan [Claude Code](https://claude.com/claude-code) · Juli 2026
