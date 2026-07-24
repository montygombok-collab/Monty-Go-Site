// app/api/create-site/route.js
import { db } from "../../../lib/firebase";[cite: 1]
import { collection, addDoc, serverTimestamp } from "firebase/firestore";[cite: 1]
import { NextResponse } from "next/server";[cite: 1]

export async function POST(request) {[cite: 1]
    try {[cite: 1]
        const body = await request.json();[cite: 1]
        const { siteName, subdomain, templateId, userId, customData } = body;[cite: 1]

        // التحقق من وجود الحقول الأساسية
        if (!siteName || !subdomain || !userId) {[cite: 1]
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });[cite: 1]
        }

        // حفظ بيانات الموقع الجديد في مجموعة "sites" في قاعدة البيانات
        const docRef = await addDoc(collection(db, "sites"), {[cite: 1]
            siteName,[cite: 1]
            subdomain: subdomain.toLowerCase().trim(),[cite: 1]
            templateId: templateId || "default",[cite: 1]
            userId,[cite: 1]
            customData: customData || {},[cite: 1]
            createdAt: serverTimestamp()[cite: 1]
        });

        return NextResponse.json({ success: true, siteId: docRef.id }, { status: 200 });[cite: 1]
    } catch (error) {[cite: 1]
        console.error("Error creating site:", error);[cite: 1]
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });[cite: 1]
    }
}
