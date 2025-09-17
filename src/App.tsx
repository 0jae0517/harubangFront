import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApplyPage from './pages/ApplyPage';
import LoginModal from './components/LoginModal';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage'; // AboutPage를 import 합니다.

const GeneralLayout: React.FC<{ onLoginModalOpen: () => void }> = ({ onLoginModalOpen }) => {
  return (
    <div className="bg-white font-sans text-harubang-ink flex flex-col min-h-screen">
      <Header onLoginModalOpen={onLoginModalOpen} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModalOpen = () => setIsLoginModalOpen(true);
  const handleLoginModalClose = () => setIsLoginModalOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<GeneralLayout onLoginModalOpen={handleLoginModalOpen} />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} /> {/* 서비스 소개 페이지 라우트를 추가합니다. */}
          <Route path="apply" element={<ApplyPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
      </Routes>
      <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose} />
    </>
  );
}

export default App;