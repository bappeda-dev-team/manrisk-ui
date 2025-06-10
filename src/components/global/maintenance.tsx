// components/MaintenancePage.tsx
import React from 'react';
import { TbTools } from 'react-icons/tb'; // Import ikon Tools dari Tabler Icons

interface MaintenancePageProps {
  title?: string;
  message?: string;
}

const Maintenance: React.FC<MaintenancePageProps> = ({
  title = "Halaman Sedang Dalam Perbaikan",
  message = "Maaf atas ketidaknyamanannya. Kami sedang melakukan pemeliharaan untuk meningkatkan layanan kami. Silakan coba kunjungi kembali dalam beberapa waktu.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 text-center">
      <TbTools className="text-red-500 text-8xl mb-6 animate-pulse" /> {/* Ikon dengan animasi */}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg max-w-2xl leading-relaxed">{message}</p>
      <div className="mt-8 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Badan Perencanaan Penelitian dan Pengembangan. Hak Cipta Dilindungi Undang-Undang.</p>
      </div>
    </div>
  );
};

export default Maintenance;