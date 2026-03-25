export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6">Platform Rohis</h1>

      {/* Highlight Mingguan */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Materi Minggu Ini</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Card 1 */}
          <div className="min-w-[250px] bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">Menjaga Lisan</h3>
            <p className="text-sm text-gray-600 mt-2">
              Pentingnya menjaga ucapan dalam kehidupan sehari-hari.
            </p>
          </div>

          {/* Card 2 */}
          <div className="min-w-[250px] bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">Keutamaan Shalat Berjamaah</h3>
            <p className="text-sm text-gray-600 mt-2">
              Pahala dan manfaat shalat berjamaah.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Utama */}
      <section className="grid grid-cols-1 gap-4">
        <a
          href="/silabus"
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <h2 className="font-semibold">Materi Tabligh</h2>
        </a>
      </section>
    </main>
  );
}
