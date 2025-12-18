import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoProgress, setLogoProgress] = useState(0);
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  useEffect(() => {
    // On non-main pages, show logo immediately
    if (!isMainPage) {
      setLogoProgress(1);
      return;
    }

    const handleScroll = () => {
      // Calculate progress: 0 at top, 1 when hero logo is fully scrolled past
      const heroLogoEnd = window.innerHeight * 0.3;
      const transitionStart = heroLogoEnd * 0.6;
      const transitionEnd = heroLogoEnd;

      const progress = Math.min(1, Math.max(0, (window.scrollY - transitionStart) / (transitionEnd - transitionStart)));
      setLogoProgress(progress);
    };

    handleScroll(); // Check initial position
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="fixed top-0 left-0 right-0 z-[1000] bg-black text-white border-b border-gray-800 h-[90px]">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-8 grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-4 items-center">
          {/* Logo - animates in from hero position */}
          <div
            className="logo-top"
            style={{
              opacity: logoProgress,
              transform: `translateY(${(1 - logoProgress) * 30}px) scale(${0.7 + logoProgress * 0.2})`,
              transition: "transform 0.2s ease-out",
              pointerEvents: logoProgress > 0.5 ? "auto" : "none",
            }}
          >
            <Link to="/">
              <img
                src={`${import.meta.env.BASE_URL}images/logo/Cinefila_logo_white_web.svg`}
                alt="Cinefila Logo"
                className="h-[50px]"
              />
            </Link>
          </div>

          {/* Spacer */}
          <div></div>

          {/* Actions */}
          <div className="flex gap-2 items-center">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 border border-gray-700 bg-[#1a1a1a] text-white hover:bg-gray-800 transition-colors"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border border-gray-700 bg-[#1a1a1a] text-white hover:bg-gray-800 transition-colors z-[1004]"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Overlay Menu */}
      <div
        className={`fixed inset-0 w-full h-screen bg-black/60 backdrop-blur-md z-[999] transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {/* Side Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[400px] bg-black/80 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors duration-200 z-[1001] rounded-full hover:bg-white/10"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Content */}
          <nav className="h-full overflow-y-auto pt-24 pb-12 px-8">
            <div className="space-y-1">
              <Link
                to="/"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.05s" }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/news"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.1s" }}
                onClick={() => setMenuOpen(false)}
              >
                News
              </Link>

              <Link
                to="/catalogue"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.15s" }}
                onClick={() => setMenuOpen(false)}
              >
                Line Up
              </Link>

              <Link
                to="/#mission"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
                onClick={() => setMenuOpen(false)}
              >
                Our Mission
              </Link>

              <Link
                to="/#whatcanwedo"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.25s" }}
                onClick={() => setMenuOpen(false)}
              >
                For Independent Filmmakers
              </Link>

              <Link
                to="/#festivals-cinemas"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
                onClick={() => setMenuOpen(false)}
              >
                For Festivals & Cinemas
              </Link>

              <Link
                to="/#film-schools"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.35s" }}
                onClick={() => setMenuOpen(false)}
              >
                For Film Schools & Institutions
              </Link>

              <Link
                to=""
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
                onClick={() => setMenuOpen(false)}
              >
                Workshops
                <span className="ml-2 text-sm text-white/50 font-nunito">– coming soon</span>
              </Link>

              <Link
                to="/wtf-off"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.45s" }}
                onClick={() => setMenuOpen(false)}
              >
                WTF OFF Collection 2026
              </Link>

              <Link
                to="/#about"
                className={`block py-3 text-white/90 hover:text-white hover:pl-2 transition-all duration-200 font-garamond text-2xl border-b border-white/5 ${
                  menuOpen ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.5s" }}
                onClick={() => setMenuOpen(false)}
              >
                About us & Contacts
              </Link>
            </div>

            {/* Footer */}
            <div
              className={`mt-16 pt-6 border-t border-white/10 ${menuOpen ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.55s" }}
            >
              <p className="text-white/30 text-sm font-nunito">© {new Date().getFullYear()} Cinefila s.r.o.</p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
