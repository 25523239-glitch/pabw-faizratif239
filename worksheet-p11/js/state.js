
 // P11 — State aplikasi dan fungsi pengubahnya

import { riwayatOlahragaAwal } from "./data.js";

// Satu objek untuk menyimpan state aplikasi
export const state = {
    riwayatOlahraga: riwayatOlahragaAwal.map((latihan) => ({
        ...latihan
    })),

    jumlahLatihanDicatat: riwayatOlahragaAwal.length,

    kategoriAktif: "semua"
};

// Menambahkan latihan baru ke state
export function tambahLatihan(latihan) {
    state.riwayatOlahraga.push({
        tanggal: latihan.tanggal,
        olahraga: latihan.olahraga,
        durasi: Number(latihan.durasi)
    });

    // Sinkronkan jumlah latihan dengan isi riwayat
    state.jumlahLatihanDicatat = state.riwayatOlahraga.length;
}

// Mengubah kategori filter yang aktif
export function ubahKategoriAktif(kategori) {
    state.kategoriAktif = kategori;
}
