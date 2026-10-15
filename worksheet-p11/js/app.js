
 // P11 — Perakit dan inisialisasi aplikasi

import {
    profil,
    jumlahProyek,
    daftarProyek,
    jadwalMingguan,
    buatPerkenalan,
    formatKeahlian
} from "./data.js";

import { state } from "./state.js";

import {
    tampilkanProfil,
    tampilkanJadwal,
    tampilkanProyek,
    tampilkanRiwayat,
    tampilkanRingkasan,
    aturTombolFilterAktif
} from "./dom.js";

import { pasangEvent } from "./events.js";

// Mengurutkan salinan data tanpa mengubah data asli
const proyekTerurut = [...daftarProyek].sort(
    (a, b) => a.judul.localeCompare(b.judul, "id-ID")
);

// Menghitung proyek yang sudah selesai
const proyekSelesai = daftarProyek.filter(
    (proyek) => proyek.selesai
);

// Mencari proyek unggulan
const proyekUnggulan = daftarProyek.find(
    (proyek) => proyek.judul === "Halaman Profil Olahraga"
);

// Menampilkan seluruh data awal
tampilkanProfil(profil);
tampilkanJadwal(jadwalMingguan);
tampilkanProyek(proyekTerurut);
tampilkanRiwayat(state.riwayatOlahraga);

// Menampilkan ringkasan
tampilkanRingkasan({
    proyekUnggulan,
    jumlahSelesai: proyekSelesai.length,
    jumlahProyek,
    jumlahLatihan: state.jumlahLatihanDicatat
});

// Menandai tombol filter yang aktif
aturTombolFilterAktif(state.kategoriAktif);

// Memasang event listener setelah halaman siap dirender
pasangEvent();

// Pemeriksaan data di Console untuk pembelajaran ES6+
const kalimatPerkenalan = buatPerkenalan(profil);

console.log("Perkenalan:", kalimatPerkenalan);
console.log("Keahlian:", formatKeahlian(profil.keahlian));
console.log("Tipe nama:", typeof profil.nama);
console.log("Tipe jumlahProyek:", typeof jumlahProyek);

console.table(profil.keahlian);
console.table(daftarProyek);
console.table(proyekSelesai);

console.log("Hasil find:", proyekUnggulan);
console.log("Data asli setelah sort salinan:", daftarProyek);
console.log("Salinan terurut:", proyekTerurut);
