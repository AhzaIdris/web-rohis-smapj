export function getFolders() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("folders");

  if (!data) {
    const defaultFolders = [
      {
        id: 1,
        name: "Aqidah",
        materi: [],
      },
      {
        id: 2,
        name: "Akhlak",
        materi: [],
      },
    ];

    localStorage.setItem("folders", JSON.stringify(defaultFolders));
    return defaultFolders;
  }

  return JSON.parse(data);
}

export function saveFolders(folders) {
  localStorage.setItem("folders", JSON.stringify(folders));
}

export function addMateriToFolder(folderId, materi) {
  const folders = getFolders();

  const updated = folders.map((folder) => {
    if (folder.id === folderId) {
      return {
        ...folder,
        materi: [...folder.materi, materi],
      };
    }
    return folder;
  });

  saveFolders(updated);
}

export function updateMateri(folderId, updatedMateri) {
  const folders = getFolders();

  const updated = folders.map((folder) => {
    if (folder.id === folderId) {
      return {
        ...folder,
        materi: folder.materi.map((item) =>
          item.id === updatedMateri.id ? updatedMateri : item,
        ),
      };
    }
    return folder;
  });

  saveFolders(updated);
}

export function deleteMateri(folderId, materiId) {
  const data = getFolders();

  const folder = data.find(f => f.id === folderId);
  if (!folder) return;

  folder.materi = folder.materi.filter(m => m.id !== materiId);

  localStorage.setItem("folders", JSON.stringify(data));
}