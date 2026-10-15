
 // P11 — State dan Local Storage

import { riwayatOlahragaAwal } from "./data.js";

// Kunci penyimpanan
const KUNCI_KATEGORI = "p11.kategoriAktif";
const KUNCI_URUTAN = "p11.urutanTampilan";

// Pilihan yang diizinkan
const KATEGORI_VALID = ["semua", "web", "data"];
const URUTAN_VALID = ["judul-asc", "judul-desc"];

// Membaca Local Storage dan menentukan nilai bawaan
function bacaPilihan(kunci, pilihan, bawaan) {
    const tersimpan = localStorage.getItem(kunci);

    if (tersimpan === null || !pilihan.includes(tersimpan)) {
        return bawaan;
    }

    return tersimpan;
}

// Satu objek untuk menyimpan state aplikasi
export const state = {
    riwayatOlahraga: riwayatOlahragaAwal.map((latihan) => ({
        ...latihan
    })),

    jumlahLatihanDicatat: riwayatOlahragaAwal.length,

    kategoriAktif: bacaPilihan(
        KUNCI_KATEGORI,
        KATEGORI_VALID,
        "semua"
    ),

    urutanTampilan: bacaPilihan(
        KUNCI_URUTAN,
        URUTAN_VALID,
        "judul-asc"
    )
};

// Menambahkan latihan baru ke state
export function tambahLatihan(latihan) {
    state.riwayatOlahraga.push({
        tanggal: latihan.tanggal,
        olahraga: latihan.olahraga,
        durasi: Number(latihan.durasi)
    });

    state.jumlahLatihanDicatat = state.riwayatOlahraga.length;
}

// Mengubah kategori dan menyimpannya
export function ubahKategoriAktif(kategori) {
    if (!KATEGORI_VALID.includes(kategori)) {
        return;
    }

    state.kategoriAktif = kategori;

    localStorage.setItem(KUNCI_KATEGORI, kategori);
}

// Mengubah urutan tampilan dan menyimpannya
export function ubahUrutanTampilan(urutan) {
    if (!URUTAN_VALID.includes(urutan)) {
        return;
    }

    state.urutanTampilan = urutan;

    localStorage.setItem(KUNCI_URUTAN, urutan);
}

// Mengembalikan preferensi ke nilai bawaan
export function aturUlang() {
    state.kategoriAktif = "semua";
    state.urutanTampilan = "judul-asc";

    localStorage.removeItem(KUNCI_KATEGORI);
    localStorage.removeItem(KUNCI_URUTAN);
}
