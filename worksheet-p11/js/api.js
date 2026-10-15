
const ALAMAT = "https://jsonplaceholder.typicode.com/posts";

console.log("ALAMAT API:", ALAMAT);

export async function ambilNotisia() {
    try {
        // Mengambil respons dari API
        const respons = await fetch(ALAMAT);
        console.log("Respons:", respons);

        // Memeriksa status HTTP
        if (!respons.ok) {
            throw new Error("Status " + respons.status);
        }

        // Mengubah respons JSON menjadi data JavaScript
        const data = await respons.json();

        return data;

    } catch (galat) {
        console.error("Gagal mengambil data:", galat.message);
        throw galat;
    }
}
