// app/(tenant)/[subdomain]/page.js
import { getSiteData } from "@/lib/get-site-data";
import { notFound } from "next/navigation";

export default async function TenantPage({ params }) {
    // استخراج النطاق الفرعي من الرابط
    const { subdomain } = params;

    // جلب بيانات الموقع من قاعدة البيانات
    const siteData = await getSiteData(subdomain);

    // إذا لم يتم العثور على الموقع، نظهر صفحة 404
    if (!siteData) {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                    {siteData.siteName}
                </h1>
                <p className="text-gray-600 mb-6">
                    هذا الموقع تم إنشاؤه وتخصيصه تلقائياً عبر منصة Monty Go Site.
                </p>
                <div className="p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
                    رابط النطاق الفرعي الخاص بك هو: <span className="font-bold">{siteData.subdomain}</span>
                </div>
            </div>
        </main>
    );
}
