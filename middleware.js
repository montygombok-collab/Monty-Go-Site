import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * تطبيق الـ Middleware على جميع المسارات باستثناء:
     * - api routes (_next/static, _next/image, etc.)
     * - static files (favicon.ico, images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default async function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // تحديد الدومين الرئيسي المنشورة عليه المنصة (أو localhost في التطوير)
  const currentHost =
    process.env.NODE_ENV === "production"
      ? hostname.replace(`.montygo.site`, "") // استبدل بـ الدومين الخاص بك عند النشر
      : hostname.replace(`.localhost:3000`, "");

  // إذا كان المستخدم في الدومين الرئيسي (بدون Subdomain)
  if (currentHost === hostname || currentHost === "localhost:3000") {
    return NextResponse.next();
  }

  // إذا كان هناك Subdomain (مثلاً: pharmacy) يتم توجيه الطلب داخلياً إلى مجلد [subdomain]
  return NextResponse.rewrite(new URL(`/${currentHost}${url.pathname}`, req.url));
}
