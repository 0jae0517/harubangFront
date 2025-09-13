// src/components/LoginModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import harubangLogo from '../assets/logo.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />

          {/* 모달 박스 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 z-10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex items-center justify-center gap-0 mb-6">
                 <img src={harubangLogo} alt="하루방 로고" className="h-10 w-auto" />
                 <span className="text-2xl font-bold text-harubang-blue">하루방</span>
            </div>
            <form className="space-y-4">
                <div><input type="email" placeholder="이메일" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" /></div>
                <div><input type="password" placeholder="비밀번호" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" /></div>
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-500"><input type="checkbox" className="rounded border-gray-300 text-harubang-blue focus:ring-harubang-blue" /> 이메일 저장</label>
                    <a href="#" className="font-medium text-harubang-blue hover:underline">비밀번호 찾기</a>
                </div>
                <div><button type="submit" className="w-full bg-harubang-blue text-white font-bold py-3 rounded-lg hover:bg-harubang-blue-dark transition-colors">로그인</button></div>
            </form>
            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400">SNS 로그인</span></div></div>
            <div className="flex justify-center gap-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEE500]"><svg className="w-6 h-6" viewBox="0 0 32 32"><path d="M16 4.6c-6.2 0-11.2 4.2-11.2 9.4 0 3.4 2.2 6.3 5.3 7.9l-1.9 6.8 7.1-3.7c.6 0 1.1.1 1.7.1 6.2 0 11.2-4.2 11.2-9.4S22.2 4.6 16 4.6z"></path></svg></button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#03C75A]"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"></path></svg></button>
            </div>
            <div className="text-center mt-6 text-sm"><span className="text-gray-500">회원이 아니신가요?</span><a href="#" className="font-bold text-harubang-blue hover:underline ml-1">회원가입</a></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;