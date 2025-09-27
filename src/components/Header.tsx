import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import harubangLogo from '../assets/logo.png'; 
import { LogOut, User, Building } from 'lucide-react';

interface HeaderProps {
    isLoggedIn: boolean;
    userRole: 'customer' | 'agent' | null;
    onLoginModalOpen: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userRole, onLoginModalOpen, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/'); // 로그아웃 후 홈으로 이동
    };
    
    // NavLink 스타일을 위한 함수
    const getNavStyle = ({ isActive }: { isActive: boolean }) => 
        `pb-1 border-b-2 transition-colors duration-300 ${isActive ? 'border-harubang-blue text-harubang-blue' : 'border-transparent text-gray-600 hover:text-harubang-blue'}`;

    return (
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200">
        <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={harubangLogo} alt="하루방 로고" className="h-10 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-semibold">
              <NavLink to="/about" className={getNavStyle}>서비스 소개</NavLink>
              <NavLink to="/apply" className={getNavStyle}>신청서 작성</NavLink>
              <NavLink to="/faq" className={getNavStyle}>FAQ</NavLink>
          </div>

          <div>
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    {userRole === 'customer' && (
                         <Link to="/mypage" className="font-semibold text-gray-700 hover:text-harubang-blue flex items-center gap-2">
                            <User size={18}/> 내 정보
                        </Link>
                    )}
                    {userRole === 'agent' && (
                        <>
                           <Link to="/agent/dashboard" className="font-semibold text-gray-700 hover:text-harubang-blue flex items-center gap-2">
                                <User size={18}/> 대시보드
                           </Link>
                           {/* 중개사 매물 관리 페이지 링크 추가 */}
                           <Link to="/agent/properties" className="font-semibold text-gray-700 hover:text-harubang-blue flex items-center gap-2">
                                <Building size={18}/> 매물 관리
                           </Link>
                        </>
                    )}
                    <button onClick={handleLogout} className="text-gray-500 hover:text-harubang-blue flex items-center gap-2">
                        <LogOut size={18}/> 로그아웃
                    </button>
                </div>
            ) : (
                <button 
                  onClick={onLoginModalOpen} 
                  className="font-bold border-2 border-harubang-blue text-harubang-blue py-2 px-5 rounded-full hover:bg-harubang-blue hover:text-white transition-colors duration-300"
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