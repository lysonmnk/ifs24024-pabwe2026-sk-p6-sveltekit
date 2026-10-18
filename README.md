
# Delcom Courses

Aplikasi web manajemen kursus berbasis **SvelteKit** dan **TypeScript** yang terhubung dengan Delcom Open API. Aplikasi mencakup autentikasi, pengelolaan profil dan pengguna, pengelolaan kursus beserta sampul, peserta, rating, dan konten pembelajaran berupa video YouTube.

Sumber data: [Delcom Open API - Courses](https://open-api.delcom.org/docs/1.0/api-courses)

## Daftar Isi

1. [Teknologi](#teknologi)
2. [Prasyarat](#prasyarat)
3. [Instalasi dan Konfigurasi](#instalasi-dan-konfigurasi)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Pengujian](#pengujian)
6. [Struktur Proyek](#struktur-proyek)
7. [Fitur](#fitur)
8. [Rute Aplikasi](#rute-aplikasi)
9. [Ringkasan Endpoint API](#ringkasan-endpoint-api)
10. [Catatan Implementasi](#catatan-implementasi)

## Teknologi

| Komponen | Keterangan |
| --- | --- |
| Framework | SvelteKit 3 |
| Antarmuka | Svelte 5 |
| Bahasa | TypeScript |
| Adapter | `adapter-bun` |
| Runtime dan paket | Bun |
| Ikon | `lucide-svelte` |
| Pengujian | Cakupan kode (coverage) dengan threshold 100% |

## Prasyarat

- [Bun](https://bun.sh) versi terbaru
- Git
- Koneksi internet untuk mengakses Delcom Open API

## Instalasi dan Konfigurasi

1. Kloning repositori dan masuk ke direktori proyek. Nama proyek mengikuti format `{username}-pabwe2026-sk-p6-sveltekit`, misalnya `abdullah_ubaid-pabwe2026-sk-p6-sveltekit`.

   ```bash
   git clone <url-repositori>
   cd {username}-pabwe2026-sk-p6-sveltekit
   ```

2. Pasang dependensi.

   ```bash
   bun install
   ```

3. Buat berkas `.env` di direktori utama proyek dengan isi berikut.

   ```env
   VITE_DELCOM_BASEURL=https://open-api.delcom.org/api/v1
   APP_PORT=3005
   ```

   | Variabel | Fungsi |
   | --- | --- |
   | `VITE_DELCOM_BASEURL` | Alamat dasar Delcom Open API. Awalan `VITE_` diperlukan agar variabel dapat dibaca di sisi klien. |
   | `APP_PORT` | Port yang digunakan aplikasi. |

   Server pengembangan harus dijalankan ulang setiap kali berkas `.env` diubah.

## Menjalankan Aplikasi

**Mode pengembangan**

```bash
bun run dev
```

Aplikasi dapat diakses melalui `http://localhost:3005`.

**Mode produksi**

```bash
bun run build
bun start
```

## Pengujian

Jalankan seluruh pengujian beserta laporan cakupan:

```bash
bun run test:coverage
```

Perintah tersebut harus lulus dengan threshold cakupan **100%**. Pengujian meliputi:

- helper, hook, dan API
- store
- navbar, sidebar, dan layout
- modal dan halaman
- rute
- `App.test.ts`

## Struktur Proyek

```text
src/
├── features/
│   ├── auth/                  # Fitur autentikasi
│   │   └── AuthSessionRedirect.svelte
│   ├── users/                 # Daftar pengguna, profil, foto, kata sandi
│   └── courses/               # Fitur utama kursus
│       ├── api/
│       │   └── courseApi.ts
│       ├── states/
│       │   └── coursesStore.ts
│       ├── layouts/
│       │   └── CourseLayout.svelte
│       ├── pages/
│       │   ├── HomePage.svelte
│       │   ├── DetailPage.svelte
│       │   └── ContentPage.svelte
│       └── modals/
│           ├── AddModal.svelte
│           ├── ChangeModal.svelte
│           ├── ChangeCoverModal.svelte
│           └── ContentModal.svelte
├── routes/
│   ├── +layout.svelte
│   ├── +error.svelte
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── users/
│   ├── profile/
│   └── courses/
│       └── [courseId]/
│           └── contents/
│               └── [contentId]/
├── apiHelper.ts
├── toolsHelper.ts
├── useInput.ts
└── env.d.ts
static/
└── logo.svg                   # Ikon topi wisuda
```

Penempatan berkas helper dan hook mengikuti struktur latihan SvelteKit sebelumnya.

## Fitur

### Autentikasi

- Registrasi dan login pengguna.
- `AuthSessionRedirect.svelte` mengelola pengalihan berdasarkan sesi.
- Setelah login berhasil dan profil tersedia, pengguna diarahkan ke `/` menggunakan `goto("/")` dari `$app/navigation`.
- Layout autentikasi memuat teks pengenal yang menjelaskan aplikasi kursus.

### Profil dan Pengguna

- Daftar pengguna.
- Profil pengguna.
- Perubahan foto profil.
- Perubahan kata sandi.

### Kursus

- Menampilkan daftar kursus dengan pencarian dan filter **milik saya**.
- Menambah, mengubah, dan menghapus kursus, termasuk menghapus seluruh kursus.
- Mengunggah dan mengganti sampul kursus.
- Mengelola peserta: mendaftar dan keluar dari kursus.
- Memberikan rating peserta pada skala 1 sampai 5.
- Mengelola konten pembelajaran: tambah, ubah, lihat detail, dan hapus.
- Memutar konten video berbasis tautan YouTube.
- Memperbarui status belajar konten (`0` belum selesai, `1` selesai).

### Hak Akses Antarmuka

- **Pemilik kursus** adalah pengguna dengan `user_id` yang sama dengan id profil.
- **Peserta** adalah pengguna dengan id yang terdaftar pada `students`.
- Apabila seorang pengguna memenuhi kedua kondisi, antarmuka pemilik ditampilkan lebih dulu.

## Rute Aplikasi

| Rute | Deskripsi |
| --- | --- |
| `/` | Daftar kursus |
| `/courses/[courseId]` | Detail kursus |
| `/courses/[courseId]/contents/[contentId]` | Materi kursus |
| `/auth/login` | Halaman login |
| `/auth/register` | Halaman registrasi |
| `/users` | Daftar pengguna |
| `/profile` | Profil pengguna |

Ketentuan rute:

- `src/routes/+layout.svelte` memakai `page` dari `$app/state`.
- Rute `/auth` tidak memakai layout kursus. Rute lain dibungkus `CourseLayout`.
- Parameter rute dibaca dengan `$derived(page.params.courseId)`.
- `+error.svelte` menampilkan halaman tidak ditemukan.

## Ringkasan Endpoint API

Seluruh endpoint menggunakan `VITE_DELCOM_BASEURL` sebagai alamat dasar dan didefinisikan pada `src/features/courses/api/courseApi.ts`.

| Metode | Endpoint | Keterangan |
| --- | --- | --- |
| `POST` | `/courses` | Membuat kursus (`title`, `description`) |
| `POST` | `/courses/:id/cover` | Mengunggah sampul (berkas `cover`) |
| `PUT` | `/courses/:id` | Mengubah kursus |
| `GET` | `/courses` | Mengambil daftar kursus |
| `GET` | `/courses/:id` | Mengambil detail kursus |
| `DELETE` | `/courses/:id` | Menghapus satu kursus |
| `DELETE` | `/courses` | Menghapus semua kursus |
| `GET` | `/courses/-/contents/:id` | Mengambil detail konten |

Endpoint tambahan mencakup pendaftaran dan keluar peserta, rating peserta (1 sampai 5), serta tambah, ubah, hapus, dan pembaruan status belajar konten. Spesifikasi lengkap tersedia pada [dokumentasi API](https://open-api.delcom.org/docs/1.0/api-courses).

Kunci data pada respons:

| Sumber | Kunci |
| --- | --- |
| Daftar kursus | `data.courses` |
| Detail kursus | `data.course` |
| Konten | `data.course_content` |

## Catatan Implementasi

- `coursesStore.ts` menyimpan koleksi kursus, detail, konten, serta bendera mutasi untuk kursus, sampul, peserta, rating, dan konten.
- `CourseLayout.svelte` membungkus navbar dan sidebar. Menu utama berlabel **Semua Kursus**.
- Judul aplikasi adalah **Delcom Courses**. Logo pada navbar, halaman autentikasi, dan `static/logo.svg` menggunakan ikon topi wisuda.
- Ikon video menggunakan `Video` dari `lucide-svelte`. Pustaka tersebut tidak mengekspor `Youtube`.
- Berkas `apiHelper.ts`, `toolsHelper.ts`, `useInput.ts`, dan `env.d.ts` dipertahankan dari latihan sebelumnya.
- Jangan menyimpan data rahasia pada variabel berawalan `VITE_` karena nilainya terbundel ke kode klien.
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
