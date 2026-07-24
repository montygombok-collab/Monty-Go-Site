'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [subdomain, setSubdomain] = useState('');
  const [siteName, setSiteName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleCreateSite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/create-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain, siteName, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل إنشاء الموقع');
      }

      router.push(`/${subdomain}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* خلفية الشبكة التقنية وتدرجات الألوان */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent mb-2">
            Monty Go SDN
          </h1>
          <p className="text-slate-400 text-sm">
            منصة تطوير وصنع المواقع الإلكترونية والخدمات البرمجية المتقدمة
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleCreateSite} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              اسم الموقع (العنوان)
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="مثال: متجر التقنية"
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              رابط النطاق الفرعي (Subdomain)
            </label>
            <div className="flex items-center">
              <input
                type="text"
                required
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                placeholder="techstore"
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 border-r-0 rounded-r-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition text-left"
                dir="ltr"
              />
              <span className="bg-slate-800/80 border border-l-0 border-slate-800 px-4 py-3 text-slate-400 text-sm rounded-l-xl font-mono" dir="ltr">
                .vercel.app
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              وصف مختصر للموقع
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="نبذة عن نشاط ومحتوى الموقع..."
              rows="3"
              className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold py-3.5 rounded-xl hover:opacity-90 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'جاري التأسيس...' : 'إنشاء الموقع الآن'}
          </button>
        </form>
      </div>
    </main>
  );
}
