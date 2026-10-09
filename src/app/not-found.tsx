import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center justify-center py-24">
      <div className="container max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          404 — Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          The page you were looking for may have moved or no longer exists. Head
          back to the home page or browse our services.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Home
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center gap-2 border border-foreground/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            View services
          </Link>
        </div>
      </div>
    </main>
  );
}
