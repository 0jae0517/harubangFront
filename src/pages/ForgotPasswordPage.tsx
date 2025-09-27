import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 실제로는 여기서 입력된 이메일로 인증 메일을 보내는 API를 호출합니다.
        alert('입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다. 메일함을 확인해주세요.');
    };

    return (
        <div className="bg-harubang-sky min-h-full flex justify-center items-center py-12 px-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8"
            >
                <div className="text-center">
                    <Mail size={48} className="mx-auto text-harubang-blue" />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        비밀번호 찾기
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        가입 시 사용한 이메일 주소를 입력하시면, 비밀번호 재설정 링크를 보내드립니다.
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input 
                            id="email-address" 
                            name="email" 
                            type="email" 
                            autoComplete="email" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" 
                            placeholder="이메일 주소" 
                        />
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-harubang-blue hover:bg-harubang-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-harubang-blue"
                        >
                            인증 메일 발송
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center">
                    <Link to="/" onClick={(e) => {
                        e.preventDefault();
                        // 실제 앱에서는 로그인 모달을 다시 여는 로직이 필요할 수 있습니다.
                        // 우선은 홈으로 이동하도록 설정합니다.
                        window.history.back();
                    }} className="font-medium text-harubang-blue hover:underline inline-flex items-center gap-1">
                        <ArrowLeft size={14} /> 이전으로 돌아가기
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;