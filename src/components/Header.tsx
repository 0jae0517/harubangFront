import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import harubangLogo from '../assets/logo.png';

interface HeaderProps {
    onLoginModalOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginModalOpen }) => {
  // 실제 로그인 상태를 관리할 로직이 필요합니다.
  // 지금은 UI 확인을 위해 임시로 상태를 만듭니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 임시 로그인/로그아웃 토글 함수
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={harubangLogo} alt="하루방 로고" className="h-10 w-auto" />
        
          </Link>

          <div className="hidden md:flex items-center gap-8 text-base font-semibold">
            <NavLink to="/about" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-harubang-blue border-harubang-blue' : 'text-harubang-ink-light border-transparent hover:text-harubang-blue'}`}>
              서비스 소개
            </NavLink>
            <NavLink to="/apply" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-harubang-blue border-harubang-blue' : 'text-harubang-ink-light border-transparent hover:text-harubang-blue'}`}>
              신청서 작성
            </NavLink>
            <NavLink to="/faq" className={({ isActive }) => `pb-1 border-b-2 ${isActive ? 'text-harubang-blue border-harubang-blue' : 'text-harubang-ink-light border-transparent hover:text-harubang-blue'}`}>
              FAQ
            </NavLink>
          </div>

          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/mypage" className="font-semibold text-harubang-ink hover:text-harubang-blue">내 정보</Link>
                <button onClick={toggleLogin} className="font-semibold text-harubang-ink-light hover:text-harubang-blue">로그아웃</button>
              </div>
            ) : (
              <button
                onClick={onLoginModalOpen}
                className="bg-transparent text-harubang-blue font-bold py-2 px-5 rounded-md border-2 border-harubang-blue hover:bg-harubang-blue hover:text-white transition-colors duration-300"
              >
                로그인
              </button>
            )}
          </div>
        </nav>
      </header>
       {/* 임시 로그인 상태 전환 버튼 */}
       <button onClick={toggleLogin} className="fixed bottom-4 right-4 bg-red-500 text-white text-xs p-2 rounded-full z-50">
        [임시] 로그인 상태 전환
      </button>
    </>
  );
};

export default Header;