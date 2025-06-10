'use client'

import React, { useState } from 'react';
import Select from 'react-select';

interface Input {
    id: string;
    className?: string;
    label: string;
}
interface Textarea {
    id: string;
    label: string;
    rows?: number;
}
interface SelectType {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    defaultValue?: { value: string; label: string } | null;
    onChange?: (option: any) => void;
}

export const FloatingLabelInput:React.FC<Input> = ({ id, label, className }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Determine if the label should "float"
  const shouldFloat = isFocused || inputValue;

  return (
    <div className="relative my-2">
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          peer
          w-full
          px-3
          py-3
          border
          border-gray-500
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-all
          duration-300
          ease-in-out
          text-gray-800
          bg-white
          placeholder-transparent /* Hide default placeholder */
          ${className}
        `}
        placeholder={label} // Use placeholder for accessibility and fallback
      />
      <label
        htmlFor={id}
        className={`
          absolute
          left-4
          top-3.5
          text-gray-500
          transition-all
          duration-300
          ease-in-out
          pointer-events-none
          ${shouldFloat
            ? 'top-[-0.75rem] text-xs text-blue-600 bg-white px-1'
            : 'text-base'
          }
          peer-focus:top-[-0.75rem]
          peer-focus:text-xs
          peer-focus:text-blue-600
          peer-focus:bg-white
          peer-focus:px-1
        `}
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingLabelTextarea:React.FC<Textarea> = ({ id, label, rows = 3 }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Determine if the label should "float"
  const shouldFloat = isFocused || inputValue;

  return (
    <div className="relative my-2">
      <textarea
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={rows} // Menentukan tinggi awal textarea
        className="
          peer
          w-full
          px-3
          py-3
          border
          border-gray-500
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-all
          duration-300
          ease-in-out
          text-gray-800
          bg-white
          resize-y /* Izinkan pengguna mengubah ukuran secara vertikal */
          placeholder-transparent /* Hide default placeholder */
        "
        placeholder={label} // Use placeholder for accessibility and fallback
      ></textarea>
      <label
        htmlFor={id}
        className={`
          absolute
          left-4
          top-3.5
          text-gray-500
          transition-all
          duration-300
          ease-in-out
          pointer-events-none
          ${shouldFloat
            ? 'top-[-0.75rem] text-xs text-blue-600 bg-white px-1'
            : 'text-base'
          }
          peer-focus:top-[-0.75rem]
          peer-focus:text-xs
          peer-focus:text-blue-600
          peer-focus:bg-white
          peer-focus:px-1
        `}
      >
        {label}
      </label>
    </div>
  );
};

export const FloatingLabelSelect:React.FC<SelectType> = ({ id, label, options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectChange = (option: any) => {
    setSelectedValue(option);
    if (onChange) {
      onChange(option);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Determine if the label should "float"
  // It floats if it's focused OR if there's a selected value
  const shouldFloat = isFocused || selectedValue;

  // Custom styles for react-select components
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '48px', // Sesuaikan tinggi agar sesuai dengan input/textarea
      borderRadius: '0.5rem', // rounded-lg
      borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB', // focus:ring-2, border-gray-300
      boxShadow: state.isFocused ? '0 0 0 2px #BFDBFE' : 'none', // focus:ring-2 (warna biru muda)
      '&:hover': {
        borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB', // Biarkan border tetap saat hover jika tidak fokus
      },
      padding: '0 0.5rem', // Padding horizontal
      transition: 'all 300ms ease-in-out', // Animasi transisi
      backgroundColor: 'white',
      cursor: 'pointer',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 8px', // Sesuaikan padding di dalam value container
      // If label is floating, push value down a bit
      paddingTop: shouldFloat ? '1.25rem' : '0.75rem', // Sesuaikan padding saat label floating
      transition: 'all 300ms ease-in-out',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      position: 'absolute', // Penting untuk memposisikan placeholder sebagai "label"
      left: '8px',
      top: shouldFloat ? '0.25rem' : '0.75rem', // Posisikan placeholder saat floating atau tidak
      fontSize: shouldFloat ? '0.75rem' : '1rem', // Font size saat floating atau tidak
      color: shouldFloat ? '#2563EB' : '#6B7280', // Warna saat floating atau tidak
      backgroundColor: shouldFloat ? 'white' : 'transparent', // Latar belakang saat floating
      padding: shouldFloat ? '0 4px' : '0', // Padding saat floating
      transition: 'all 300ms ease-in-out',
      pointerEvents: 'none', // Pastikan tidak mengganggu klik
      zIndex: shouldFloat ? 2 : 1, // Agar label berada di atas
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1F2937', // text-gray-800
      marginTop: shouldFloat ? '0.5rem' : '0', // Adjust value position when label floats
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none', // Sembunyikan garis pemisah indikator
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#6B7280', // text-gray-500
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.5rem',
      zIndex: 9999, // Pastikan menu muncul di atas elemen lain
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#BFDBFE' : state.isFocused ? '#E5E7EB' : 'white',
      color: '#1F2937',
      '&:active': {
        backgroundColor: '#DBEAFE',
      },
    }),
  };

  return (
    <div className="relative mb-6">
      {/* Label "artifisial" yang akan bertindak sebagai floating label */}
      <label
        htmlFor={id}
        className={`
          absolute
          left-4
          top-3.5
          text-gray-500
          transition-all
          duration-300
          ease-in-out
          pointer-events-none
          z-10 /* Pastikan label ini di atas react-select placeholder saat tidak floating */
          ${shouldFloat
            ? 'top-[-0.75rem] text-xs text-blue-600 bg-white px-1'
            : 'text-base'
          }
          /* This label will mostly be hidden by the react-select placeholder when not floating */
          /* and become the main floating label when it is */
        `}
      >
        {label}
      </label>

      <Select
        id={id}
        options={options}
        value={selectedValue}
        onChange={handleSelectChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={customStyles}
        isClearable
        isSearchable={true} // Opsional: apakah bisa dicari
        classNamePrefix="react-select" // Berguna untuk menargetkan class dari luar jika diperlukan
        placeholder={label} // Gunakan label sebagai placeholder awal
      />
    </div>
  );
};