<div align="center">

# Delcom Courses

Lyson P.E. Manik
ifs24024

**Aplikasi manajemen kursus berbasis SvelteKit & TypeScript**

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

</div>

---

## Deskripsi

**Delcom Courses** adalah aplikasi web untuk mengelola dan mengikuti kursus, dibangun dengan **SvelteKit 3**, **TypeScript**, **Svelte 5**, dan `adapter-bun`. Data bersumber dari [Delcom Open API – Courses](https://open-api.delcom.org/docs/1.0/api-courses).

Proyek ini merupakan **Studi Kasus 2 (3.2)** pada tugas praktikum Pengembangan Aplikasi Web (PABWE 2026) dan melanjutkan konfigurasi latihan SvelteKit 2.2.

- **Nama proyek:** `{username}-pabwe2026-sk-p6-sveltekit`
  (contoh: `abdullah_ubaid-pabwe2026-sk-p6-sveltekit`)

## Fitur Utama

| Area | Fitur |
| --- | --- |
| **Autentikasi** | Login, registrasi, dan pengalihan sesi otomatis (`AuthSessionRedirect`) |
| **Pengguna & Profil** | Daftar pengguna, profil, ubah foto, dan ubah kata sandi |
| **Kursus** | Daftar, pencarian, filter "milik saya", tambah, ubah, hapus (satu atau semua), dan ubah sampul |
| **Peserta** | Daftar peserta dan keluar dari kursus |
| **Rating** | Penilaian peserta pada skala 1–5 |
| **Konten** | Tambah, ubah, detail, hapus materi, pemutar tautan YouTube, dan status belajar (`0` / `1`) |

### Peran Pengguna

- **Pemilik kursus**: pengguna yang `user_id` kursusnya sama dengan id profil.
- **Peserta**: pengguna yang id-nya terdapat pada daftar `students`.
- Jika kedua kondisi terpenuhi, **antarmuka pemilik** ditampilkan lebih dahulu.

## Teknologi

- [SvelteKit 3](https://svelte.dev/docs/kit) + [Svelte 5](https://svelte.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Bun](https://bun.sh) dengan `adapter-bun`
- [lucide-svelte](https://lucide.dev) untuk ikon
- Vitest untuk pengujian otomatis

## Konfigurasi Lingkungan

Buat berkas `.env` di root proyek:

```env
VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
APP_PORT=3005
```

## Memulai

### Prasyarat

- [Bun](https://bun.sh) terpasang

### Instalasi

```bash
bun install
```

### Mode Pengembangan

```bash
bun run dev
```

Aplikasi berjalan di **http://localhost:3005**.

### Build & Produksi

```bash
bun run build
bun start
```

### Pengujian

```bash
bun run test:coverage
```

> Perintah ini harus lulus dengan **threshold coverage 100%**.

## Cakupan API (`courseApi.ts`)

| Kategori | Endpoint |
| --- | --- |
| **Kursus** | `POST /courses` (`title`, `description`) |
| | `PUT /courses/:id` |
| | `GET /courses` → data pada `data.courses` |
| | `GET /courses/:id` → data pada `data.course` |
| | `DELETE /courses/:id` |
| | `DELETE /courses` (hapus semua) |
| **Sampul** | `POST /courses/:id/cover` (berkas `cover`) |
| **Peserta** | Daftar peserta & keluar dari kursus |
| **Rating** | Rating peserta, skala 1–5 |
| **Konten** | Tambah, ubah, hapus |
| | `GET /courses/-/contents/:id` → data pada `data.course_content` |
| | Ubah status belajar `0` atau `1` |

## Rute

| Rute | Deskripsi |
| --- | --- |
| `/` | Daftar kursus |
| `/courses/[courseId]` | Detail kursus (param dibaca via `$derived(page.params.courseId)`) |
| `/courses/[courseId]/contents/[contentId]` | Halaman materi |
| `/auth/login` | Halaman login |
| `/auth/register` | Halaman registrasi |
| `/users` | Daftar pengguna |
| `/profile` | Profil pengguna |
| `+error.svelte` | Halaman tidak ditemukan |

**Catatan layout:** `src/routes/+layout.svelte` memakai `page` dari `$app/state`. Rute `/auth` **tidak** memakai layout kursus, sedangkan rute lainnya dibungkus `CourseLayout`.

## Catatan Implementasi

- Judul aplikasi: **Delcom Courses**; menu utama pada sidebar berlabel **Semua Kursus**.
- Logo navbar, halaman autentikasi, dan `static/logo.svg` memakai **ikon topi wisuda**.
- Ikon video memakai `Video` dari `lucide-svelte` (pustaka ini **tidak** mengekspor `Youtube`).
- Setelah login berhasil dan profil tersedia, pengguna diarahkan dengan `goto("/")` dari `$app/navigation`.
- Teks pengenal pada layout autentikasi menjelaskan tentang kursus.
- Modul `apiHelper.ts`, `toolsHelper.ts`, `useInput.ts`, dan `env.d.ts` dipertahankan dari latihan.
- State kursus (`coursesStore.ts`) menyimpan koleksi, detail, konten, serta bendera mutasi untuk kursus, sampul, peserta, rating, dan konten.

## Pengujian Otomatis

Cakupan uji meliputi:

- Helper & custom hook
- API & store
- Navbar, sidebar, dan layout
- Modal & halaman
- Rute dan `App.test.ts`

## Lisensi

Proyek ini dibuat untuk keperluan akademik (tugas praktikum PABWE 2026).
# Delcom Courses (SvelteKit 3 + Svelte 5 + TypeScript)

Aplikasi kursus berbasis Delcom Open API (https://open-api.delcom.org/docs/1.0/api-courses).

## Menjalankan
```bash
bun install
bun run dev            # http://localhost:3005
bun run build && bun start
bun run test:coverage  # threshold 100%
```
`.env`: `VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1`, `APP_PORT=3005`.

## Catatan teknis
- SvelteKit 3 tidak lagi memakai `svelte.config.js`; adapter (`@sveltejs/adapter-bun`) diatur di `vite.config.ts`.
- `svelte-adapter-bun` (pihak ketiga) tidak kompatibel dengan Kit 3, maka dipakai adapter resmi.
- Mutasi menyalakan bendera di `coursesStore`; halaman memuat ulang data saat bendera menyala.
