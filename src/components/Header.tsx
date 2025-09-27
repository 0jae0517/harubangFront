import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import harubangLogo from '../assets/logo.png'; 

// App.tsx로부터 받을 props 타입을 정의합니다.
interface HeaderProps {
    isLoggedIn: boolean;
    userRole: 'customer' | 'agent' | null;
    onLoginModalOpen: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userRole, onLoginModalOpen, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src={harubangLogo} alt="하루방 로고" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-12">
          <Link to="/about" className="text-harubang-ink-light font-medium hover:text-harubang-blue transition-colors">서비스 소개</Link>
          <Link to="/apply" className="text-harubang-ink-light font-medium hover:text-harubang-blue transition-colors">신청서 작성</Link>
          <Link to="/faq" className="text-harubang-ink-light font-medium hover:text-harubang-blue transition-colors">FAQ</Link>
        </div>
        <div>
          {/* isLoggedIn 값에 따라 다른 UI를 보여줍니다. */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* userRole에 따라 다른 링크를 보여줍니다. */}
              {userRole === 'agent' && (
                <Link to="/agent/dashboard" className="font-semibold text-harubang-blue hover:underline">중개사 페이지</Link>
              )}
              {userRole === 'customer' && (
                <Link to="/mypage" className="font-semibold text-harubang-blue hover:underline">내 정보</Link>
              )}
              <button 
                onClick={() => {
                  onLogout();
                  navigate('/'); // 로그아웃 후 홈으로 이동
                }} 
                className="bg-gray-200 text-gray-700 font-bold py-2 px-5 rounded-full hover:bg-gray-300 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginModalOpen} 
              className="border border-harubang-blue text-harubang-blue font-bold py-2 px-5 rounded-full hover:bg-harubang-blue hover:text-white transition-colors duration-300"
            >
              로그인
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;