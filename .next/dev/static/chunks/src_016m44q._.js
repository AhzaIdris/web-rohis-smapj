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
"[project]/src/app/tabligh/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TablighPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/silabusData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
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
;
;
;
function TablighPage() {
    _s();
    const [currentFolder, setCurrentFolder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showKategori, setShowKategori] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [folders, setFolders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("add");
    const handleOpenFolder = (folder)=>{
        const fresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
        const selectedFolder = fresh.find((f)=>f.id === folder.id);
        setFolders(fresh);
        setCurrentFolder(selectedFolder);
    };
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const imageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleShareImage = async ()=>{
        const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(imageRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "tabligh.png";
        link.click();
    };
    const [showAdd, setShowAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [judul, setJudul] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isi, setIsi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TablighPage.useEffect": ()=>{
            const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
            if (!data || data.length === 0) {
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
                setFolders(defaultFolders);
            } else {
                setFolders(data);
            }
        }
    }["TablighPage.useEffect"], []);
    console.log("FOLDERS:", folders);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-gray-100 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/",
                className: "text-sm text-gray-500 mb-3 inline-block",
                children: "Home"
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-semibold mb-4",
                children: "Materi Tabligh"
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/silabus",
                className: "text-sm text-blue-500 mb-3 inline-block",
                children: "→ Buka Silabus Tabligh"
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            !currentFolder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: folders.map((folder)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleOpenFolder(folder),
                        className: "bg-white p-4 rounded-xl shadow cursor-pointer",
                        children: [
                            "📁 ",
                            folder.name
                        ]
                    }, folder.id, true, {
                        fileName: "[project]/src/app/tabligh/page.js",
                        lineNumber: 86,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 84,
                columnNumber: 9
            }, this),
            currentFolder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setCurrentFolder(null);
                            setSelected(null);
                            setShowAdd(false);
                            setShowKategori(false);
                        },
                        className: "mb-4 text-sm text-blue-500",
                        children: "← Kembali"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tabligh/page.js",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setMode("add"); // 🔥 mode tambah
                            setJudul("");
                            setIsi("");
                            setSelected(null); // 🔥 penting
                            setShowAdd(true);
                        },
                        className: "mb-4 bg-green-500 text-white px-4 py-2 rounded-lg",
                        children: "+ Tambah Tabligh"
                    }, void 0, false, {
                        fileName: "[project]/src/app/tabligh/page.js",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-3",
                        children: currentFolder.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/tabligh/page.js",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: currentFolder?.materi?.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelected(item),
                                className: "bg-white p-4 rounded-xl shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: item.judul
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tabligh/page.js",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-1 text-gray-500",
                                            children: (()=>{
                                                const kategori = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKategoriByMateri"])(item.id);
                                                if (kategori.length === 0) {
                                                    return "Belum Masuk Silabus";
                                                }
                                                return `Masuk Silabus (${kategori.join(", ")})`;
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tabligh/page.js",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 134,
                                    columnNumber: 17
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/src/app/tabligh/page.js",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/tabligh/page.js",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 98,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white w-full rounded-t-2xl p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-1 bg-gray-300 mx-auto mb-4 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-3",
                            children: selected.judul
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm mb-6",
                            children: selected.isi
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 164,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMode("edit"); // 🔥 mode edit
                                        setJudul(selected.judul);
                                        setIsi(selected.isi);
                                        setShowAdd(true);
                                    },
                                    className: "flex-1 bg-yellow-400 py-2 rounded-lg",
                                    children: "Edit"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setShowAdd(false); //  tutup edit
                                        setShowKategori(true);
                                    },
                                    className: "flex-1 bg-blue-500 text-white py-2 rounded-lg",
                                    children: "Add to Silabus"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleShareImage,
                                    className: "flex-1 bg-green-500 text-white py-2 rounded-lg",
                                    children: "Share Image"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setSelected(null);
                                        setShowAdd(false);
                                        setShowKategori(false);
                                    },
                                    className: "flex-1 bg-gray-200 py-2 rounded-lg",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const kategori = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getKategoriByMateri"])(selected.id);
                                        let confirmText = "Yakin ingin menghapus materi ini?\n\n";
                                        if (kategori.length > 0) {
                                            confirmText += "⚠️ Materi ini ada di silabus:\n";
                                            confirmText += kategori.join(", ");
                                            confirmText += "\n\nAkan ikut terhapus dari silabus!";
                                        }
                                        if (!confirm(confirmText)) return;
                                        // 🔥 DELETE DATA
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteMateri"])(currentFolder.id, selected.id);
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeFromSilabusByMateriId"])(selected.id);
                                        // 🔥 paksa refresh state
                                        const updatedFolders = JSON.parse(localStorage.getItem("folders"));
                                        setFolders([
                                            ...updatedFolders
                                        ]);
                                        const updatedCurrent = updatedFolders.find((f)=>f.id === currentFolder.id);
                                        setCurrentFolder({
                                            ...updatedCurrent
                                        });
                                        // 🔥 RESET STATE TOTAL
                                        setSelected(null);
                                        setShowAdd(false);
                                        setShowKategori(false);
                                        setMode("add"); // 🔥 reset mode
                                        setJudul("");
                                        setIsi("");
                                    },
                                    className: "flex-1 bg-red-500 text-white py-2 rounded-lg",
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: imageRef,
                                className: "w-[400px] h-[700px] bg-white p-6 flex flex-col justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            "Kumpulan Materi / ",
                                            currentFolder?.name || "-"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/tabligh/page.js",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold mt-2",
                                        children: selected?.judul
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tabligh/page.js",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm mt-4 leading-relaxed",
                                        children: selected?.isi
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tabligh/page.js",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-400 mt-6",
                                        children: "Rohis SMAPJ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tabligh/page.js",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/tabligh/page.js",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tabligh/page.js",
                    lineNumber: 159,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            showKategori && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-5 rounded-xl w-[90%] max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-3 font-semibold",
                            children: "Pilih Kategori"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        [
                            "Materi Awal Tahun",
                            "Semester 1",
                            "Momentum Islam"
                        ].map((kat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$silabusData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToSilabus"])(selected, index);
                                    if (success) {
                                        setShowKategori(false);
                                        router.push("/silabus");
                                    }
                                },
                                className: "block w-full text-left p-2 mb-2 bg-gray-100 rounded",
                                children: kat
                            }, index, false, {
                                fileName: "[project]/src/app/tabligh/page.js",
                                lineNumber: 279,
                                columnNumber: 17
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowKategori(false),
                            className: "mt-3 text-sm text-gray-500",
                            children: "Batal"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 296,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tabligh/page.js",
                    lineNumber: 274,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 273,
                columnNumber: 9
            }, this),
            showAdd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-5 rounded-xl w-[90%] max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-semibold mb-3",
                            children: "Tambah Materi"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 309,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: judul,
                            onChange: (e)=>setJudul(e.target.value),
                            placeholder: "Judul",
                            className: "w-full border p-2 mb-3 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: isi,
                            onChange: (e)=>setIsi(e.target.value),
                            placeholder: "Isi materi",
                            className: "w-full border p-2 mb-3 rounded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 318,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        // 🔥 VALIDASI
                                        if (!judul.trim() || !isi.trim()) {
                                            alert("Judul dan isi wajib diisi!");
                                            return;
                                        }
                                        // 🔥 CEK DUPLIKAT JUDUL
                                        const allFolders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
                                        const isDuplicate = allFolders.some((folder)=>folder.materi.some((m)=>m.judul.toLowerCase() === judul.toLowerCase() && (mode === "add" || m.id !== selected?.id)));
                                        if (isDuplicate) {
                                            alert("Judul materi sudah ada!");
                                            return;
                                        }
                                        // 🔥 MODE LOGIC
                                        if (mode === "edit") {
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMateri"])(currentFolder.id, {
                                                id: selected.id,
                                                judul,
                                                isi
                                            });
                                        } else {
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMateriToFolder"])(currentFolder.id, {
                                                id: Date.now(),
                                                judul,
                                                isi
                                            });
                                        }
                                        // 🔥 REFRESH
                                        const updatedFolders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$tablighData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFolders"])();
                                        setFolders([
                                            ...updatedFolders
                                        ]);
                                        const updatedCurrent = updatedFolders.find((f)=>f.id === currentFolder.id);
                                        setCurrentFolder({
                                            ...updatedCurrent
                                        });
                                        // 🔥 RESET STATE
                                        setShowAdd(false);
                                        setJudul("");
                                        setIsi("");
                                        setSelected(null);
                                        setMode("add");
                                    },
                                    className: "flex-1 bg-green-500 text-white py-2 rounded",
                                    children: "Simpan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAdd(false),
                                    className: "flex-1 bg-gray-200 py-2 rounded",
                                    children: "Batal"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tabligh/page.js",
                                    lineNumber: 382,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tabligh/page.js",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tabligh/page.js",
                    lineNumber: 308,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tabligh/page.js",
                lineNumber: 307,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/tabligh/page.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(TablighPage, "J4zSNpPC7UyUpRnoPfGYCQETrWk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TablighPage;
var _c;
__turbopack_context__.k.register(_c, "TablighPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_016m44q._.js.map