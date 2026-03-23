"use client";

import { useState } from "react";
import {
  addToSilabus,
  getSilabus,
  isInSilabus,
  getKategoriByMateri
} from "../../data/silabusData";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { useRef } from "react";


<button
  onClick={() => {
    addToSilabus(selected);
    router.push("/silabus");
  }}
  className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
>
  Add to Silabus
</button>

export default function TablighPage() {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showKategori, setShowKategori] = useState(false);
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
  
  const folders = [
    {
      name: "Aqidah",
      materi: [
        { id: 1, judul: "Iman kepada Allah", isi: "Penjelasan tentang keimanan..." },
        { id: 2, judul: "Tauhid", isi: "Tauhid adalah mengesakan Allah..." }
      ]
    },
    {
      name: "Akhlak",
      materi: [
        { id: 3, judul: "Menjaga Lisan", isi: "Barang siapa beriman..." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-4">

    <a href="/" className="text-sm text-gray-500 mb-3 inline-block">
        Home
    </a>

      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">
        Materi Tabligh
      </h1>

    <a href="/silabus" className="text-sm text-blue-500 mb-3 inline-block">
        Lihat Silabus →
    </a>

      {/* ================= FOLDER VIEW ================= */}
      {!currentFolder && (
        <div className="space-y-3">
          {folders.map((folder, index) => (
            <div
              key={index}
              onClick={() => setCurrentFolder(folder)}
              className="bg-white p-4 rounded-xl shadow-sm cursor-pointer"
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
            onClick={() => setCurrentFolder(null)}
            className="mb-4 text-sm text-blue-500"
          >
            ← Kembali
          </button>

          <h2 className="font-semibold mb-3">
            {currentFolder.name}
          </h2>

          <div className="space-y-3">
            {currentFolder.materi.map((item) => (
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

            <h2 className="text-lg font-semibold mb-3">
              {selected.judul}
            </h2>

            <p className="text-sm mb-6">
              {selected.isi}
            </p>

            <div className="flex gap-3">

                <button
                    onClick={() => setShowKategori(true)}
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
                    onClick={() => setSelected(null)}
                    className="flex-1 bg-gray-200 py-2 rounded-lg"
                >
                    Close
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
                <h1 className="text-xl font-bold mt-2">
                {selected?.judul}
                </h1>

                {/* Isi */}
                <p className="text-sm mt-4 leading-relaxed">
                {selected?.isi}
                </p>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-6">
                Rohis SMAPJ
                </p>

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

            {[ 
                "Materi Awal Tahun",
                "Semester 1",
                "Momentum Islam"
            ].map((kat, index) => (
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
            ))}

            <button
                onClick={() => setShowKategori(false)}
                className="mt-3 text-sm text-gray-500"
            >
                Batal
            </button>

            </div>

        </div>
    )}

    </main>
  );
}