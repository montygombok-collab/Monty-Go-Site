// app/(tenant)/[subdomain]/page.js
import { getSiteData } from "../../../lib/get-site-data";
import { notFound } from "next/navigation";

export default async function TenantPage({ params }) {
    const { subdomain } = await params;
    
    // جلب بيانات الموقع بناءً على النطاق الفرعي
    const siteData = await getSiteData(subdomain);

    if (!siteData) {
        return notFound();
    }

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-3xl font-bold">{siteData.siteName || "مرحباً بكم"}</h1>
            <p className="mt-4 text-gray-600">هذا هو الموقع الفرعي لـ: {subdomain}</p>
            
            {/* عرض محتوى القالب أو البيانات المخصصة */}
            <div className="mt-8">
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto" dir="ltr">
                    {JSON.stringify(siteData, null, 2)}
                </pre>
            </div>
        </main>
    );
}
