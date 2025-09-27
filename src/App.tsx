import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ApplyPage from './pages/ApplyPage';
import FAQPage from './pages/FAQPage';
import LoginModal from './components/LoginModal';
import AgentDashboardPage from './pages/AgentDashboardPage';
import RequestDetailPage from './pages/RequestDetailPage';
import MyPage from './pages/MyPage';
import EditMyInfoPage from './pages/EditMyInfoPage';
import EditAgentInfoPage from './pages/EditAgentInfoPage';
import ProposalsPage from './pages/ProposalsPage';
import ChatPage from './pages/ChatPage';
import SignUpModal from './components/SignUpModal';
// 새로 만든 매물 제안 페이지를 import 합니다.
import SubmitProposalPage from './pages/SubmitProposalPage';

type UserRole = 'customer' | 'agent' | null;

const GeneralLayout: React.FC<{ 
    isLoggedIn: boolean;
    userRole: UserRole;
    onLoginModalOpen: () => void; 
    onLogout: () => void;
}> = ({ isLoggedIn, userRole, onLoginModalOpen, onLogout }) => {
  return (
    <div className="bg-white font-sans text-harubang-ink flex flex-col min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLoginModalOpen={onLoginModalOpen}
        onLogout={onLogout}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ChatLayout: React.FC = () => {
    return (
        <div className="h-screen">
            <Outlet />
        </div>
    );
};

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLoginSuccess = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setIsLoginModalOpen(false);
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setUserRole(null);
  };

  const handleLoginModalOpen = () => setIsLoginModalOpen(true);
  const handleLoginModalClose = () => setIsLoginModalOpen(false);

  const handleSignUpModalOpen = () => setIsSignUpModalOpen(true);
  const handleSignUpModalClose = () => setIsSignUpModalOpen(false);

  return (
    <>
      <Routes>
        <Route 
            path="/" 
            element={<GeneralLayout 
                isLoggedIn={isLoggedIn} 
                userRole={userRole} 
                onLoginModalOpen={handleLoginModalOpen} 
                onLogout={handleLogout}
            />}
        >
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="faq" element={<FAQPage />} />
          
          <Route path="mypage" element={isLoggedIn && userRole === 'customer' ? <MyPage /> : <Navigate to="/" />} />
          <Route path="mypage/edit" element={isLoggedIn && userRole === 'customer' ? <EditMyInfoPage /> : <Navigate to="/" />} />
          <Route path="proposals/:requestId" element={isLoggedIn && userRole === 'customer' ? <ProposalsPage /> : <Navigate to="/" />} />

          <Route path="agent/dashboard" element={isLoggedIn && userRole === 'agent' ? <AgentDashboardPage /> : <Navigate to="/" />} />
          <Route path="agent/request/:requestId" element={isLoggedIn && userRole === 'agent' ? <RequestDetailPage /> : <Navigate to="/" />} />
          <Route path="agent/profile/edit" element={isLoggedIn && userRole === 'agent' ? <EditAgentInfoPage /> : <Navigate to="/" />} />
          {/* 중개사가 매물을 제안하는 페이지 라우트 추가 */}
          <Route path="agent/proposal/submit/:requestId" element={isLoggedIn && userRole === 'agent' ? <SubmitProposalPage /> : <Navigate to="/" />} />
        </Route>
        
        <Route path="/chat/:chatRoomId" element={<ChatLayout />}>
            <Route index element={isLoggedIn ? <ChatPage /> : <Navigate to="/" />} />
        </Route>
      </Routes>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
        onSignUpModalOpen={handleSignUpModalOpen}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={handleSignUpModalClose}
        onLoginModalOpen={handleLoginModalOpen}
      />
    </>
  );
}

export default App;