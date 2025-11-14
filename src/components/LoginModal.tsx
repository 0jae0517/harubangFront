import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import harubangLogo from "../assets/logo.png";
import axios from "axios"; // [추가] axios import

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: "customer" | "agent" | "admin") => void;
  onSignUpModalOpen: () => void;
}

// [추가] 백엔드 API 기본 URL (src/.env 파일에서 읽어옴)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSignUpModalOpen,
}) => {
  const [userType, setUserType] = useState<"customer" | "agent">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // [추가] 에러 메시지 상태
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    // [수정] async 추가
    e.preventDefault();
    setError(""); // 에러 초기화

    try {
      // [추가] 백엔드에 로그인 요청 (/api/auth/login)
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email,
        password: password,
      });

      // [추가] 로그인 성공 시
      const { accessToken, userRole, userName } = response.data;

      // [추가] JWT 토큰을 브라우저 저장소(localStorage)에 저장
      // (프론트엔드에서 API 호출 시마다 이 토큰을 사용함)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", userRole);

      // [수정] App.tsx의 상태 업데이트 (로그인 성공 처리)
      // userRole이 "CUSTOMER" 또는 "AGENT"인지 확인
      if (
        userRole === "CUSTOMER" ||
        userRole === "AGENT" ||
        userRole === "ADMIN"
      ) {
        onLoginSuccess(userRole);
        if (userRole === "ADMIN") {
          navigate("/admin/dashboard");
        }
      } else {
        setError("알 수 없는 사용자 역할입니다.");
      }
    } catch (err: any) {
      // [추가] 로그인 실패 시
      if (axios.isAxiosError(err) && err.response) {
        // 백엔드에서 보낸 에러 메시지 표시
        setError(err.response.data || "로그인에 실패했습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
      console.error("Login error:", err);
    }
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUpModalOpen();
  };

  const getTabClassName = (type: "customer" | "agent") => {
      const baseClasses =
      "w-1/2 py-3 text-center text-lg font-bold focus:outline-none transition-colors duration-300";
    if (userType === type) {
      return `${baseClasses} text-harubang-blue border-b-2 border-harubang-blue`;
    }
    return `${baseClasses} text-gray-400 border-b-2 border-gray-200 hover:text-harubang-blue hover:border-harubang-blue/50`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl z-10 overflow-hidden p-10"
          >
            {/* ... (닫기 버튼, 로고 등은 변경 없음) ... */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
              aria-label="닫기"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="text-center mb-8">
              <img
                src={harubangLogo}
                alt="하루방 로고"
                className="h-12 w-auto mx-auto mb-2"
              />
            </div>

            <div className="flex mb-6">
              <button
                onClick={() => setUserType("customer")}
                className={getTabClassName("customer")}
              >
                고객
              </button>
              <button
                onClick={() => setUserType("agent")}
                className={getTabClassName("agent")}
              >
                공인중개사
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
                />
              </div>

              {/* [추가] 에러 메시지 표시 */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="flex items-center justify-between text-sm">
                {/* ... (이메일 저장, 비밀번호 찾기 등은 변경 없음) ... */}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-harubang-blue text-white font-bold py-3 rounded-lg hover:bg-harubang-blue-dark transition-colors"
                >
                  로그인
                </button>
              </div>
            </form>

            <div className="text-center mt-6 text-sm">
              <span className="text-gray-500">회원이 아니신가요? </span>
              <button
                onClick={handleSignUpClick}
                className="font-bold text-harubang-blue hover:underline"
              >
                회원가입
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
