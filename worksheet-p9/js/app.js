// P8 — JavaScript Modern ES6+, Struktur Data, dan Array Methods

// B.1 — Data identitas disimpan sebagai object.
const profil = {
    judulHalaman: "Jadwal dan Catatan Olahraga Saya",
    nama: "Faiz Ratif Az Zubair",
    peran: "Mahasiswa Informatika yang belajar front-end",
    bio: "Membuat halaman olahraga responsif yang datanya diolah dengan JavaScript modern.",
    keahlian: ["HTML", "CSS", "JavaScript"],
    kontak: {
        instagram: "@faizratif"
    }
};

// B.4 — Nilai angka benar-benar bertipe number.
const jumlahProyek = 4;

// D.1 — Array of object untuk proyek dan data halaman.
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

const jadwalMingguan = [
    { hari: "Senin", olahraga: "Lari Pagi", durasi: 30, kalori: 300 },
    { hari: "Rabu", olahraga: "Angkat Beban", durasi: 45, kalori: 250 },
    { hari: "Jumat", olahraga: "Bersepeda", durasi: 60, kalori: 400 }
];

export const riwayatOlahraga = [
    { tanggal: "2026-09-23", olahraga: "Lari Pagi", durasi: 30 }
];

// D.2 — Salinan dipakai saat pengurutan agar data asli tidak berubah.
const proyekTerurut = [...daftarProyek].sort((a, b) => a.judul.localeCompare(b.judul, "id-ID"));

// B.2, B.3 — Nilai bawaan ?? dan akses aman ?. dipakai pada data opsional.
const bioProfil = profil.bio ?? "Profil belum memiliki deskripsi.";
const kontakInstagram = profil.kontak?.instagram ?? "Belum ditambahkan";

// C.1 — Fungsi murni untuk menyusun kalimat perkenalan.
function buatPerkenalan({ nama, peran }) {
    return `${nama} — ${peran}`;
}

// C.1 — Fungsi murni untuk merapikan daftar keahlian.
const formatKeahlian = (daftar) => daftar.join(" · ");

// D.3 — Filter mengambil hanya proyek yang selesai.
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);

// D.3 — Find mengambil satu proyek pertama yang cocok.
const proyekUnggulan = daftarProyek.find((proyek) => proyek.judul === "Halaman Profil Olahraga");

// Referensi elemen DOM.
const judulProfil = document.querySelector("#judul-profil");
const judulHalaman = document.querySelector("#judul-halaman");
const deskripsiProfil = document.querySelector("#deskripsi-profil");
const profilNama = document.querySelector("#profil-nama");
const profilPeran = document.querySelector("#profil-peran");
const profilBio = document.querySelector("#profil-bio");
const profilKeahlian = document.querySelector("#profil-keahlian");
const profilKontak = document.querySelector("#profil-kontak");
const footerProfil = document.querySelector("#footer-profil");
const jadwalBody = document.querySelector("#jadwal-body");
const daftarProyekEl = document.querySelector("#daftar");
const filterEl = document.querySelector("#filter");
const pesanKosongEl = document.querySelector("#pesan-kosong");
const riwayatBody = document.querySelector("#riwayat-body");
const proyekUnggulanEl = document.querySelector("#proyek-unggulan");
const proyekSelesaiEl = document.querySelector("#proyek-selesai");
const jumlahLatihanEl = document.querySelector("#jumlah-latihan");
const form = document.querySelector("#form form");

const requiredElements = [
    judulProfil,
    judulHalaman,
    deskripsiProfil,
    profilNama,
    profilPeran,
    profilBio,
    profilKeahlian,
    profilKontak,
    footerProfil,
    jadwalBody,
    daftarProyekEl,
    filterEl,
    riwayatBody,
    proyekUnggulanEl,
    proyekSelesaiEl,
    jumlahLatihanEl
];

if (requiredElements.some((element) => !(element instanceof HTMLElement))) {
    throw new Error("Ada elemen halaman yang tidak ditemukan. Periksa id di profil.html.");
}

if (!(form instanceof HTMLFormElement)) {
    throw new Error("Formulir latihan tidak ditemukan.");
}

// Gunakan let karena nilainya berubah ketika formulir berhasil dikirim.
let jumlahLatihanDicatat = riwayatOlahraga.length;

// Menampilkan identitas dari object profil.
const kalimatPerkenalan = buatPerkenalan(profil);
judulProfil.textContent = profil.judulHalaman;
judulHalaman.textContent = profil.judulHalaman;
deskripsiProfil.textContent = bioProfil;
profilNama.textContent = profil.nama;
profilPeran.textContent = profil.peran;
profilBio.textContent = `${kalimatPerkenalan}. ${bioProfil}`;
profilKeahlian.textContent = formatKeahlian(profil.keahlian);
profilKontak.textContent = `Instagram: ${kontakInstagram}`;
footerProfil.textContent = `${profil.nama} · 25523239 · 2026`;

