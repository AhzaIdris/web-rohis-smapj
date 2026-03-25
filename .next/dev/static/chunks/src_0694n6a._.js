(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/data/tablighData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addMateriToFolder",
    ()=>addMateriToFolder,
    "deleteMateri",
    ()=>deleteMateri,
    "getFolders",
    ()=>getFolders,
    "saveFolders",
    ()=>saveFolders,
    "updateMateri",
    ()=>updateMateri
]);
function getFolders() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const data = localStorage.getItem("folders");
    if (!data) {
        const defaultFolders = [
            {
                id: 1,
                name: "Aqidah",
                materi: []
            },
            {
                id: 2,
                name: "Akhlak",
                materi: []
            }
        ];
        localStorage.setItem("folders", JSON.stringify(defaultFolders));
        return defaultFolders;
    }
    return JSON.parse(data);
}
function saveFolders(folders) {
    localStorage.setItem("folders", JSON.stringify(folders));
}
function addMateriToFolder(folderId, materi) {
    const folders = getFolders();
    const updated = folders.map((folder)=>{
        if (folder.id === folderId) {
            return {
                ...folder,
                materi: [
                    ...folder.materi,
                    materi
                ]
            };
        }
        return folder;
    });
    saveFolders(updated);
}
function updateMateri(folderId, updatedMateri) {
    const folders = getFolders();
    const updated = folders.map((folder)=>{
        if (folder.id === folderId) {
            return {
                ...folder,
                materi: folder.materi.map((item)=>item.id === updatedMateri.id ? updatedMateri : item)
            };
        }
        return folder;
    });
    saveFolders(updated);
}
function deleteMateri(folderId, materiId) {
    const data = getFolders();
    const folder = data.find((f)=>f.id === folderId);
    if (!folder) return;
    folder.materi = folder.materi.filter((m)=>m.id !== materiId);
    localStorage.setItem("folders", JSON.stringify(data));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/silabusData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToSilabus",
    ()=>addToSilabus,
    "getKategoriByMateri",
    ()=>getKategoriByMateri,
    "getSilabus",
    ()=>getSilabus,
    "getSilabusRaw",
    ()=>getSilabusRaw,
    "isInSilabus",
    ()=>isInSilabus,
    "removeFromSilabus",
    ()=>removeFromSilabus,
    "removeFromSilabusByMateriId",
    ()=>removeFromSilabusByMateriId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/tablighData.js [app-client] (ecmascript)");
;
function getSilabus() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const data = localStorage.getItem("silabus");
    const silabus = data ? JSON.parse(data) : [];
    const folders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
    return silabus.map((kategori)=>({
            ...kategori,
            items: kategori.items.map((item)=>{
                for (let folder of folders){
                    const found = folder.materi.find((m)=>m.id === item.id);
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
function addToSilabus(materi, kategoriIndex) {
    const current = getSilabus();
    // CEK DUPLIKAT DALAM KATEGORI YANG SAMA
    const sudahAda = current[kategoriIndex].items.some((item)=>item.id === materi.id);
    if (sudahAda) {
        alert("Materi ini sudah ada di kategori tersebut! Silakan pilih kategori lain.");
        return false;
    }
    current[kategoriIndex].items.push({
        id: materi.id,
        refId: Date.now()
    });
    localStorage.setItem("silabus", JSON.stringify(current));
    return true;
}
function removeFromSilabus(refId) {
    const current = getSilabus();
    current.forEach((kategori)=>{
        kategori.items = kategori.items.filter((item)=>item.refId !== refId);
    });
    localStorage.setItem("silabus", JSON.stringify(current));
}
function removeFromSilabusByMateriId(materiId) {
    const current = getSilabusRaw(); //  nanti kita pakai raw data
    current.forEach((kategori)=>{
        kategori.items = kategori.items.filter((item)=>item.id !== materiId);
    });
    localStorage.setItem("silabus", JSON.stringify(current));
}
function getSilabusRaw() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const data = localStorage.getItem("silabus");
    return data ? JSON.parse(data) : [];
}
function isInSilabus(id) {
    const current = getSilabus();
    return current.some((kategori)=>kategori.items.some((item)=>item.id === id));
}
function getKategoriByMateri(id) {
    const current = getSilabus();
    const kategoriList = [];
    current.forEach((kategori)=>{
        const found = kategori.items.some((item)=>item.id === id);
        if (found) {
            kategoriList.push(kategori.kategori);
        }
    });
    return kategoriList;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/silabus/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SilabusPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/silabusData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/tablighData.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function SilabusPage() {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [silabus, setSilabus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showEdit, setShowEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [judul, setJudul] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isi, setIsi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const refreshSilabus = ()=>{
        const updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSilabus"])();
        setSilabus(updated);
    };
    const handleShareImage = async ()=>{
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(imageRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "tabligh.png";
        link.click();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SilabusPage.useEffect": ()=>{
            setSilabus((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSilabus"])());
        }
    }["SilabusPage.useEffect"], []);
    // Fungsi pindah posisi
    const moveItem = (kategoriIndex, itemIndex, direction)=>{
        const newData = [
            ...silabus
        ];
        const items = newData[kategoriIndex].items;
        const newIndex = itemIndex + direction;
        if (newIndex < 0 || newIndex >= items.length) return;
        [items[itemIndex], items[newIndex]] = [
            items[newIndex],
            items[itemIndex]
        ];
        setSilabus(newData);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-100 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/",
                className: "text-sm text-gray-500 mb-5 inline-block ml-3",
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/src/app/silabus/page.js",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold mb-4",
                children: "Silabus Tabligh"
            }, void 0, false, {
                fileName: "[project]/src/app/silabus/page.js",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/tabligh",
                className: "text-sm text-blue-500 mb-3 inline-block",
                children: "→ Buka Bank Materi Tabligh"
            }, void 0, false, {
                fileName: "[project]/src/app/silabus/page.js",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            silabus.map((kategori, kIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold mb-2",
                            children: kategori.kategori
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: kategori.items.map((item, iIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white p-4 rounded-xl mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSelected(item),
                                            className: "cursor-pointer",
                                            children: item.judul
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/silabus/page.js",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSelected(item);
                                                setJudul(item.judul);
                                                setIsi(item.isi);
                                                setShowEdit(true);
                                            },
                                            className: "flex-1 bg-yellow-400 py-2 rounded-lg",
                                            children: "Edit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/silabus/page.js",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFromSilabus"])(item.refId);
                                                setSilabus((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSilabus"])());
                                                // 🔥 WAJIB: tutup semua state
                                                setSelected(null);
                                                setShowEdit(false);
                                            },
                                            className: "mt-2 text-xs text-red-500",
                                            children: "Remove"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/silabus/page.js",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 mt-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>moveItem(kIndex, iIndex, -1),
                                                    className: "px-2 py-1 bg-gray-200 rounded",
                                                    children: "↑"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/silabus/page.js",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>moveItem(kIndex, iIndex, 1),
                                                    className: "px-2 py-1 bg-gray-200 rounded",
                                                    children: "↓"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/silabus/page.js",
                                                    lineNumber: 109,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/silabus/page.js",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/silabus/page.js",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, kIndex, true, {
                    fileName: "[project]/src/app/silabus/page.js",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)),
            selected && !showEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white w-full rounded-t-2xl p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-1 bg-gray-300 mx-auto mb-4 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 126,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-3",
                            children: selected.judul
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-6",
                            children: selected.isi
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleShareImage,
                                    className: "bg-green-500 text-white px-3 py-2 rounded",
                                    children: "Share Image"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/silabus/page.js",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSelected(null);
                                        setShowEdit(false);
                                    },
                                    className: "flex-1 bg-gray-200 py-2 rounded-lg",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/silabus/page.js",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: imageRef,
                                className: "w-[400px] h-[700px] bg-white p-6 flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            "Silabus / ",
                                            selected?.judul
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/silabus/page.js",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold mt-2",
                                        children: selected?.judul
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/silabus/page.js",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm mt-4",
                                        children: selected?.isi
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/silabus/page.js",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs mt-6",
                                        children: "Rohis SMAPJ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/silabus/page.js",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/silabus/page.js",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 152,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/silabus/page.js",
                    lineNumber: 125,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/silabus/page.js",
                lineNumber: 124,
                columnNumber: 9
            }, this),
            showEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-5 rounded-xl w-[90%] max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold mb-3",
                            children: "Edit Materi"
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: judul,
                            onChange: (e)=>setJudul(e.target.value),
                            className: "w-full border p-2 mb-3 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: isi,
                            onChange: (e)=>setIsi(e.target.value),
                            className: "w-full border p-2 mb-3 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const folders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
                                        folders.forEach((folder)=>{
                                            const found = folder.materi.find((m)=>m.id === selected.id);
                                            if (found) {
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMateri"])(folder.id, {
                                                    id: selected.id,
                                                    judul,
                                                    isi
                                                });
                                            }
                                        });
                                        refreshSilabus();
                                        setShowEdit(false);
                                        setSelected(null);
                                    },
                                    className: "flex-1 bg-green-500 text-white py-2 rounded",
                                    children: "Simpan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/silabus/page.js",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowEdit(false),
                                    className: "flex-1 bg-gray-200 py-2 rounded",
                                    children: "Batal"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/silabus/page.js",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/silabus/page.js",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/silabus/page.js",
                    lineNumber: 174,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/silabus/page.js",
                lineNumber: 173,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/silabus/page.js",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(SilabusPage, "APLFSxQqOgezWW3aG3xHxjxBuI4=");
_c = SilabusPage;
var _c;
__turbopack_context__.k.register(_c, "SilabusPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0694n6a._.js.map