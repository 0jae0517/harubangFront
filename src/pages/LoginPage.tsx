/*import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'customer' | 'agent'>('customer');

  const getTabClassName = (type: 'customer' | 'agent') => {
    const baseClasses = "w-full py-3 text-lg font-bold focus:outline-none transition-colors duration-300";
    if (userType === type) {
      return `${baseClasses} text-harubang-blue border-b-2 border-harubang-blue`;
    }
    return `${baseClasses} text-gray-400 hover:text-harubang-blue`;
  };

  return (
    <div className="bg-harubang-sky flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8"
      >
        <div className="flex">
          <button onClick={() => setUserType('customer')} className={getTabClassName('customer')}>고객</button>
          <button onClick={() => setUserType('agent')} className={getTabClassName('agent')}>공인중개사</button>
        </div>

        {userType === 'customer' ? <CustomerLoginForm /> : <AgentLoginForm />}
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
            </div>
        </div>

        <div>
            {/* 실제 소셜 로그인 기능은 추후 구현 필요 *//*}*/
           /* <button type="button" className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                카카오로 시작하기
            </button>
        </div>

      </motion.div>
    </div>
  );
};

const CustomerLoginForm: React.FC = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">고객으로 로그인</h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
                <div><input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-harubang-blue focus:border-harubang-blue" placeholder="이메일 주소" /></div>
                <div><input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-harubang-blue focus:border-harubang-blue" placeholder="비밀번호" /></div>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-harubang-blue hover:bg-harubang-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-harubang-blue">로그인</button>
        </form>
    </motion.div>
);

const AgentLoginForm: React.FC = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">공인중개사로 로그인</h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
             <div className="rounded-md shadow-sm -space-y-px">
                <div><input name="agent-id" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-harubang-blue focus:border-harubang-blue" placeholder="중개사무소 아이디" /></div>
                <div><input name="agent-password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-harubang-blue focus:border-harubang-blue" placeholder="비밀번호" /></div>
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-harubang-blue hover:bg-harubang-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-harubang-blue">로그인</button>
        </form>
    </motion.div>
);

export default LoginPage;
*/