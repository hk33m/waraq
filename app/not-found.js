import Link from "next/link";

import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(143,180,150,0.18),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(201,166,122,0.18),_transparent_30%)] text-slate-950 dark:text-slate-100">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <div className="absolute inset-x-0 top-12 h-72 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-3xl" />
        <div className="relative grid gap-12 rounded-[2rem] border border-border/70 bg-card/90 p-8 shadow-2xl backdrop-blur-xl dark:border-border dark:bg-card/95 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary dark:text-secondary-foreground">
              خطأ 404
            </span>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
              الصفحة غير موجودة
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              يبدو أن الرابط الذي حاولت الوصول إليه غير صحيح أو أن الصفحة تم
              نقلها. لا تقلق، يمكنك العودة إلى الصفحة الرئيسية أو متابعة التصفح
              بسهولة.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                <Home className="ml-2 h-4 w-4" />
                العودة إلى الرئيسية
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition hover:border-secondary hover:text-secondary dark:text-card-foreground"
              >
                <Search className="ml-2 h-4 w-4" />
                تصفح المتجر
              </Link>
            </div>
            <div className="rounded-3xl border border-border/70 bg-muted/70 p-5 text-sm text-muted-foreground dark:bg-muted/20 dark:text-muted-foreground">
              نصيحة UX: امنح الزائر خيارات واضحة للعودة إلى المحتوى، مع رسالة
              هادئة وتعزيز الثقة بأن الموقع ما زال يعمل.
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-96 w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary/20 via-transparent to-primary/10 p-8 shadow-2xl ring-1 ring-border/60">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(90,125,111,0.16),transparent_25%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="space-y-5">
                  <div className="inline-flex items-center gap-3 rounded-full bg-card/90 px-4 py-2 text-sm font-semibold text-foreground shadow-sm shadow-slate-900/5">
                    <span className="inline-flex h-3 w-3 rounded-full bg-secondary" />
                    هناك حل بسيط
                  </div>
                  <div className="rounded-[1.75rem] bg-white/90 px-6 py-8 text-center shadow-lg shadow-slate-900/5 dark:bg-slate-900/90">
                    <p className="text-6xl font-black text-slate-950 dark:text-white">
                      404
                    </p>
                    <p className="mt-4 text-base text-muted-foreground">
                      لم يتم العثور على الصفحة
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-card/80 p-5 text-sm text-muted-foreground shadow-inner shadow-slate-900/5 dark:bg-slate-900/90">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-foreground">جرب رابطًا آخر</span>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-secondary">
                      سهل
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-foreground">
                      ابحث عن المنتج المفضل
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                      سريع
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-foreground">التنقل بإتقان</span>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                      آمن
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
