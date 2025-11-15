import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import harubangLogo from "../assets/logo.png";
import apiClient from "../api/apiClient";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: "customer" | "agent" | "admin") => void;
  onSignUpModalOpen: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSignUpModalOpen,
}) => {
  const [userType, setUserType] = useState<"customer" | "agent">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("🔵 로그인 시도:", { email, userType });

    try {
      console.log("🔵 API 호출 중...");
      
      const response = await apiClient.post("/auth/login", {
        email: email,
        password: password,
      });

      console.log("✅ 로그인 성공! 응답:", response);
      console.log("✅ 응답 데이터:", response.data);

      const { accessToken, userRole, userName } = response.data;

      console.log("✅ 파싱된 데이터:", { accessToken, userRole, userName });

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userRole", userRole);

      if (
        userRole === "CUSTOMER" ||
        userRole === "AGENT" ||
        userRole === "ADMIN"
      ) {
        const normalizedRole = userRole.toLowerCase() as "customer" | "agent" | "admin";
        console.log("✅ 정규화된 역할:", normalizedRole);
        
        onLoginSuccess(normalizedRole);
        
        if (userRole === "ADMIN") {
          navigate("/admin/dashboard");
        }
      } else {
        setError("알 수 없는 사용자 역할입니다.");
      }
    } catch (err: any) {
      console.error("❌ 로그인 에러 발생:", err);
      console.error("❌ 에러 메시지:", err.message);
      
      // 에러 메시지 표시
      if (err.message) {
        setError(err.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status) {
        setError(`로그인 실패 (에러 코드: ${err.response.status})`);
      } else {
        setError("로그인 중 오류가 발생했습니다.");
      }
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

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-harubang-blue focus:ring-harubang-blue"
                  />
                  <span className="text-gray-600">이메일 저장</span>
                </label>
                <a
                  href="/forgot-password"
                  className="text-harubang-blue hover:underline"
                >
                  비밀번호 찾기
                </a>
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