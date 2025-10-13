//신청서 작성 시 로그인이 되어있지 않으면 로그인 페이지로 보내기
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  onLoginModalOpen: () => void;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, onLoginModalOpen, children }) => {
  useEffect(() => {
    // 만약 로그인 상태가 아니라면,
    if (!isLoggedIn) {
      // 로그인 모달을 열어달라고 요청합니다.
      onLoginModalOpen();
    }
  }, [isLoggedIn, onLoginModalOpen]);

  // 로그인 상태가 아니라면, 페이지 내용을 보여주는 대신 홈으로 돌려보냅니다.
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 로그인 상태라면, 원래 보여주려던 페이지를 보여줍니다.
  return children;
};

export default ProtectedRoute;