import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="Hackethos4U Logo"
                className="h-12 w-auto rounded-lg bg-white p-1.5"
              />
              <h3 className="text-2xl font-bold">
                Hackethos<span className="font-normal">4U</span>
              </h3>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Professional cybersecurity training and VAPT services to secure your digital future.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/courses" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/#reviews" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/wpat-testing" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  WPAT Testing
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-security" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  Mobile Security
                </Link>
              </li>
              <li>
                <Link to="/services/api-testing" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  API Testing
                </Link>
              </li>
              <li>
                <Link to="/services/owasp-testing" className="opacity-80 hover:opacity-100 hover:text-primary transition-all">
                  OWASP Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: contact@hackethos4u.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Tech Park, Cyber City</li>
              <li>Bangalore, Karnataka 560001</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
          <p>© 2024 Hackethos4U. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