// map — mengubah setiap data jadwal menjadi satu baris tabel.
function tampilkanJadwal(data) {
    jadwalBody.innerHTML = "";
    data.map((jadwal) => {
        const row = document.createElement("tr");
        [jadwal.hari, jadwal.olahraga, jadwal.durasi, `${jadwal.kalori} kcal`].forEach((nilai) => {
            const cell = document.createElement("td");
            cell.textContent = String(nilai);
            row.append(cell);
        });
        jadwalBody.append(row);
        return row;
    });
}

// map — mengubah daftar proyek menjadi elemen daftar.
function tampilkanProyek(data) {
    if (!(daftarProyekEl instanceof HTMLElement) || !(pesanKosongEl instanceof HTMLElement)) return;
    daftarProyekEl.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
        pesanKosongEl.hidden = false;
        return;
    }
    pesanKosongEl.hidden = true;
    data.map((proyek) => {
        const li = document.createElement("li");
        li.className = "kartu-proyek";
        li.dataset.kategori = proyek.kategori ?? "web";
        const judul = document.createElement("h3");
        judul.textContent = proyek.judul;
        const meta = document.createElement("p");
        const status = proyek.selesai ? "Selesai" : "Dalam proses";
        meta.textContent = `${proyek.tahun} — ${status}`;
        li.append(judul, meta);
        daftarProyekEl.append(li);
        return li;
    });
}

// map — mengubah data riwayat menjadi baris tabel.
function formatTanggal(tanggal) {
    const [year, month, day] = tanggal.split("-").map(Number);
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(Date.UTC(year, month - 1, day)));
}

function tampilkanRiwayat(data) {
    riwayatBody.innerHTML = "";
    data.map((latihan) => {
        const row = document.createElement("tr");
        [formatTanggal(latihan.tanggal), latihan.olahraga, `${latihan.durasi} menit`].forEach((nilai) => {
            const cell = document.createElement("td");
            cell.textContent = String(nilai);
            row.append(cell);
        });
        riwayatBody.append(row);
        return row;
    });
}

// Menampilkan hasil filter dan find pada halaman.
proyekUnggulanEl.textContent = `Proyek unggulan: ${proyekUnggulan?.judul ?? "Belum ada"}`;
proyekSelesaiEl.textContent = `Jumlah proyek selesai: ${proyekSelesai.length} dari ${jumlahProyek}`;
jumlahLatihanEl.textContent = `Latihan tercatat: ${jumlahLatihanDicatat}`;

// Tampilkan data awal.
tampilkanJadwal(jadwalMingguan);
tampilkanProyek(proyekTerurut);
tampilkanRiwayat(riwayatOlahraga);

filterEl.addEventListener("click", (event) => {
    const tombol = event.target instanceof Element ? event.target.closest("button") : null;
    if (!tombol) return;

    const kategori = tombol.dataset.kategori;
    const terpilih = daftarProyek.filter(
        (proyek) => kategori === "semua" || proyek.kategori === kategori
    );

    filterEl.querySelectorAll("button").forEach((item) => {
        item.classList.remove("aktif");
    });
    tombol.classList.add("aktif");

    tampilkanProyek(terpilih);
});

// D.4 / E.1 — Bukti data dapat diperiksa dari Console.
console.log(kalimatPerkenalan);
console.log(formatKeahlian(profil.keahlian));
console.log("Tipe nama:", typeof profil.nama);
console.log("Tipe jumlahProyek:", typeof jumlahProyek);
console.table(profil.keahlian);
console.table(daftarProyek);
console.table(proyekSelesai);
console.log("Hasil find:", proyekUnggulan);
console.log("Data asli setelah sort salinan:", daftarProyek);
console.log("Salinan terurut:", proyekTerurut);

// Form tetap interaktif seperti Pertemuan 6, tetapi data masuk ke array JavaScript.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dateInput = form.querySelector("#tanggal");
    const sportInput = form.querySelector("#jenis");
    const durationInput = form.querySelector("#durasi");

    if (
        !(dateInput instanceof HTMLInputElement) ||
        !(sportInput instanceof HTMLInputElement) ||
        !(durationInput instanceof HTMLInputElement)
    ) {
        throw new Error("Kolom formulir latihan tidak ditemukan.");
    }

    const tanggal = dateInput.value;
    const olahraga = sportInput.value.trim();
    const durasi = Number(durationInput.value);

    if (!tanggal || !olahraga || !Number.isFinite(durasi) || durasi < 1) {
        console.error("Data formulir latihan belum valid.");
        return;
    }

    riwayatOlahraga.push({ tanggal, olahraga, durasi });
    jumlahLatihanDicatat += 1;

    tampilkanRiwayat(riwayatOlahraga);
    jumlahLatihanEl.textContent = `Latihan tercatat: ${jumlahLatihanDicatat}`;

    form.reset();
});
