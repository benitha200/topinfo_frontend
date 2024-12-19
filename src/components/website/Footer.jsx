import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
    Menu,
    X,
    ChevronDown,
    Sun,
    Moon,
    Bell,
    Search,
    Shield,
    ArrowRight,
    Facebook,
    Youtube,
  } from "lucide-react";

const Footer = () => {

    const socialPlatforms = [
      {
        name: 'X (Twitter)',
        icon: X,
        url: 'https://x.com/RwandaTopi62354',
        strokeWidth: 3,
        external: true
      },
      {
        name: 'Facebook',
        icon: Facebook,
        url: 'https://web.facebook.com/profile.php?id=61570290956165',
        strokeWidth: 2,
        external: true
      },
      {
        name: 'YouTube',
        icon: Youtube,
        url: 'https://www.youtube.com/@TopinfoRwanda',
        strokeWidth: 2,
        external: true
      }
    ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-400">TopInfo</h3>
            <p className="text-gray-400">
              Duhuza abakeneye serivisi n'abazitanga mu buryo bworoshye
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Serivisi</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white">
                  Reba Serivisi
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/become-agent"
                  className="text-gray-300 hover:text-white"
                >
                  Ba Agent
                </Link>
              </li> */}
              <li>
                <Link
                  to="/become-provider"
                  className="text-gray-300 hover:text-white"
                >
                  Abatanga Serivisi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Urubuga</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Twandikire</h4>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Andikira amakuru"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md flex-grow focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="bg-sky-500 text-white px-4 py-2 rounded-r-md hover:bg-sky-600 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="mt-4 flex space-x-4 items-center">
              {/* Dynamically render social media links with consistent styling */}
              {socialPlatforms.map((platform) => {
                const IconComponent = platform.icon;

                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target={platform.external ? "_blank" : undefined}
                    rel={platform.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-sky-600 transition-colors duration-300 group"
                    aria-label={`${platform.name} link`}
                  >
                    <IconComponent
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                      strokeWidth={platform.strokeWidth}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © 2024 TopInfo.rw
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;