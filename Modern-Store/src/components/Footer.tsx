import { Link } from 'react-router';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Copyright */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              MODERN<span className="text-accent">STORE</span>
            </h3>
            <p className="text-sm opacity-80">
              © {currentYear} MODERNSTORE. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop?category=men" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop?category=women" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 hover:text-accent transition-all">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contact@modernstore.com"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-all block"
                >
                  contact@modernstore.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-all block"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:text-accent transition-all block"
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Social</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-accent transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:text-accent transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
