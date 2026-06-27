import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { cn } from "./lib/utils";

const navItems = [
  { to: "/", label: "Start" },
  { to: "/FAQ", label: "FAQ" },
  { to: "/Datenschutz", label: "Datenschutz" },
  { to: "/Impressum", label: "Impressum" },
];

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!headerRef.current) {
        return;
      }

      if (!headerRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 160);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  const handleScrollToTop = () => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    const restoreScrollBehavior = () => {
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
      window.removeEventListener("scroll", onScrollEnd);
    };

    const onScrollEnd = () => {
      if (window.scrollY <= 0) {
        restoreScrollBehavior();
      }
    };

    html.style.scrollBehavior = "smooth";
    body.style.scrollBehavior = "smooth";
    window.addEventListener("scroll", onScrollEnd, { passive: true });

    window.scrollTo({ top: 0 });

    window.setTimeout(restoreScrollBehavior, 1200);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-b from-slate-100 via-blue-50 to-cyan-50 text-slate-800">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(37,99,235,0.28),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(6,182,212,0.22),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.14),transparent_46%),linear-gradient(180deg,#eff6ff,#f8fafc)]"
        aria-hidden="true"
      />

      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-blue-100/80 bg-linear-to-r from-white/85 via-blue-50/85 to-cyan-50/80 backdrop-blur-md"
      >
        <div className="mx-auto flex min-h-19 w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink
            to="/"
            className="inline-flex items-center"
            aria-label="PhoneDocs Startseite"
            onClick={closeMobileMenu}
          >
            <span>
              <strong className="font-['Oxanium'] block text-4xl font-extrabold leading-[0.88] tracking-tight text-blue-900 sm:text-5xl">
                PhoneDocs
              </strong>
              <small className="mt-0.5 block text-[0.5rem] font-medium uppercase tracking-[0.16em] text-slate-500/85 sm:text-[0.56rem]">
                by{" "}
                <span className="envision normal-case tracking-normal">
                  Computer Extra GmbH
                </span>
              </small>
            </span>
          </NavLink>

          <nav
            className="ml-auto hidden items-center gap-1 md:flex"
            aria-label="Hauptnavigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-700 hover:bg-blue-100/80 hover:text-slate-900",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <NavLink
            to="/Kontakt"
            className="hidden rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 hover:shadow-blue-600/35 md:inline-flex"
            onClick={closeMobileMenu}
          >
            Jetzt anfragen
          </NavLink>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 bg-white/70 text-slate-700 transition hover:border-blue-600 hover:text-blue-600 md:hidden"
            aria-label="Menue oeffnen"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMobileMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>

          <div
            id="mobile-menu"
            className={cn(
              "w-full overflow-hidden transition-all duration-300 md:hidden",
              isMobileMenuOpen
                ? "max-h-96 border-t border-slate-200 pt-3 opacity-100"
                : "max-h-0 border-t-0 pt-0 opacity-0",
            )}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.to}`}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30"
                        : "text-slate-700 hover:bg-blue-100/80 hover:text-slate-900",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/Kontakt"
              onClick={closeMobileMenu}
              className="mt-3 inline-flex w-full justify-center rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600"
            >
              Jetzt anfragen
            </NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-100/80 bg-white/75 p-4 shadow-xl shadow-blue-900/5 backdrop-blur-sm sm:p-6">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-blue-100 bg-linear-to-r from-white/65 via-blue-50/70 to-cyan-50/70">
        <div className="mx-auto flex min-h-[4.2rem] w-full max-w-6xl flex-col items-start justify-between gap-3 px-4 py-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center lg:px-8">
          <p>
            <strong className="text-slate-700">PhoneDocs</strong> repariert
            Smartphones und Tablets präzise, transparent und schnell.
          </p>
          <NavLink
            to="/Kontakt"
            className="font-bold text-blue-600 hover:text-cyan-600 hover:underline"
          >
            Kontakt aufnehmen
          </NavLink>
        </div>
      </footer>

      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Nach oben scrollen"
        className={cn(
          "fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:from-blue-700 hover:to-cyan-600",
          showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14" />
          <path d="M6 11l6-6 6 6" />
        </svg>
      </button>
    </div>
  );
}
