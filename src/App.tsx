import React, { useState } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

// --- Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import ProtectedRoute from "./components/ProtectedRoute";

// --- Pages ---
// ... (다른 페이지 import는 그대로 유지)
import HomePage from "./pages/common/HomePage";
import AboutPage from "./pages/common/AboutPage";
import ApplyPage from "./pages/common/ApplyPage";
import FAQPage from "./pages/common/FAQPage";
import ForgotPasswordPage from "./pages/common/ForgotPasswordPage";
import ChatPage from "./pages/common/ChatPage";
import MyPage from "./pages/customer/MyPage";
import EditMyInfoPage from "./pages/customer/EditMyInfoPage";
import ProposalsPage from "./pages/customer/ProposalsPage";
import AgentDashboardPage from "./pages/agent/AgentDashboardPage";
import RequestDetailPage from "./pages/agent/RequestDetailPage";
import EditAgentInfoPage from "./pages/agent/EditAgentInfoPage";
import AgentPropertiesPage from "./pages/agent/AgentPropertiesPage";
import AddPropertyPage from "./pages/agent/AddPropertyPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUserManagementPage from "./pages/admin/AdminUserManagementPage";

// *** 수정된 부분: 'admin'을 타입에 추가 ***
type UserRole = "customer" | "agent" | "admin" | null;

// GeneralLayout, ChatLayout, AdminProtectedRoute 컴포넌트는 기존과 동일
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

const ChatLayout: React.FC = () => (
  <div className="h-screen">
    <Outlet />
  </div>
);

const AdminProtectedRoute: React.FC<{
  isLoggedIn: boolean;
  userRole: UserRole;
}> = ({ isLoggedIn, userRole }) => {
  const location = useLocation();
  if (!isLoggedIn || userRole !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  // *** 수정된 부분: handleLoginSuccess의 role 타입에 'admin' 추가 ***
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
        {/* 관리자 라우트 */}
        <Route
          element={
            <AdminProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} />
          }
        >
          <Route
            path="/admin/*"
            element={<AdminLayout onLogout={handleLogout} />}
          >
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUserManagementPage />} />
            <Route path="requests" element={<div>신청서 관리 페이지</div>} />
            <Route path="properties" element={<div>매물 관리 페이지</div>} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        {/* 일반 사용자 라우트 */}
        <Route
          path="/*"
          element={
            <GeneralLayout
              isLoggedIn={isLoggedIn}
              userRole={userRole}
              onLoginModalOpen={handleLoginModalOpen}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="apply"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onLoginModalOpen={handleLoginModalOpen}
              >
                <ApplyPage />
              </ProtectedRoute>
            }
          />
          <Route path="faq" element={<FAQPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="mypage"
            element={
              isLoggedIn && userRole === "customer" ? (
                <MyPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="mypage/edit"
            element={
              isLoggedIn && userRole === "customer" ? (
                <EditMyInfoPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="proposals/:requestId"
            element={
              isLoggedIn && userRole === "customer" ? (
                <ProposalsPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="agent/dashboard"
            element={
              isLoggedIn && userRole === "agent" ? (
                <AgentDashboardPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="agent/request/:requestId"
            element={
              isLoggedIn && userRole === "agent" ? (
                <RequestDetailPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="agent/profile/edit"
            element={
              isLoggedIn && userRole === "agent" ? (
                <EditAgentInfoPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="agent/properties"
            element={
              isLoggedIn && userRole === "agent" ? (
                <AgentPropertiesPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="agent/properties/add"
            element={
              isLoggedIn && userRole === "agent" ? (
                <AddPropertyPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>

        <Route path="/chat/:chatRoomId" element={<ChatLayout />}>
          <Route
            index
            element={isLoggedIn ? <ChatPage /> : <Navigate to="/" />}
          />
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
};

export default App;
