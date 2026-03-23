export function getSilabus() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("silabus");

  const defaultData = [
    { kategori: "Materi Awal Tahun", items: [] },
    { kategori: "Semester 1", items: [] },
    { kategori: "Momentum Islam", items: [] }
  ];

  if (!data) {
    localStorage.setItem("silabus", JSON.stringify(defaultData));
    return defaultData;
  }

  const parsed = JSON.parse(data);

  if (!parsed[1]) {
    localStorage.setItem("silabus", JSON.stringify(defaultData));
    return defaultData;
  }

  return parsed;
}

export function addToSilabus(materi, kategoriIndex) {
  const current = getSilabus();

  // CEK DUPLIKAT DALAM KATEGORI YANG SAMA
  const sudahAda = current[kategoriIndex].items.some(
    item => item.id === materi.id
  );

  if (sudahAda) {
    alert("Materi ini sudah ada di kategori tersebut! Silakan pilih kategori lain.");
    return false;
  }

  current[kategoriIndex].items.push(materi);

  localStorage.setItem("silabus", JSON.stringify(current));

  return true;
}

export function removeFromSilabus(id) {
  const current = getSilabus();

  current.forEach((kategori) => {
    kategori.items = kategori.items.filter(item => item.id !== id);
  });

  localStorage.setItem("silabus", JSON.stringify(current));
}

export function isInSilabus(id) {
  const current = getSilabus();

  return current.some(kategori =>
    kategori.items.some(item => item.id === id)
  );
}

export function getKategoriByMateri(id) {
  const current = getSilabus();

  const kategoriList = [];

  current.forEach((kategori) => {
    const found = kategori.items.some(item => item.id === id);
    if (found) {
      kategoriList.push(kategori.kategori);
    }
  });

  return kategoriList;
}