import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const NavLinks = () => (
        <>
            <Link
                to="/services"
                className="block py-2 md:py-0 text-gray-700 hover:text-sky-600 transition-colors"
                onClick={toggleMobileMenu}
            >
                Abasaba Serivisi
            </Link>
            <Link
                to="/become-provider"
                className="block py-2 md:py-0 text-gray-700 hover:text-sky-600 transition-colors"
                onClick={toggleMobileMenu}
            >
                Abatanga Serivisi
            </Link>
            {/* <Link
                to="/become-agent"
                className="block py-2 md:py-0 text-gray-700 hover:text-sky-600 transition-colors"
                onClick={toggleMobileMenu}
            >
                Aba Agent
            </Link> */}
        </>
    );

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-sky-600">
                    TopInfo
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex space-x-6">
                        <NavLinks />
                    </div>
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
                    >
                        Injira
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors mr-2"
                    >
                        Injira
                    </Link>
                    <button 
                        onClick={toggleMobileMenu} 
                        className="text-gray-700 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <NavLinks />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;