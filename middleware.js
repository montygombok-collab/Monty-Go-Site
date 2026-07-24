// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";
    
    // النطاق الأساسي للتطبيق (يختلف بين بيئة التطوير المحلية والنشر الحقيقي)
    const rootDomain = process.env.NODE_ENV === "development" ? "localhost:3000" : "montygosite.com";

    // التحقق مما إذا كان الطلب قادماً من نطاق فرعي (Subdomain)
    if (hostname.includes(rootDomain) && hostname !== rootDomain) {
        const subdomain = hostname.replace(`.${rootDomain}`, "");
        
        // إعادة توجيه الطلب داخلياً إلى مسار الـ tenant
        return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
