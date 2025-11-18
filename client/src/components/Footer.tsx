import { Link } from "react-router";
import { Github, Instagram, LinkedinIcon } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t-2 text-primary-foreground mt-auto py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* --- Brand --- */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            MODERN<span className="text-accent text-orange-500">STORE</span>
          </h2>
          <p className="text-sm opacity-80">
            Modern fashion for every style. Discover your look today.
          </p>
        </div>

        {/* --- Navigation --- */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop/women"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/shop/men"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Contact --- */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:contact@modernstore.com"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all block"
              >
                shefket.must@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all block"
              >
                +359 (894) 229-461
              </a>
            </li>
            <li>
              <a
                href="https://github.com/shefket-mustafa"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100 hover:font-bold hover:text-accent transition-all block"
              >
                GitHub Profile
              </a>
            </li>
          </ul>
        </div>

        {/* --- Social --- */}
        <div>
          <h4 className="font-semibold mb-4 text-lg text-center">Social</h4>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/shefket-mustafa"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all"
              aria-label="Facebook"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/shefket_sum/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/shefket-mustafa-81356a360/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 hover:scale-125 hover:text-accent transition-all"
              aria-label="Twitter"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* --- Copyright --- */}
      <div className="border-t border-border mt-8 pt-4 text-center">
        <p className="text-sm opacity-80">
          © {currentYear} MODERNSTORE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
