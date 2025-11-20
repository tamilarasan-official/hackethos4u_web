import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled
        ? 'bg-black/98 border-b border-primary/30 backdrop-blur-xl shadow-2xl shadow-primary/10'
        : 'bg-black/90 border-b border-primary/20 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="Hackethos4U Logo"
              className="h-10 md:h-12 w-auto rounded-lg bg-white p-1"
            />
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-white">Hackethos</span>
              <span className="text-primary">4U</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium transition-colors relative group ${
                    isActive
                      ? 'text-primary'
                      : 'text-white hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button
                size="sm"
                className="bg-primary text-black hover:bg-primary/90 font-semibold px-6 rounded-full"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary hover:text-primary/80 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-primary bg-white/10'
                        : 'text-white hover:text-primary hover:bg-white/5'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="mx-4 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  size="sm"
                  className="w-full bg-primary text-black hover:bg-primary/90 font-semibold rounded-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
