'use client';

import { useState } from 'react';
import Link from 'next/link';
import ToggleTheme from './ToggleTheme';
import SearchBar from './SearchBar';
import Logo from './Logo';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          className="md:hidden text-gray-700 dark:text-white" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Logo />

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300">Home</Link>
          <Link href="/about" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300">About</Link>
          <Link href="/contact" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300">Contact</Link>
          <Link href="/categories" className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300">Categories</Link>
        </nav>

        <div className="hidden md:block flex-grow mx-6">
          <SearchBar />
        </div>

        <ToggleTheme />

        <button 
          className="md:hidden text-gray-700 dark:text-white" 
          onClick={toggleSearch} 
          aria-label="Toggle search"
          aria-expanded={isSearchOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 py-2">
          <Link href="/" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link href="/about" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
          <Link href="/contact" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
          <Link href="/categories" className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Categories</Link>
        </nav>
      )}

      {isSearchOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-2 px-4">
          <SearchBar />
        </div>
      )}
    </header>
  );
}