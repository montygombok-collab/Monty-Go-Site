import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { subdomain, siteName, description } = body;

    if (!subdomain || !siteName) {
      return NextResponse.json(
        { error: 'يجب توفير اسم النطاق الفرعي واسم الموقع' },
        { status: 400 }
      );
    }

    const cleanSubdomain = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');

    const docRef = doc(db, 'sites', cleanSubdomain);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(
        { error: 'هذا النطاق الفرعي مستخدم مسبقاً، اختر اسمًا آخر.' },
        { status: 400 }
      );
    }

    await setDoc(docRef, {
      subdomain: cleanSubdomain,
      siteName,
      description: description || '',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'تم إنشاء الموقع بنجاح!',
      url: `/${cleanSubdomain}`,
    });
  } catch (error) {
    console.error('Error creating site:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء الموقع' },
      { status: 500 }
    );
  }
}
