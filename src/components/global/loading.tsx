// LoadingSpinner.jsx
import React from 'react';
import { ClockLoader } from 'react-spinners';

export const LoadingClock = (loading: any) => {
  return (
    <div className="px-5 py-3 flex flex-col items-center justify-center z-50">
      <ClockLoader color="#1f2937" loading={loading} size={50} />
      <h1 className='text-gray-800 mt-5 text-2xl uppercase'>Loading</h1>
    </div>
  );
};