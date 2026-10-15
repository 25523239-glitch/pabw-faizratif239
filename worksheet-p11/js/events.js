
 // P11 — Pemasangan event listener

import { daftarProyek } from "./data.js";

import {
    state,
    tambahLatihan,
    ubahKategoriAktif
} from "./state.js";

import {
    elemen,
    tampilkanProyek,
    tampilkanRiwayat,
    tampilkanJumlahLatihan,
    aturTombolFilterAktif
} from "./dom.js";

// Memasang semua event listener
export function pasangEvent() {
    // Event delegation pada tombol filter
    elemen.filter.addEventListener("click", tanganiFilter);

    // Event pengiriman formulir
    elemen.form.addEventListener("submit", tanganiFormSubmit);

    // Hapus pesan validasi khusus saat pengguna mengetik kembali
    const jenisInput = elemen.form.querySelector("#jenis");

    if (jenisInput instanceof HTMLInputElement) {
        jenisInput.addEventListener("input", () => {
            jenisInput.setCustomValidity("");
        });
    }
}

// Menangani klik tombol filter
function tanganiFilter(event) {
    const tombol = event.target instanceof Element
        ? event.target.closest("button[data-kategori]")
        : null;

    if (
        !(tombol instanceof HTMLButtonElement) ||
        !elemen.filter.contains(tombol)
    ) {
        return;
    }

    const kategori = tombol.dataset.kategori ?? "semua";

    // Perbarui state kategori
    ubahKategoriAktif(kategori);

    // Memilih proyek sesuai kategori
    const proyekTerpilih = daftarProyek.filter((proyek) => {
        return (
            state.kategoriAktif === "semua" ||
            proyek.kategori === state.kategoriAktif
        );
    });

    // Urutkan proyek berdasarkan judul
    proyekTerpilih.sort((a, b) =>
        a.judul.localeCompare(b.judul, "id-ID")
    );

    // Perbarui tampilan
    aturTombolFilterAktif(state.kategoriAktif);
    tampilkanProyek(proyekTerpilih);
}

// Menangani pengiriman formulir latihan
function tanganiFormSubmit(event) {
    event.preventDefault();

    const tanggalInput = elemen.form.querySelector("#tanggal");
    const jenisInput = elemen.form.querySelector("#jenis");
    const durasiInput = elemen.form.querySelector("#durasi");

    if (
        !(tanggalInput instanceof HTMLInputElement) ||
        !(jenisInput instanceof HTMLInputElement) ||
        !(durasiInput instanceof HTMLInputElement)
    ) {
        throw new Error(
            "Kolom formulir latihan tidak ditemukan."
        );
    }

    const tanggal = tanggalInput.value;
    const olahraga = jenisInput.value.trim();
    const nilaiDurasi = durasiInput.value;
    const durasi = Number(nilaiDurasi);

    // Validasi tanggal
    if (!tanggal) {
        tanggalInput.reportValidity();
        return;
    }

    // Validasi jenis olahraga
    if (!olahraga) {
        jenisInput.setCustomValidity(
            "Jenis olahraga wajib diisi."
        );

        jenisInput.reportValidity();
        return;
    }

    jenisInput.setCustomValidity("");

    // Validasi durasi
    if (
        !nilaiDurasi ||
        !Number.isFinite(durasi) ||
        durasi < 1
    ) {
        durasiInput.reportValidity();
        return;
    }

    // Menambahkan latihan ke state
    tambahLatihan({
        tanggal,
        olahraga,
        durasi
    });

    // Memperbarui halaman
    tampilkanRiwayat(state.riwayatOlahraga);
    tampilkanJumlahLatihan(state.jumlahLatihanDicatat);

    // Mengosongkan formulir setelah berhasil disimpan
    elemen.form.reset();
}
