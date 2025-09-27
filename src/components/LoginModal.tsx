import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Link를 import 합니다.
import harubangLogo from '../assets/logo.png';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'customer' | 'agent') => void;
  onSignUpModalOpen: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, onSignUpModalOpen }) => {
  const [userType, setUserType] = useState<'customer' | 'agent'>('customer');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(userType);
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUpModalOpen();
  };

  const getTabClassName = (type: 'customer' | 'agent') => {
    const baseClasses = "w-1/2 py-3 text-center text-lg font-bold focus:outline-none transition-colors duration-300";
    if (userType === type) {
      return `${baseClasses} text-harubang-blue border-b-2 border-harubang-blue`;
    }
    return `${baseClasses} text-gray-400 border-b-2 border-gray-200 hover:text-harubang-blue hover:border-harubang-blue/50`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50" />
          
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="text-center mb-8">
                 <img src={harubangLogo} alt="하루방 로고" className="h-12 w-auto mx-auto mb-2" />
            </div>

            <div className="flex mb-6">
              <button onClick={() => setUserType('customer')} className={getTabClassName('customer')}>고객</button>
              <button onClick={() => setUserType('agent')} className={getTabClassName('agent')}>공인중개사</button>
            </div>
            
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div><input type="email" placeholder="이메일" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" /></div>
                <div><input type="password" placeholder="비밀번호" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" /></div>
                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-500"><input type="checkbox" className="rounded border-gray-300 text-harubang-blue focus:ring-harubang-blue" /> 이메일 저장</label>
                    {/* a 태그를 Link 컴포넌트로 변경하고, 클릭 시 모달을 닫도록 수정 */}
                    <Link to="/forgot-password" onClick={onClose} className="font-medium text-harubang-blue hover:underline">비밀번호 찾기</Link>
                </div>
                <div><button type="submit" className="w-full bg-harubang-blue text-white font-bold py-3 rounded-lg hover:bg-harubang-blue-dark transition-colors">로그인</button></div>
            </form>

            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400">SNS 로그인</span></div></div>
            <div className="flex justify-center gap-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEE500]"><svg className="w-6 h-6" viewBox="0 0 32 32"><path d="M16 4.6c-6.2 0-11.2 4.2-11.2 9.4 0 3.4 2.2 6.3 5.3 7.9l-1.9 6.8 7.1-3.7c.6 0 1.1.1 1.7.1 6.2 0 11.2-4.2 11.2-9.4S22.2 4.6 16 4.6z"></path></svg></button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#03C75A]"><svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"></path></svg></button>
            </div>
            <div className="text-center mt-6 text-sm">
                <span className="text-gray-500">회원이 아니신가요? </span>
                <button onClick={handleSignUpClick} className="font-bold text-harubang-blue hover:underline">회원가입</button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;