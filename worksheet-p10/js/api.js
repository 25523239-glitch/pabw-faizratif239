const ALAMAT = "https://jsonplaceholder.typicode.com/posts/1";
console.log("Alamat API:", ALAMAT);
async function ambilNotisia() {
    try {
        const respons = await fetch(ALAMAT);

        if (!respons.ok) {
            throw new Error("Status " + respons.status);
        }

        const data = await respons.json();
        return data;

    } catch (galat) {
        console.error("Gagal memuat:", galat.message);
        throw galat;
    }
}

// Pemanggil juga menangani kegagalan.
ambilNotisia()
    .then((data) => console.log("Data berhasil:", data))
    .catch((galat) => console.error("Pemanggil menangkap:", galat.message));
