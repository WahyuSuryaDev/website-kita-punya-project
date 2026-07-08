# Website Company Profile — PT Kita Punya Project

Website company profile berbasis **Next.js** (static export) dengan **panel admin ber-dashboard**
untuk mengelola seluruh konten: teks, gambar, info kontak, item layanan, hingga proyek portofolio.

🌐 **Live:** https://wahyusuryadev.github.io/website-kita-punya-project/
## Struktur

| Lokasi | Fungsi |
|---|---|
| `app/(site)/` | Halaman publik: Beranda, Tentang, Layanan, Portofolio, Kontak |
| `app/admin/` | Panel admin (dashboard + sidebar) |
| `components/` | Komponen situs & admin |
| `lib/default-content.js` | Konten bawaan (fallback) |
| `public/content.json` | **Seluruh isi website yang tayang** — teks, kontak, layanan, proyek |
| `docs/` | Hasil build statis → disajikan GitHub Pages |

## Mengubah isi website (tanpa coding)

1. Buka `/admin/` di website live, masukkan kode akses.
2. Edit lewat sidebar — *Layanan* dan *Proyek Portofolio* sepenuhnya dinamis
   (tambah/hapus/urutkan item, unggah foto sampul).
3. Perubahan otomatis tersimpan sebagai **draf di browser** — cek lewat tombol *Pratinjau*.
4. Klik **Unduh content.json** → di GitHub buka `public/content.json` **dan** `docs/content.json`
   → ikon pensil ✏️ → tempel isi baru → Commit. Situs terbarui ±1 menit **tanpa build ulang**.

> Catatan: `docs/content.json` adalah file yang dibaca situs live; `public/content.json` adalah
> sumbernya saat build. Ubah keduanya agar tetap sinkron (atau jalankan build ulang).

## Pengembangan

```bash
npm install
npm run dev     # buka http://localhost:3000/website-kita-punya-project/
npm run build   # menghasilkan folder docs/ untuk GitHub Pages
```

Setelah mengubah kode, jalankan `npm run build` lalu commit — GitHub Pages menyajikan folder `docs/`.

## Catatan

- Seluruh proyek portofolio masih **contoh (dummy)** — ganti lewat panel admin.
- Data kontak (WhatsApp, email, Instagram, alamat) masih placeholder — ubah di *Info Kontak*.
- Kode akses admin hanya pembatas ringan; perubahan tidak bisa tayang tanpa akses repo ini.

---

Dibuat dengan bantuan [Claude Code](https://claude.com/claude-code) · Juli 2026
