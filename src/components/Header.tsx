import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import { SearchOverlay } from "@/components/SearchOverlay";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      
      <header
        className="fixed top-0 left-0 right-0 z-[1000] bg-black text-white border-b border-gray-800 transition-all duration-300"
        style={{ height: scrolled ? "60px" : "90px" }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-8 lg:px-[2cm] grid grid-cols-[auto_1fr_auto] gap-2 sm:gap-4 items-center">
          {/* Logo */}
          <div className="logo-top">
            <Link to="/">
              <img 
                src="/images/logo/Cinefila_logo_black_web.svg"
                alt="Cinefila Logo" 
                className="transition-all duration-300 invert"
                style={{ height: scrolled ? "35px" : "50px" }}
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
        className={`fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-[999] transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c]/50 via-transparent to-[#1c1c1c]/30"></div>
        
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-8 right-8 p-3 text-white hover:text-[#C5262A] transition-all duration-300 hover:rotate-90 z-[1001]"
          aria-label="Close menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav 
          className="relative h-full flex flex-col justify-center items-center gap-6 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Link 
            to="/news" 
            className={`group relative font-serif text-4xl sm:text-5xl lg:text-6xl text-white py-4 text-center transition-all duration-500 ${
              menuOpen ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ 
              animationDelay: "0.1s",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">News</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></div>
          </Link>
          
          <Link 
            to="/catalogue" 
            className={`group relative font-serif text-4xl sm:text-5xl lg:text-6xl text-white py-4 text-center transition-all duration-500 ${
              menuOpen ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ 
              animationDelay: "0.2s",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">Line Up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></div>
          </Link>
          
          <Link 
            to="/#whatcanwedo" 
            className={`group relative font-serif text-4xl sm:text-5xl lg:text-6xl text-white py-4 text-center transition-all duration-500 ${
              menuOpen ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ 
              animationDelay: "0.3s",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">What can we do for you</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></div>
          </Link>
          
          <Link 
            to="/#about" 
            className={`group relative font-serif text-4xl sm:text-5xl lg:text-6xl text-white py-4 text-center transition-all duration-500 ${
              menuOpen ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ 
              animationDelay: "0.4s",
              fontWeight: 300,
              letterSpacing: "0.02em"
            }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">About us & contact</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-lg"></div>
          </Link>
          
          {/* Decorative line */}
          <div 
            className={`w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mt-8 ${
              menuOpen ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          ></div>
        </nav>
      </div>
    </>
  );
};
