import React from 'react';
import { Link } from 'react-router-dom';
import harubangLogo from '../assets/logo.png'; 

interface HeaderProps {
    onLoginModalOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginModalOpen }) => (
  <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
    <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-0">
        <img src={harubangLogo} alt="하루방 로고" className="h-14 w-auto" />
        <span className="text-2xl font-bold text-harubang-blue hidden sm:block">하루방</span>
      </Link>
      <div>
        <button 
          onClick={onLoginModalOpen} 
          className="bg-harubang-blue text-white font-bold py-2 px-5 rounded-full hover:bg-harubang-blue-dark transition-colors duration-300 shadow-sm hover:shadow-md"
        >
          로그인
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
