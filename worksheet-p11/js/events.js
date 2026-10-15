
 // P11 — Event dan Local Storage

import { daftarProyek } from "./data.js";

import {
    state,
    tambahLatihan,
    ubahKategoriAktif,
    aturUlang
} from "./state.js";

import {
    elemen,
    tampilkanProyek,
    tampilkanRiwayat,
    tampilkanJumlahLatihan,
    aturTombolFilterAktif
} from "./dom.js";

// Menampilkan proyek berdasarkan state
export function renderProyekSesuaiState() {
    const proyekTerpilih = daftarProyek.filter((proyek) => {
        return (
            state.kategoriAktif === "semua" ||
            proyek.kategori === state.kategoriAktif
        );
    });

    // Mengatur urutan judul
    proyekTerpilih.sort((a, b) => {
        const hasil = a.judul.localeCompare(b.judul, "id-ID");

        return state.urutanTampilan === "judul-desc"
            ? -hasil
            : hasil;
    });

    aturTombolFilterAktif(state.kategoriAktif);
    tampilkanProyek(proyekTerpilih);
}

// Memasang event listener
export function pasangEvent() {
    elemen.filter.addEventListener("click", tanganiFilter);

    elemen.form.addEventListener("submit", tanganiFormSubmit);

    // Tombol Atur Ulang
    elemen.tombolAturUlang.addEventListener("click", () => {
        aturUlang();
        renderProyekSesuaiState();
    });

    // Menghapus validasi khusus saat mengetik kembali
    const jenisInput = elemen.form.querySelector("#jenis");

    if (jenisInput instanceof HTMLInputElement) {
        jenisInput.addEventListener("input", () => {
            jenisInput.setCustomValidity("");
        });
    }
}

// Menangani klik filter
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

    // Simpan kategori ke state dan Local Storage
    ubahKategoriAktif(kategori);

    // Gambar ulang daftar proyek
    renderProyekSesuaiState();
}

// Menangani formulir latihan
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
        throw new Error("Kolom formulir latihan tidak ditemukan.");
    }

    const tanggal = tanggalInput.value;
    const olahraga = jenisInput.value.trim();
    const nilaiDurasi = durasiInput.value;
    const durasi = Number(nilaiDurasi);

    if (!tanggal) {
        tanggalInput.reportValidity();
        return;
    }

    if (!olahraga) {
        jenisInput.setCustomValidity(
            "Jenis olahraga wajib diisi."
        );

        jenisInput.reportValidity();
        return;
    }

    jenisInput.setCustomValidity("");

    if (
        !nilaiDurasi ||
        !Number.isFinite(durasi) ||
        durasi < 1
    ) {
        durasiInput.reportValidity();
        return;
    }

    tambahLatihan({
        tanggal,
        olahraga,
        durasi
    });

    tampilkanRiwayat(state.riwayatOlahraga);
    tampilkanJumlahLatihan(state.jumlahLatihanDicatat);

    elemen.form.reset();
}
