
 // P11 — Pemilihan elemen dan render DOM

import {
    buatPerkenalan,
    formatKeahlian,
    formatTanggal
} from "./data.js";

// Memilih elemen HTML
export const elemen = {
    judulProfil: document.querySelector("#judul-profil"),
    judulHalaman: document.querySelector("#judul-halaman"),
    deskripsiProfil: document.querySelector("#deskripsi-profil"),

    profilNama: document.querySelector("#profil-nama"),
    profilPeran: document.querySelector("#profil-peran"),
    profilBio: document.querySelector("#profil-bio"),
    profilKeahlian: document.querySelector("#profil-keahlian"),
    profilKontak: document.querySelector("#profil-kontak"),
    footerProfil: document.querySelector("#footer-profil"),

    jadwalBody: document.querySelector("#jadwal-body"),

    daftarProyek: document.querySelector("#daftar"),
    filter: document.querySelector("#filter"),
    pesanKosong: document.querySelector("#pesan-kosong"),

    proyekUnggulan: document.querySelector("#proyek-unggulan"),
    proyekSelesai: document.querySelector("#proyek-selesai"),

    riwayatBody: document.querySelector("#riwayat-body"),
    jumlahLatihan: document.querySelector("#jumlah-latihan"),

    form: document.querySelector("#form form")
};

// Memastikan elemen yang diperlukan tersedia
const elemenWajib = [
    elemen.judulProfil,
    elemen.judulHalaman,
    elemen.deskripsiProfil,
    elemen.profilNama,
    elemen.profilPeran,
    elemen.profilBio,
    elemen.profilKeahlian,
    elemen.profilKontak,
    elemen.footerProfil,
    elemen.jadwalBody,
    elemen.daftarProyek,
    elemen.filter,
    elemen.pesanKosong,
    elemen.proyekUnggulan,
    elemen.proyekSelesai,
    elemen.riwayatBody,
    elemen.jumlahLatihan
];

if (elemenWajib.some((item) => !(item instanceof HTMLElement))) {
    throw new Error(
        "Ada elemen halaman yang tidak ditemukan. Periksa id di profil.html."
    );
}

if (!(elemen.form instanceof HTMLFormElement)) {
    throw new Error("Formulir latihan tidak ditemukan.");
}

// Menampilkan data profil
export function tampilkanProfil(profil) {
    const bio = profil.bio ?? "Profil belum memiliki deskripsi.";
    const instagram =
        profil.kontak?.instagram ?? "Belum ditambahkan";

    elemen.judulProfil.textContent = profil.judulHalaman;
    elemen.judulHalaman.textContent = profil.judulHalaman;
    elemen.deskripsiProfil.textContent = bio;

    elemen.profilNama.textContent = profil.nama;
    elemen.profilPeran.textContent = profil.peran;

    elemen.profilBio.textContent =
        `${buatPerkenalan(profil)}. ${bio}`;

    elemen.profilKeahlian.textContent =
        formatKeahlian(profil.keahlian);

    elemen.profilKontak.textContent =
        `Instagram: ${instagram}`;

    elemen.footerProfil.textContent =
        `${profil.nama} · 25523239 · 2026`;
}

// Menampilkan jadwal mingguan
export function tampilkanJadwal(data) {
    elemen.jadwalBody.replaceChildren();

    data.forEach((jadwal) => {
        const baris = document.createElement("tr");

        const nilaiJadwal = [
            jadwal.hari,
            jadwal.olahraga,
            jadwal.durasi,
            `${jadwal.kalori} kcal`
        ];

        nilaiJadwal.forEach((nilai) => {
            const sel = document.createElement("td");
            sel.textContent = String(nilai);
            baris.append(sel);
        });

        elemen.jadwalBody.append(baris);
    });
}

// Menampilkan daftar proyek
export function tampilkanProyek(data) {
    elemen.daftarProyek.replaceChildren();

    if (!Array.isArray(data) || data.length === 0) {
        elemen.pesanKosong.hidden = false;
        return;
    }

    elemen.pesanKosong.hidden = true;

    data.forEach((proyek) => {
        const kartu = document.createElement("li");
        kartu.className = "kartu-proyek";
        kartu.dataset.kategori = proyek.kategori ?? "web";

        const judul = document.createElement("h3");
        judul.textContent = proyek.judul;

        const keterangan = document.createElement("p");
        const status = proyek.selesai
            ? "Selesai"
            : "Dalam proses";

        keterangan.textContent = `${proyek.tahun} — ${status}`;

        kartu.append(judul, keterangan);
        elemen.daftarProyek.append(kartu);
    });
}

// Menampilkan riwayat olahraga
export function tampilkanRiwayat(data) {
    elemen.riwayatBody.replaceChildren();

    data.forEach((latihan) => {
        const baris = document.createElement("tr");

        const nilaiLatihan = [
            formatTanggal(latihan.tanggal),
            latihan.olahraga,
            `${latihan.durasi} menit`
        ];

        nilaiLatihan.forEach((nilai) => {
            const sel = document.createElement("td");
            sel.textContent = String(nilai);
            baris.append(sel);
        });

        elemen.riwayatBody.append(baris);
    });
}

// Menampilkan ringkasan proyek dan jumlah latihan
export function tampilkanRingkasan({
    proyekUnggulan,
    jumlahSelesai,
    jumlahProyek,
    jumlahLatihan
}) {
    elemen.proyekUnggulan.textContent =
        `Proyek unggulan: ${proyekUnggulan?.judul ?? "Belum ada"}`;

    elemen.proyekSelesai.textContent =
        `Jumlah proyek selesai: ${jumlahSelesai} dari ${jumlahProyek}`;

    tampilkanJumlahLatihan(jumlahLatihan);
}

// Memperbarui jumlah latihan
export function tampilkanJumlahLatihan(jumlah) {
    elemen.jumlahLatihan.textContent =
        `Latihan tercatat: ${jumlah}`;
}

// Mengubah kelas tombol filter yang aktif
export function aturTombolFilterAktif(kategori) {
    const tombolFilter =
        elemen.filter.querySelectorAll("button[data-kategori]");

    tombolFilter.forEach((tombol) => {
        tombol.classList.remove("aktif");

        if (tombol.dataset.kategori === kategori) {
            tombol.classList.add("aktif");
        }
    });
}
