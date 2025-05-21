import React from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
const Footer: React.FC = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">RealtyChance</span>
            </div>
            <p className="text-sm opacity-80 mb-6">
              Find your dream property with our user-friendly real estate platform.
              Buy, sell or rent properties with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-secondary transition-colors">Browse Properties</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-secondary transition-colors">Advanced Search</Link>
              </li>
              <li>
                <Link to="/post-property" className="hover:text-secondary transition-colors">Post Property</Link>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-secondary transition-colors">Buying Guides</Link>
              </li>
              <li>
                
              </li>
              <li>
                <Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-secondary transition-colors">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 96567-89000</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@realitychance.com" className="hover:text-secondary">info@realtychance.com</a>
              </li>
              <li>
                <address className="not-italic text-sm opacity-80">
                  Thor Signia 7th sector<br />
                  HSR layout,Bengaluru<br />
                  Karnataka, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} RealityChance. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;