// app/(main)/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSitePage() {
    const router = useRouter();
    const [siteName, setSiteName] = useState("");
    const [subdomain, setSubdomain] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/create-site", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    siteName,
                    subdomain,
                    userId: "test-user-123",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "حدث خطأ أثناء إنشاء الموقع");
            }

            alert("تم إنشاء الموقع بنجاح!");
            setSiteName("");
            setSubdomain("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">إنشاء موقعك الجديد</h1>
                <p className="text-gray-500 text-sm text-center mb-6">قم بتسمية موقعك واختيار الرابط الخاص بك</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">اسم الموقع</label>
                        <input
                            type="text"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            required
                            placeholder="متجري الإلكتروني"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">النطاق الفرعي (Subdomain)</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value)}
                                required
                                placeholder="my-store"
                                className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ltr text-left"
                            />
                            <span className="bg-gray-100 text-gray-500 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-sm">
                                .montygosite.com
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? "جاري الإنشاء..." : "إنشاء الموقع الآن"}
                    </button>
                </form>
            </div>
        </main>
    );
}
