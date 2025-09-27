import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import harubangLogo from '../assets/logo.png';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginModalOpen: () => void; // 회원가입 후 로그인 창을 열기 위한 함수
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onLoginModalOpen }) => {
  const [userType, setUserType] = useState<'customer' | 'agent'>('customer');

  const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault();
      // 여기에 실제 회원가입 로직이 들어갑니다.
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      onClose(); // 현재 창을 닫고
      onLoginModalOpen(); // 로그인 창을 엽니다.
  };

  const getTabClassName = (type: 'customer' | 'agent') => {
    const baseClasses = "w-1/2 py-3 text-center text-lg font-bold focus:outline-none transition-colors duration-300";
    if (userType === type) {
      return `${baseClasses} text-harubang-blue border-b-2 border-harubang-blue`;
    }
    return `${baseClasses} text-gray-400 border-b-2 border-gray-200 hover:text-harubang-blue hover:border-harubang-blue/50`;
  };

  const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";


  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl z-10 flex flex-col max-h-[80vh]" 
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
              aria-label="닫기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            {/* Modal Header */}
            <div className="p-8 pb-6 flex-shrink-0">
                <div className="text-center mb-6">
                    <img src={harubangLogo} alt="하루방 로고" className="h-12 w-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-harubang-ink">회원가입</h2>
                </div>
                <div className="flex">
                  <button onClick={() => setUserType('customer')} className={getTabClassName('customer')}>일반 회원</button>
                  <button onClick={() => setUserType('agent')} className={getTabClassName('agent')}>공인중개사 회원</button>
                </div>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="overflow-y-auto px-8">
              <form className="space-y-4">
                  {userType === 'customer' ? (
                      <>
                          <div><label className={labelStyle}>이름</label><input type="text" placeholder="이름을 입력하세요" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>이메일</label><input type="email" placeholder="이메일 주소를 입력하세요" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>비밀번호</label><input type="password" placeholder="8자리 이상, 영문/숫자/특수문자 조합" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>비밀번호 확인</label><input type="password" placeholder="비밀번호를 다시 한번 입력하세요" required className={inputStyle} /></div>
                      </>
                  ) : (
                       <>
                          <h3 className="font-semibold text-gray-800 border-b pb-2">중개사무소 정보</h3>
                          <div><label className={labelStyle}>중개사무소 이름</label><input type="text" placeholder="예) 하루방 공인중개사사무소" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>사업자 등록번호</label><input type="text" placeholder="'-' 없이 숫자만 입력" required className={inputStyle} /></div>
                          
                          <h3 className="font-semibold text-gray-800 border-b pb-2 pt-4">대표자 정보</h3>
                          <div><label className={labelStyle}>대표자명</label><input type="text" placeholder="대표자 성함을 입력하세요" required className={inputStyle} /></div>
                          <div>
                              <label className={labelStyle}>대표자 휴대폰 번호</label>
                              <div className="flex gap-2">
                                  <input type="tel" placeholder="'-' 없이 숫자만 입력" required className={inputStyle} />
                                  <button type="button" className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg text-sm flex-shrink-0 hover:bg-gray-300">인증요청</button>
                              </div>
                          </div>

                           <h3 className="font-semibold text-gray-800 border-b pb-2 pt-4">계정 정보</h3>
                          <div><label className={labelStyle}>이메일 (아이디)</label><input type="email" placeholder="사용하실 이메일 주소를 입력하세요" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>비밀번호</label><input type="password" placeholder="8자리 이상, 영문/숫자/특수문자 조합" required className={inputStyle} /></div>
                          <div><label className={labelStyle}>비밀번호 확인</label><input type="password" placeholder="비밀번호를 다시 한번 입력하세요" required className={inputStyle} /></div>
                      </>
                  )}
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-6 flex-shrink-0">
              <form onSubmit={handleSignUp}>
                <div className="pt-4">
                    <label className="flex items-center gap-2 text-xs text-gray-500"><input type="checkbox" required className="rounded border-gray-300 text-harubang-blue focus:ring-harubang-blue" /> <span>(필수) 서비스 이용약관 및 개인정보처리방침에 동의합니다.</span></label>
                </div>
                <div><button type="submit" className="w-full bg-harubang-blue text-white font-bold py-3 rounded-lg hover:bg-harubang-blue-dark transition-colors mt-4">가입하기</button></div>
              </form>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;