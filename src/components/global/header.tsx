'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbSettingsCog, TbAlertTriangle, TbDeviceAnalytics } from "react-icons/tb";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  const [showManriskKinerjaDropdown, setShowManriskKinerjaDropdown] = useState<boolean>(false);

  const url = usePathname();
  const logo = process.env.NEXT_PUBLIC_LOGO_URL;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when URL changes
    setIsMobileMenuOpen(false);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, url]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowManriskKinerjaDropdown(false);
        setIsMobileMenuOpen(false);
      }
    };

    // Tambahkan event listener saat komponen di-mount
    document.addEventListener('keydown', handleEscapeKey);

    // Hapus event listener saat komponen di-unmount (cleanup)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`inset-x-1 m-1 ml-2 bg-white border border-gray-100 shadow-lg shadow-slate-400 rounded-xl fixed left-0 top-0 z-50 transition duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex md:justify-start justify-between gap-5 items-center px-4 py-3">
        <Link href="/">
          <Image
            src={logo || "/placeholder-logo.png"}
            alt="logo"
            width={40}
            height={40}
          />
        </Link>
        <ul className="hidden lg:flex space-x-6 items-center">
          <div
            className="relative inline-block"
            onClick={() => setShowManriskKinerjaDropdown((prev) => !prev)}
          >
            <div
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5
                          ${showManriskKinerjaDropdown ? "text-white bg-red-500 border border-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"}
                        `}
            >
              <TbSettingsCog />
              Manrisk Kinerja
            </div>

            {/* Menu Dropdown "Manrisk Kinerja" */}
            {showManriskKinerjaDropdown && (
              <div
                className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-[160px] z-10 flex flex-col overflow-hidden"
              >
                <Link href="/Pemda" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                  Pemda
                </Link>
                <Link href="/Opd" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                  OPD
                </Link>
                <Link href="/Individu" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                  Individu
                </Link>
              </div>
            )}
          </div>

          <Link 
            href='/manrisk-fraut/identifikasi' 
            className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5
                        ${(url === '/manrisk-fraut/identifikasi' || url === '/manrisk-fraut/analisa' || url === '/manrisk-fraut/penanganan' || url === '/manrisk-fraut/pemantauan') 
                          ? "text-white bg-red-500" 
                          : "hover:text-white text-red-700 hover:bg-red-700 border border-red-700"
                        }
                      `}
          >
            <TbAlertTriangle />
            Manrisk Fraut
          </Link>
          <Link 
            href='/manrisk-spbe/identifikasi' 
            className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5
                        ${(url === '/manrisk-spbe/identifikasi' || url === '/manrisk-spbe/analisa' || url === '/manrisk-spbe/penanganan' || url === '/manrisk-spbe/pemantauan') 
                          ? "text-white bg-red-500" 
                          : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"
                        }
                      `}
          >
            <TbDeviceAnalytics />
            Manrisk SPBE
          </Link>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`focus:outline-none cursor-pointer rounded-lg p-1 border border-red-500 text-red-500 hover:text-red-500 hover:bg-white`}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden rounded-lg border border-gray-100 bg-white text-red-500 py-2 mt-1 absolute top-full left-0 w-full shadow-md transition ease-in-out duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <ul className="flex flex-col items-center space-y-2 mx-2">
          <Link
            href='/Pemda'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5
                        ${url === '/Pemda' ? "text-white bg-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"}
                      `}
          >
            <TbSettingsCog />
            Manrisk Pemda
          </Link>
          <Link
            href='/manrisk-fraut/identifikasi'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5
                        ${url === '/manrisk-fraut/identifikasi' ? "text-white bg-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"}
                      `}
          >
            <TbAlertTriangle />
            Manrisk Fraut
          </Link>
          <Link 
            href='/Individu' 
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5
                        ${url === '/Individu' ? "text-white bg-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"}
                      `}
          >
            <TbDeviceAnalytics />
            Manrisk SPBE
          </Link>
        </ul>
      </div>
    </nav>
  );
};