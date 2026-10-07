const form = document.querySelector("#form form");
const historyBody = document.querySelector("#riwayat tbody");

if (!(form instanceof HTMLFormElement) || !(historyBody instanceof HTMLTableSectionElement)) {
    throw new Error("Formulir atau tabel riwayat olahraga tidak ditemukan.");
}

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

    const [year, month, day] = dateInput.value.split("-").map(Number);
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month - 1, day)));

    const row = historyBody.insertRow();
    const dateCell = row.insertCell();
    const sportCell = row.insertCell();
    const durationCell = row.insertCell();

    dateCell.textContent = formattedDate;
    sportCell.textContent = sportInput.value.trim();
    durationCell.textContent = `${durationInput.value} menit`;

    form.reset();
});