import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");

// Membuat satu kartu proyek
function buatKartu(proyek) {
    const li = document.createElement("li");
    li.className = "kartu";
    li.textContent = proyek.judul;
    return li;
}

// Menampilkan daftar proyek
function render(data) {
    wadah.innerHTML = "";

    if (data.length === 0) {
        kosong.hidden = false;
        return;
    }

    kosong.hidden = true;

    const fragmen = document.createDocumentFragment();

    data.forEach((proyek) => {
        fragmen.append(buatKartu(proyek));
    });

    wadah.append(fragmen);
}

// Tampilan awal
render(daftarProyek);

// C.1 Event delegation
barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");

    if (!tombol) return;

    const kategori = tombol.dataset.kategori;

    const terpilih = daftarProyek.filter(
        (proyek) =>
            kategori === "semua" ||
            proyek.kategori === kategori
    );

    // Mengubah tombol aktif
    barisFilter.querySelectorAll("button").forEach((item) => {
        item.classList.remove("aktif");
    });

    tombol.classList.add("aktif");

    render(terpilih);
});