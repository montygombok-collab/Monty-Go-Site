import { NextResponse } from 'next/server';

export function middleware(req) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host') || '';

    // حدد الدومين الأساسي لموقعك (استبدله لاحقاً بدومينك الفعلي على فيرسل إذا أردت)
    // مثلاً: montygosite.vercel.app أو localhost:3000 للتطوير المحلي
    const currentHost = process.env.NODE_ENV === 'production' 
        ? 'montygosd.vercel.app' // ضع هنا رابط مشروعك الفعلي على فيرسل بدون https://
        : 'localhost:3000';

    // استخراج النطاق الفرعي (Subdomain)
    let subdomain = '';
    
    if (hostname.includes('.')) {
        const parts = hostname.split('.');
        // التحقق مما إذا كان هناك نطاق فرعي حقيقي (مثل: mysite.montygosd.vercel.app)
        if (parts.length > 2) {
            subdomain = parts[0];
            // استبعاد www أو النطاقات الرئيسية العامة إذا وجدت
            if (subdomain === 'www') {
                subdomain = '';
            }
        }
    }

    // إذا وُجد نطاق فرعي، قم بتوجيه الطلب داخلياً إلى مسار (tenant)/[subdomain]
    if (subdomain && subdomain !== currentHost.split('.')[0]) {
        return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}${url.search}`, req.url));
    }

    return NextResponse.next();
}

// تحديد المسارات التي يعمل عليها الـ Middleware لتجنب ملفات النظام والـ API
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
