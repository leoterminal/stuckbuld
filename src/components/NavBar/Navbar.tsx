'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const router = window.location.origin;

  return (
    <nav
      className={`${
        isSticky ? 'bg-white bg-opacity-70 shadow-lg' : 'bg-transparent'
      } backdrop-blur-lg transition-all duration-300 sticky top-0 z-50`}
    >
      <div className="max-w-[95vw] sm:max-w-[754px] xl:max-w-[1240px] w-full text-left mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">
            <Image src={'https://res.cloudinary.com/duw4jtxls/image/upload/v1725289241/stuckbuld/kisspng-shadow-creek-high-school-national-secondary-school-5aff084a8b7c04.3429861115266632425713-removebg-preview_rnlbey.png'}
            width={60}
            height={20}
            alt="logo"
            className='w-[40px] h-[44px]'
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/">
            <div className="text-gray-600 hover:text-blue-500">Home</div>
          </Link>
          <Link href="/pages/products">
            <div className="text-gray-600 hover:text-blue-500">Products</div>
          </Link>
          <Link href={`${router}/#about`}>
            <div className="text-gray-600 hover:text-blue-500">About</div>
          </Link>
          
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'max-h-screen' : 'max-h-0'
        } overflow-hidden md:hidden transition-max-height duration-500 ease-in-out`}
      >
        <div className="flex flex-col px-4 py-2 space-y-2 bg-white bg-opacity-70 backdrop-blur-lg shadow-lg">
          <Link href="/">
            <div className="text-gray-600 hover:text-blue-500">Home</div>
          </Link>
          <Link href="/products">
            <div className="text-gray-600 hover:text-blue-500">Products</div>
          </Link>
          <Link href={`${router}/#about`}>
            <div className="text-gray-600 hover:text-blue-500">About</div>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
