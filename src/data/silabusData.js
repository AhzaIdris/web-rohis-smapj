import { getFolders } from "./tablighData";

export function getSilabus() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("silabus");
  const silabus = data ? JSON.parse(data) : [];

  const folders = getFolders();

  return silabus.map((kategori) => ({
    ...kategori,
    items: kategori.items.map((item) => {
      for (let folder of folders) {
        const found = folder.materi.find(m => m.id === item.id);
        if (found) {
          return {
            ...found,
            refId: item.refId
          };
        }
      }
      return null;
    }).filter(Boolean)
  }));
}

export function addToSilabus(materi, kategoriIndex) {
  const current = getSilabus();

  // CEK DUPLIKAT DALAM KATEGORI YANG SAMA
  const sudahAda = current[kategoriIndex].items.some(
    (item) => item.id === materi.id,
  );

  if (sudahAda) {
    alert(
      "Materi ini sudah ada di kategori tersebut! Silakan pilih kategori lain.",
    );
    return false;
  }

  current[kategoriIndex].items.push({
    id: materi.id,
    refId: Date.now()
  });

  localStorage.setItem("silabus", JSON.stringify(current));

  return true;
}

export function removeFromSilabus(refId) {
  const current = getSilabus();

  current.forEach((kategori) => {
    kategori.items = kategori.items.filter(item => item.refId !== refId);
  });

  localStorage.setItem("silabus", JSON.stringify(current));
}

export function removeFromSilabusByMateriId(materiId) {
  const current = getSilabusRaw(); //  nanti kita pakai raw data

  current.forEach((kategori) => {
    kategori.items = kategori.items.filter(
      item => item.id !== materiId
    );
  });

  localStorage.setItem("silabus", JSON.stringify(current));
}

export function getSilabusRaw() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("silabus");
  return data ? JSON.parse(data) : [];
}

export function isInSilabus(id) {
  const current = getSilabus();

  return current.some((kategori) =>
    kategori.items.some((item) => item.id === id),
  );
}

export function getKategoriByMateri(id) {
  const current = getSilabus();

  const kategoriList = [];

  current.forEach((kategori) => {
    const found = kategori.items.some((item) => item.id === id);
    if (found) {
      kategoriList.push(kategori.kategori);
    }
  });

  return kategoriList;
}
