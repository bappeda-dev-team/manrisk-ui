'use client'

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbSettingsCog, TbAlertTriangle, TbDeviceAnalytics, TbLogout } from "react-icons/tb";
import { useBrandingContext } from "../context/BrandingContext";
import { useApiUrlContext } from "../context/ApiUrlContext";
import { setTahunCookies, getOpdTahun, setNipCookies, setOpdCookies } from "./utils/cookies";
import { useGet } from "@/hook/useGet";
import { usePost } from "@/hook/usePost";
import { UsePostResponse } from "@/app/types";
import { OpdResponse } from "@/app/types";

interface OptionType {
  value: number;
  label: string;
}

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [KinerjaMobileMenu, setKinerjaMobileMenu] = useState<boolean>(false);

  const [showManriskKinerjaDropdown, setShowManriskKinerjaDropdown] = useState<boolean>(false);
  const [Tahun, setTahun] = useState<OptionType | null>(null);

  const [OptionOpd, setOptionOpd] = useState<OpdResponse[]>([]);
  const [SelectedOpd, setSelectedOpd] = useState<OptionType | null>(null);

  const [Nip, setNip] = useState<string>("");
  const [sendData, { data: dataNip, proses, error, message }] = usePost<{ data: string }, any>("/api/external/encrypt", 'baru');

  const url = usePathname();
  const { branding } = useBrandingContext();

  const { url_perencanaan } = useApiUrlContext();

  //handle header scroll animation 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
      setShowManriskKinerjaDropdown(false);
    };
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when URL changes
    setIsMobileMenuOpen(false);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, url]);

  // handle close menu kinerja w/ esc button
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

  // fetch nip encryption
  useEffect(() => {
    const fetchNip = async () => {
      const formData = {
        data: "akun_test_level_3"
      }
      await sendData(formData);
    }
    fetchNip();
  }, [sendData]);

  useEffect(() => {
    if (!proses && dataNip) {
      setNip(dataNip.data);
      setNipCookies(dataNip.data);
      // console.log("NIP setelah update state:", dataNip.data);
    } else if (!proses && error) {
      alert("NIP gagal dienkripsi: " + message);
    }
  }, [dataNip, proses, error, message]);

  const getActiveClass = (isActive: boolean, type = 'default') => {
    const activeClasses = "text-white bg-red-500";
    let defaultClasses = "hover:text-white text-red-500 hover:bg-red-700";

    if (type === 'default') {
      defaultClasses += " border border-red-500";
    } else if (type === 'dropdown') {
      defaultClasses += " border border-red-300";
    }

    return isActive ? activeClasses : defaultClasses;
  };

  const fetchOpd = () => {
    const { Data: HasilData, Loading, Error } = useGet<OpdResponse[]>({ url: `${url_perencanaan}/api/v1/master_opd/opds` });
    if (HasilData) {
      setOptionOpd(HasilData);
    } else {
      setOptionOpd([]);
      console.log("data opd kosong / gagal mendapatkan data opd");
    }
  }

  useEffect(() => {
    const data = getOpdTahun();
    if (data.tahun) {
      const tahun = {
        value: data.tahun.value,
        label: data.tahun.label,
      }
      setTahun(tahun);
    }
    if (data.opd) {
      const opd = {
        value: data.opd.value,
        label: data.opd.label,
      }
      setSelectedOpd(opd);
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowManriskKinerjaDropdown(false);
  };

  const OptionTahun = [
    { label: "Tahun 2024", value: 2024 },
    { label: "Tahun 2025", value: 2025 },
    { label: "Tahun 2026", value: 2026 },
    { label: "Tahun 2027", value: 2027 },
    { label: "Tahun 2028", value: 2028 },
    { label: "Tahun 2029", value: 2029 },
    { label: "Tahun 2030", value: 2030 }
  ];
  const OptionOpdStatic = [
    { label: 'OPD 1', value: 0 }
  ];
  const DynamicSelect = dynamic(() => import('react-select'), {
    ssr: false, // Menonaktifkan Server-Side Rendering untuk komponen ini
  });

  return (
    <nav className={`inset-x-1 m-1 ml-2 bg-white border border-gray-100 shadow-lg shadow-slate-400 rounded-xl fixed left-0 top-0 z-50 transition duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex justify-between gap-5 items-center px-4 py-3">
        <div className="flex justify-start gap-5">
          <Link href="/">
            <Image
              src={branding.logo || "/placeholder-logo.png"}
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
                            ${showManriskKinerjaDropdown ? "text-white bg-red-500 border border-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-700"}
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
                  <Link href="/manrisk-kinerja/pemda/identifikasi" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                    Pemda
                  </Link>
                  <Link href="/manrisk-kinerja/opd/identifikasi" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                    OPD
                  </Link>
                  <Link href="/manrisk-kinerja/individu/identifikasi" className="block px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white transition duration-150 ease-in-out whitespace-nowrap">
                    Individu
                  </Link>
                </div>
              )}
            </div>

            <Link
              href='/manrisk-fraut/rekin'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/manrisk-fraut'), 'default'
              )}`}
            >
              <TbAlertTriangle />
              Manrisk Fraud
            </Link>
            <Link
              href='/manrisk-spbe/identifikasi'
              className={`flex items-center gap-1 font-medium rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
                url.startsWith('/manrisk-spbe'), 'default'
              )}`}
            >
              <TbDeviceAnalytics />
              Manrisk SPBE
            </Link>
          </ul>
        </div>
        {/* OPD */}
        <div className="hidden lg:flex gap-2">
          <DynamicSelect
            value={SelectedOpd}
            options={OptionOpd}
            // onMenuOpen={fetchOpd}
            onChange={(option: any) => {
              setSelectedOpd(option);
              setOpdCookies(option);
            }}
            placeholder="Pilih Perangkat Daerah"
            styles={{
              control: (baseStyles: any) => ({
                ...baseStyles,
                borderRadius: '8px',
              })
            }}
          />
          {/* TAHUN */}
          <DynamicSelect
            value={Tahun}
            options={OptionTahun}
            onChange={(option: any) => {
              setTahun(option)
              setTahunCookies(option);
            }}
            placeholder="Pilih Tahun"
            styles={{
              control: (baseStyles: any) => ({
                ...baseStyles,
                borderRadius: '8px',
              })
            }}
          />
          {/* <Link href={branding.url_login}>
            <button className="border p-1 flex items-center justify-center rounded-full text-red-500 border-red-500 cursor-pointer hover:bg-red-500 hover:text-white">
              <TbLogout />
            </button>
          </Link> */}
        </div>

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
      <div className={`lg:hidden rounded-lg border border-gray-300 bg-white py-2 mt-1 absolute top-full left-0 w-full shadow-md transition ease-in-out duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <ul className="flex flex-col items-center space-y-2 mx-2">
          <div className="flex gap-2">
            <DynamicSelect
              value={SelectedOpd}
              options={OptionOpd}
              placeholder="Pilih Perangkat Daerah"
              styles={{
                control: (baseStyles: any) => ({
                  ...baseStyles,
                  borderRadius: '8px',
                })
              }}
            />
            <DynamicSelect
              value={Tahun}
              options={OptionTahun}
              placeholder="Pilih Tahun"
              styles={{
                control: (baseStyles: any) => ({
                  ...baseStyles,
                  borderRadius: '8px',
                })
              }}
            />
          </div>
          <div
            onClick={() => setKinerjaMobileMenu((prev) => !prev)}
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5
                        ${url === '/Pemda' ? "text-white bg-red-500" : "hover:text-white text-red-500 hover:bg-red-700 border border-red-500"}
                      `}
          >
            <TbSettingsCog />
            Manrisk Kinerja
          </div>
          {/* DROPDOWN MANRISK KINERJA */}
          <div className={`w-full flex flex-col items-center rounded-lg border transition-all duration-200 ease-in-out ${KinerjaMobileMenu ? "opacity-100 space-y-2 p-3" : "opacity-0 max-h-0 pointer-events-none"}`}>
            <Link
              href='/manrisk-kinerja/pemda/identifikasi'
              className={`w-full text-center py-1 px-5 rounded-lg ${getActiveClass(
                url.startsWith('/manrisk-kinerja/pemda'), 'dropdown'
              )}`}
            >
              Pemda
            </Link>
            <Link
              href='/manrisk-kinerja/opd/identifikasi'
              className={`w-full text-center py-1 px-5 rounded-lg ${getActiveClass(
                url.startsWith('/manrisk-kinerja/opd'), 'dropdown'
              )}`}
            >
              OPD
            </Link>
            <Link
              href='/manrisk-kinerja/individu/identifikasi'
              className={`w-full text-center py-1 px-5 rounded-lg ${getActiveClass(
                url.startsWith('/manrisk-kinerja/individu'), 'dropdown'
              )}`}
            >
              Individu
            </Link>
          </div>

          <Link
            href='/manrisk-fraut/identifikasi'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
              url.startsWith('/manrisk-fraut')
            )}`}
          >
            <TbAlertTriangle />
            Manrisk Fraud
          </Link>
          <Link
            href='/manrisk-spbe/identifikasi'
            className={`w-full flex items-center justify-center gap-1 font-bold rounded-lg cursor-pointer py-1 px-5 ${getActiveClass(
              url.startsWith('/manrisk-spbe')
            )}`}
          >
            <TbDeviceAnalytics />
            Manrisk SPBE
          </Link>
        </ul>
      </div>
    </nav>
  );
};