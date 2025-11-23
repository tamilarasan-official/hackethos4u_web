import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, AtSign } from "lucide-react";
import Logo from "@/components/Logo";
import { useData } from "@/contexts/DataContext";

const Footer = () => {
  const { services } = useData();
  const activeServices = services.filter(s => s.isActive).slice(0, 4);

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo width={48} height={54} priority={false} />
              <h3 className="text-2xl font-bold">
                Hackethos<span className="font-normal">4U</span>
              </h3>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Professional cybersecurity training and VAPT services to secure your digital future.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/people/Hackethos4u/61566999715807/?is_tour_dismissed" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" title="Facebook" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.threads.com/@hackethos4u?xmt=AQGztzjvD4gzEPiw7J1dg2pUTcE4qFp3Re5hLUq5U" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Threads" title="Threads" className="hover:text-primary transition-colors">
                <AtSign size={20} />
              </a>
              <a href="https://www.linkedin.com/in/maniteja7v/" target="_blank" rel="noopener noreferrer" aria-label="Connect with us on LinkedIn" title="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/hackethos4u/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" title="Instagram" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@hackethos4u" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel" title="YouTube" className="hover:text-primary transition-colors">
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
              {activeServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: maniteja.thagaram@hackethos4u.com</li>
              <li>Phone: +91 8008593735</li>
              <li>Address: 9G8C+PRQ, Dilsukhnagar</li>
              <li>Hyderabad, Telangana</li>
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
