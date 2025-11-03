import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // TODO: Implement search functionality
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="text-2xl font-serif text-foreground hover:text-primary transition-colors">
            Cinefila
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#news" className="text-foreground hover:text-primary transition-colors">News</a>
            <a href="#catalogue" className="text-foreground hover:text-primary transition-colors">Film Catalogue</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About us</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
              className="text-foreground hover:text-primary hover:bg-muted"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground hover:text-primary hover:bg-muted"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background">
                <nav className="flex flex-col gap-6 mt-8">
                  <a href="#news" className="text-xl text-foreground hover:text-primary transition-colors">
                    News
                  </a>
                  <a href="#catalogue" className="text-xl text-foreground hover:text-primary transition-colors">
                    Film Catalogue
                  </a>
                  <a href="#services" className="text-xl text-foreground hover:text-primary transition-colors">
                    Services
                  </a>
                  <a href="#about" className="text-xl text-foreground hover:text-primary transition-colors">
                    About us
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="py-4 border-t border-border animate-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="search"
                placeholder="Search films by title, director, keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-muted border-border"
                autoFocus
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Search
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};
