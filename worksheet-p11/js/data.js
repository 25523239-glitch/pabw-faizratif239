
 // P11 — Data mentah dan fungsi murni pemformat

// Data profil
export const profil = {
    judulHalaman: "Jadwal dan Catatan Olahraga Saya",
    nama: "Faiz Ratif Az Zubair",
    peran: "Mahasiswa Informatika yang belajar front-end",
    bio: "Membuat halaman olahraga responsif yang datanya diolah dengan JavaScript modern.",
    keahlian: ["HTML", "CSS", "JavaScript"],
    kontak: {
        instagram: "@faizratif"
    }
};

// Data proyek
export const daftarProyek = [
    {
        judul: "Halaman Profil Olahraga",
        tahun: 2026,
        selesai: true,
        kategori: "web"
    },
    {
        judul: "Jadwal Latihan Mingguan",
        tahun: 2026,
        selesai: true,
        kategori: "web"
    },
    {
        judul: "Formulir Catatan Latihan",
        tahun: 2026,
        selesai: true,
        kategori: "web"
    },
    {
        judul: "Dashboard Olahraga Responsif",
        tahun: 2026,
        selesai: false,
        kategori: "data"
    }
];

export const jumlahProyek = daftarProyek.length;

// Data jadwal mingguan
export const jadwalMingguan = [
    { hari: "Senin", olahraga: "Lari Pagi", durasi: 30, kalori: 300 },
    { hari: "Rabu", olahraga: "Angkat Beban", durasi: 45, kalori: 250 },
    { hari: "Jumat", olahraga: "Bersepeda", durasi: 60, kalori: 400 }
];

// Data awal riwayat olahraga
export const riwayatOlahragaAwal = [
    {
        tanggal: "2026-09-23",
        olahraga: "Lari Pagi",
        durasi: 30
    }
];

// Fungsi murni untuk membuat kalimat perkenalan
export function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

// Fungsi murni untuk memformat daftar keahlian
export function formatKeahlian(daftar) {
    return daftar.join(" · ");
}

// Fungsi murni untuk memformat tanggal ke bahasa Indonesia
export function formatTanggal(tanggal) {
    const [tahun, bulan, hari] = tanggal.split("-").map(Number);

    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(Date.UTC(tahun, bulan - 1, hari)));
}
