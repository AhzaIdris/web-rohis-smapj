"use client";

import { useState, useEffect } from "react";
import { getSilabus, removeFromSilabus } from "../../data/silabusData";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function SilabusPage() {
  const [selected, setSelected] = useState(null);
  const [silabus, setSilabus] = useState([]);
  const imageRef = useRef(null);

  const handleShareImage = async () => {
    const canvas = await html2canvas(imageRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "tabligh.png";
    link.click();
   };

  useEffect(() => {
    setSilabus(getSilabus());
  }, []);
  
  // Fungsi pindah posisi
  const moveItem = (kategoriIndex, itemIndex, direction) => {
    const newData = [...silabus];
    const items = newData[kategoriIndex].items;

    const newIndex = itemIndex + direction;

    if (newIndex < 0 || newIndex >= items.length) return;

    [items[itemIndex], items[newIndex]] = [items[newIndex], items[itemIndex]];

    setSilabus(newData);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <a href="/" className="text-sm text-gray-500 mb-5 inline-block ml-3">
        Home
      </a>

      <h1 className="text-xl font-semibold mb-4">
        Silabus Tabligh
      </h1>

      <a href="/tabligh" className="text-sm text-blue-500 mb-3 inline-block">
        → Buka Bank Materi Tabligh
      </a>

      

      {silabus.map((kategori, kIndex) => (
        <div key={kIndex} className="mb-6">

          <h2 className="font-semibold mb-2">
            {kategori.kategori}
          </h2>

          <div className="space-y-2">
            {kategori.items.map((item, iIndex) => (
              <div key={item.id} className="bg-white p-4 rounded-xl mb-2">

                <div onClick={() => setSelected(item)} className="cursor-pointer">
                    {item.judul}
                </div>

                <button
                    onClick={() => {
                    removeFromSilabus(item.id);
                    setSilabus(getSilabus()); // refresh UI
                    }}
                    className="mt-2 text-xs text-red-500"
                >
                    Remove
                </button>

                {/* Tombol urutan */}
                <div className="flex gap-2 mt-2 text-xs">
                  <button
                    onClick={() => moveItem(kIndex, iIndex, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem(kIndex, iIndex, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ↓
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      ))}

      {/* POPUP */}
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
                    onClick={handleShareImage}
                    className="bg-green-500 text-white px-3 py-2 rounded"
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
                    className="w-[400px] h-[700px] bg-white p-6 flex flex-col"
                >
                    <p className="text-xs text-gray-500">
                        Silabus / {selected?.judul}
                    </p>

                    <h1 className="text-xl font-bold mt-2">
                        {selected?.judul}
                    </h1>

                    <p className="text-sm mt-4">
                        {selected?.isi}
                    </p>

                    <p className="text-xs mt-6">
                        Rohis SMAPJ
                    </p>
                </div>
            </div>
          </div>

        </div>
      )}

    </main>
  );
}