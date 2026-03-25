"use client";

import { useState, useEffect } from "react";
import {
  addToSilabus,
  getSilabus,
  isInSilabus,
  getKategoriByMateri,
} from "../../data/silabusData";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { useRef } from "react";
import {
  getFolders,
  addMateriToFolder,
  updateMateri,
} from "../../data/tablighData";
import { deleteMateri } from "../../data/tablighData";
import { removeFromSilabusByMateriId } from "../../data/silabusData";

export default function TablighPage() {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showKategori, setShowKategori] = useState(false);
  const [folders, setFolders] = useState([]);
  const [mode, setMode] = useState("add");
  const handleOpenFolder = (folder) => {
    const fresh = getFolders();
    const selectedFolder = fresh.find((f) => f.id === folder.id);

    setFolders(fresh);
    setCurrentFolder(selectedFolder);
  };
  const router = useRouter();
  const imageRef = useRef(null);

  const handleShareImage = async () => {
    const canvas = await html2canvas(imageRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "tabligh.png";
    link.click();
  };

  const [showAdd, setShowAdd] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  useEffect(() => {
    const data = getFolders();

    if (!data || data.length === 0) {
      const defaultFolders = [
        { id: 1, name: "Aqidah", materi: [] },
        { id: 2, name: "Akhlak", materi: [] },
      ];

      localStorage.setItem("folders", JSON.stringify(defaultFolders));
      setFolders(defaultFolders);
    } else {
      setFolders(data);
    }
  }, []);

  console.log("FOLDERS:", folders);

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <a href="/" className="text-sm text-gray-500 mb-3 inline-block">
        Home
      </a>

      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">Materi Tabligh</h1>

      <a href="/silabus" className="text-sm text-blue-500 mb-3 inline-block">
        → Buka Silabus Tabligh
      </a>

      {/* ================= FOLDER VIEW ================= */}
      {!currentFolder && (
        <div className="space-y-3">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => handleOpenFolder(folder)}
              className="bg-white p-4 rounded-xl shadow cursor-pointer"
            >
              📁 {folder.name}
            </div>
          ))}
        </div>
      )}
      {/* ================= MATERI VIEW ================= */}
      {currentFolder && (
        <div>
          {/* Back Button */}
          <button
            onClick={() => {
              setCurrentFolder(null);
              setSelected(null);
              setShowAdd(false);
              setShowKategori(false);
            }}
            className="mb-4 text-sm text-blue-500"
          >
            ← Kembali
          </button>

          <button
            onClick={() => {
              setMode("add");        // 🔥 mode tambah
              setJudul("");
              setIsi("");
              setSelected(null);     // 🔥 penting
              setShowAdd(true);
            }}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            + Tambah Tabligh
          </button>

          <h2 className="font-semibold mb-3">{currentFolder.name}</h2>

          <div className="space-y-3">
            {currentFolder?.materi?.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <div>
                  <p>{item.judul}</p>

                  {/* KETERANGAN SILABUS */}
                  <p className="text-xs mt-1 text-gray-500">
                    {(() => {
                      const kategori = getKategoriByMateri(item.id);

                      if (kategori.length === 0) {
                        return "Belum Masuk Silabus";
                      }

                      return `Masuk Silabus (${kategori.join(", ")})`;
                    })()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= POPUP ================= */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-5">
            <div className="w-10 h-1 bg-gray-300 mx-auto mb-4 rounded"></div>

            <h2 className="text-lg font-semibold mb-3">{selected.judul}</h2>

            <p className="text-sm mb-6">{selected.isi}</p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMode("edit");       // 🔥 mode edit
                  setJudul(selected.judul);
                  setIsi(selected.isi);
                  setShowAdd(true);
                }}
                className="flex-1 bg-yellow-400 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setShowAdd(false); //  tutup edit
                  setShowKategori(true);
                }}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Add to Silabus
              </button>

              <button
                onClick={handleShareImage}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg"
              >
                Share Image
              </button>

              <button
                onClick={() => {
                  setSelected(null);
                  setShowAdd(false);
                  setShowKategori(false);
                }}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const kategori = getKategoriByMateri(selected.id);

                  let confirmText = "Yakin ingin menghapus materi ini?\n\n";

                  if (kategori.length > 0) {
                    confirmText += "⚠️ Materi ini ada di silabus:\n";
                    confirmText += kategori.join(", ");
                    confirmText += "\n\nAkan ikut terhapus dari silabus!";
                  }

                  if (!confirm(confirmText)) return;

                  // 🔥 DELETE DATA
                  deleteMateri(currentFolder.id, selected.id);
                  removeFromSilabusByMateriId(selected.id);

                  // 🔥 paksa refresh state
                  const updatedFolders = JSON.parse(localStorage.getItem("folders"));
                  setFolders([...updatedFolders]);

                  const updatedCurrent = updatedFolders.find(f => f.id === currentFolder.id);
                  setCurrentFolder({ ...updatedCurrent });

                  // 🔥 RESET STATE TOTAL
                  setSelected(null);
                  setShowAdd(false);
                  setShowKategori(false);
                  setMode("add"); // 🔥 reset mode
                  setJudul("");
                  setIsi("");
                }}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>

            {/* ===== TEMPLATE IMAGE ===== */}
            <div className="hidden">
              <div
                ref={imageRef}
                className="w-[400px] h-[700px] bg-white p-6 flex flex-col justify-between"
              >
                {/* Lokasi */}
                <p className="text-xs text-gray-500">
                  Kumpulan Materi / {currentFolder?.name || "-"}
                </p>

                {/* Judul */}
                <h1 className="text-xl font-bold mt-2">{selected?.judul}</h1>

                {/* Isi */}
                <p className="text-sm mt-4 leading-relaxed">{selected?.isi}</p>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-6">Rohis SMAPJ</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= KATEGORI SELECTION ================= */}
      {showKategori && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[90%] max-w-sm">
            <h2 className="mb-3 font-semibold">Pilih Kategori</h2>

            {["Materi Awal Tahun", "Semester 1", "Momentum Islam"].map(
              (kat, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const success = addToSilabus(selected, index);

                    if (success) {
                      setShowKategori(false);
                      router.push("/silabus");
                    }
                  }}
                  className="block w-full text-left p-2 mb-2 bg-gray-100 rounded"
                >
                  {kat}
                </button>
              ),
            )}

            <button
              onClick={() => setShowKategori(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-[90%] max-w-md">
            <h2 className="font-semibold mb-3">Tambah Materi</h2>

            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul"
              className="w-full border p-2 mb-3 rounded"
            />

            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Isi materi"
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => {
                  // 🔥 VALIDASI
                  if (!judul.trim() || !isi.trim()) {
                    alert("Judul dan isi wajib diisi!");
                    return;
                  }

                  // 🔥 CEK DUPLIKAT JUDUL
                  const allFolders = getFolders();
                  const isDuplicate = allFolders.some(folder =>
                    folder.materi.some(m =>
                      m.judul.toLowerCase() === judul.toLowerCase() &&
                      (mode === "add" || m.id !== selected?.id)
                    )
                  );

                  if (isDuplicate) {
                    alert("Judul materi sudah ada!");
                    return;
                  }

                  // 🔥 MODE LOGIC
                  if (mode === "edit") {
                    updateMateri(currentFolder.id, {
                      id: selected.id,
                      judul,
                      isi
                    });
                  } else {
                    addMateriToFolder(currentFolder.id, {
                      id: Date.now(),
                      judul,
                      isi
                    });
                  }

                  // 🔥 REFRESH
                  const updatedFolders = getFolders();
                  setFolders([...updatedFolders]);

                  const updatedCurrent = updatedFolders.find(f => f.id === currentFolder.id);
                  setCurrentFolder({ ...updatedCurrent });

                  // 🔥 RESET STATE
                  setShowAdd(false);
                  setJudul("");
                  setIsi("");
                  setSelected(null);
                  setMode("add");
                }}
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                Simpan
              </button>

              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
