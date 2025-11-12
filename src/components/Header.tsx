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
        className="fixed top-0 left-0 right-0 z-[1000] bg-white text-black border-b border-gray-200 transition-all duration-300"
        style={{ height: scrolled ? "60px" : "90px" }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-[2cm] grid grid-cols-[auto_1fr_auto] gap-4 items-center">
          {/* Logo */}
          <div className="logo-top">
            <Link to="/">
              <img 
                src="/placeholder.svg" 
                alt="Cinefila Logo" 
                className="transition-all duration-300"
                style={{ height: scrolled ? "40px" : "60px" }}
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
              className="p-2 rounded-[10px] border border-gray-200 bg-[#f6f6f7] text-black hover:bg-gray-200 transition-colors"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-[10px] border border-gray-200 bg-[#f6f6f7] text-black hover:bg-gray-200 transition-colors z-[1004]"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Overlay Menu */}
      <div
        className={`fixed inset-0 w-full h-screen bg-black/95 z-[999] flex flex-col justify-start pt-[90px] transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 w-full py-5">
          <Link 
            to="/#news" 
            className="font-serif font-semibold text-2xl text-white py-4 w-full text-center hover:text-[#ffc107] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/catalogue" 
            className="font-serif font-semibold text-2xl text-white py-4 w-full text-center hover:text-[#ffc107] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Film Catalogue
          </Link>
          <Link 
            to="/#whatcanwedo" 
            className="font-serif font-semibold text-2xl text-white py-4 w-full text-center hover:text-[#ffc107] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            What can we do for you
          </Link>
          <Link 
            to="/#about" 
            className="font-serif font-semibold text-2xl text-white py-4 w-full text-center hover:text-[#ffc107] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About us & contacts
          </Link>
        </nav>
      </div>
    </>
  );
};
