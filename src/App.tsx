import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApplyPage from './pages/ApplyPage';
import MyPage from './pages/MyPage';
import AgentDashboard from './pages/AgentDashboard';
import LoginModal from './components/LoginModal';

// 로그인 상태를 관리하는 인터페이스 추가
interface LayoutProps {
  isLoggedIn: boolean;
  onLoginModalOpen: () => void;
  onLogout: () => void;
}

const GeneralLayout: React.FC<LayoutProps> = ({ isLoggedIn, onLoginModalOpen, onLogout }) => {
  return (
    <div className="bg-white font-sans text-harubang-ink flex flex-col min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLoginModalOpen={onLoginModalOpen}
        onLogout={onLogout}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // 실제 로그인 상태를 관리할 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginModalOpen = () => setIsLoginModalOpen(true);
  const handleLoginModalClose = () => setIsLoginModalOpen(false);

  // 임시 로그인/로그아웃 함수
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false); // 로그인 성공 시 모달 닫기
  };
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<GeneralLayout 
            isLoggedIn={isLoggedIn} 
            onLoginModalOpen={handleLoginModalOpen}
            onLogout={handleLogout}
          />}
        >
          <Route index element={<HomePage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="agent-dashboard" element={<AgentDashboard />} />
        </Route>
      </Routes>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} />

      {/* --- 임시 로그인 상태 전환 버튼 (개발용) --- */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsLoggedIn(prev => !prev)}
          className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded"
        >
          [임시] 로그인 상태 전환
        </button>
      </div>
    </>
  );
}

export default App;