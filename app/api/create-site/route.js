// app/api/create-site/route.js
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { siteName, subdomain, templateId, userId, customData } = body;

        // التحقق من وجود الحقول الأساسية
        if (!siteName || !subdomain || !userId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // حفظ بيانات الموقع الجديد في مجموعة "sites" في قاعدة البيانات
        const docRef = await addDoc(collection(db, "sites"), {
            siteName,
            subdomain: subdomain.toLowerCase().trim(),
            templateId: templateId || "default",
            userId,
            customData: customData || {},
            createdAt: serverTimestamp()
        });

        return NextResponse.json({ success: true, siteId: docRef.id }, { status: 200 });
    } catch (error) {
        console.error("Error creating site:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
