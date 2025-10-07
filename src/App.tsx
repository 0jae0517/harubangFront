import React, { useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// --- Components ---
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
//import SelectPropertyModal from './components/SelectPropertyModal';

// --- Common Pages ---
import HomePage from './pages/common/HomePage';
import AboutPage from './pages/common/AboutPage';
import ApplyPage from './pages/common/ApplyPage';
import FAQPage from './pages/common/FAQPage';
import ForgotPasswordPage from './pages/common/ForgotPasswordPage';
import ChatPage from './pages/common/ChatPage';

// --- Customer Pages ---
import MyPage from './pages/customer/MyPage';
import EditMyInfoPage from './pages/customer/EditMyInfoPage';
import ProposalsPage from './pages/customer/ProposalsPage';

// --- Agent Pages ---
import AgentDashboardPage from './pages/agent/AgentDashboardPage';
import RequestDetailPage from './pages/agent/RequestDetailPage';
import EditAgentInfoPage from './pages/agent/EditAgentInfoPage';
import AgentPropertiesPage from './pages/agent/AgentPropertiesPage';
import AddPropertyPage from './pages/agent/AddPropertyPage';
import LoginRequiredPage from "./pages/common/LoginRequiredPage.tsx";
import VerifyEmailPage from "./pages/common/VerifyEmailPage";
// import SubmitProposalPage from './pages/agent/SubmitProposalPage'; // Note: This page might be deprecated


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
          {/* Common Routes */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="apply" element={<ApplyPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="login-required" element={<LoginRequiredPage />} />
            <Route path="verify" element={<VerifyEmailPage />} />


            {/* Customer Routes */}
          <Route path="mypage" element={isLoggedIn && userRole === 'customer' ? <MyPage /> : <Navigate to="/" />} />
          <Route path="mypage/edit" element={isLoggedIn && userRole === 'customer' ? <EditMyInfoPage /> : <Navigate to="/" />} />
          <Route path="proposals/:requestId" element={isLoggedIn && userRole === 'customer' ? <ProposalsPage /> : <Navigate to="/" />} />

          {/* Agent Routes */}
          <Route path="agent/dashboard" element={isLoggedIn && userRole === 'agent' ? <AgentDashboardPage /> : <Navigate to="/" />} />
          <Route path="agent/request/:requestId" element={isLoggedIn && userRole === 'agent' ? <RequestDetailPage /> : <Navigate to="/" />} />
          <Route path="agent/profile/edit" element={isLoggedIn && userRole === 'agent' ? <EditAgentInfoPage /> : <Navigate to="/" />} />
          {/* <Route path="agent/proposal/submit/:requestId" element={isLoggedIn && userRole === 'agent' ? <SubmitProposalPage /> : <Navigate to="/" />} /> */}
          <Route path="agent/properties" element={isLoggedIn && userRole === 'agent' ? <AgentPropertiesPage /> : <Navigate to="/" />} />
          <Route path="agent/properties/add" element={isLoggedIn && userRole === 'agent' ? <AddPropertyPage /> : <Navigate to="/" />} />

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
      {/* Note: SelectPropertyModal is not currently connected in App.tsx, it's opened from RequestDetailPage.tsx */}
    </>
  );
}

export default App;