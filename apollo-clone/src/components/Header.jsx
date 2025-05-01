import Image from 'next/image';
import { FaMapMarkerAlt, FaSearch, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Image
            src="/apollo247.svg"
            alt="Apollo Logo"
            width={120}
            height={40}
            priority
          />
          <div className="flex items-center text-sm text-gray-700 font-medium">
            <FaMapMarkerAlt className="mr-1 text-blue-600" />
            <span>Select Address</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="w-full md:max-w-xl flex-1">
          <div className="flex items-center bg-gray-100 border rounded-md px-4 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Right: Login */}
        <div className="flex-shrink-0">
          <button className="flex items-center gap-2 border border-[#006666] text-[#006666] px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#f1fdfd] transition">
            <FaUserCircle />
            Login
          </button>
        </div>
      </div>

      {/* Bottom Nav Links */}
      <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap gap-4 text-sm text-black font-medium border-t border-gray-100">
        <a href="#" className="hover:text-blue-600">Buy Medicines</a>
        <a href="#" className="hover:text-blue-600">Find Doctors</a>
        <a href="#" className="hover:text-blue-600">Lab Tests</a>
        <a href="#" className="hover:text-blue-600">Circle Membership</a>
        <a href="#" className="hover:text-blue-600">Health Records</a>
        <a href="#" className="hover:text-blue-600">Diabetes Reversal</a>
        <a href="#" className="flex items-center gap-1 hover:text-blue-600">
          Buy Insurance
          <span className="text-xs bg-[#e6f5f5] text-[#006666] px-1.5 py-0.5 rounded">
            New
          </span>
        </a>
      </nav>
    </header>
  );
}
