import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // أو المسار النسبي الصحيح حسب مكان ملف firebase
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { subdomain, siteName, description } = body;

    if (!subdomain || !siteName) {
      return NextResponse.json(
        { error: 'يجب توفير اسم النطاق الفرعي (subdomain) واسم الموقع' },
        { status: 400 }
      );
    }

    // تنظيف اسم النطاق الفرعي (حروف صغيرة وبدون مسافات)
    const cleanSubdomain = subdomain.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');

    // التحقق مما إذا كان الـ subdomain مستخدماً من قبل
    const docRef = doc(db, 'sites', cleanSubdomain);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(
        { error: 'هذا النطاق الفرعي مستخدم مسبقاً، اختر اسمًا آخر.' },
        { status: 400 }
      );
    }

    // حفظ بيانات الموقع في Firestore
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
