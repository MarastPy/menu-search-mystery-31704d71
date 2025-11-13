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
                src="/src/images/logo/Cinefila_logo_white_web.svg" 
                alt="Cinefila Logo" 
                className="transition-all duration-300"
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
        className={`fixed inset-0 w-full h-screen bg-gradient-to-br from-black via-gray-900 to-black z-[999] flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full">
          <Link 
            to="/news" 
            className={`font-serif font-semibold text-3xl md:text-4xl text-white py-3 text-center hover:text-[#C5262A] transition-all duration-300 transform hover:scale-110 ${
              menuOpen ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.1s" }}
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/catalogue" 
            className={`font-serif font-semibold text-3xl md:text-4xl text-white py-3 text-center hover:text-[#C5262A] transition-all duration-300 transform hover:scale-110 ${
              menuOpen ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
            onClick={() => setMenuOpen(false)}
          >
            Line Up
          </Link>
          <Link 
            to="/#whatcanwedo" 
            className={`font-serif font-semibold text-3xl md:text-4xl text-white py-3 text-center hover:text-[#C5262A] transition-all duration-300 transform hover:scale-110 ${
              menuOpen ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.3s" }}
            onClick={() => setMenuOpen(false)}
          >
            What can we do for you
          </Link>
          <Link 
            to="/#about" 
            className={`font-serif font-semibold text-3xl md:text-4xl text-white py-3 text-center hover:text-[#C5262A] transition-all duration-300 transform hover:scale-110 ${
              menuOpen ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "0.4s" }}
            onClick={() => setMenuOpen(false)}
          >
            About us & contacts
          </Link>
        </nav>
      </div>
    </>
  );
};
