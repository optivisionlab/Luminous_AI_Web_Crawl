'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#FFD700] text-black shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link href="/" className="hover:text-gray-700">Befood Restaurants</Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className="hover:text-gray-700 px-3 py-2">Trang chủ</Link>
            <a href="#" className="hover:text-gray-700 px-3 py-2">Khuyến mãi</a>
            <a href="#" className="hover:text-gray-700 px-3 py-2">Đăng nhập</a>
          </div>
        </div>
      </nav>
    </header>
  );
}
