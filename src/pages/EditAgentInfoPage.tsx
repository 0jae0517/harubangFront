import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, KeyRound } from 'lucide-react';

const EditAgentInfoPage: React.FC = () => {
  return (
    <div className="bg-harubang-sky min-h-full py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-harubang-ink mb-2">중개사 정보 수정</h1>
          <p className="text-harubang-ink-light mb-8">정확한 정보는 고객과의 신뢰를 만듭니다.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <form className="space-y-8">
            {/* 중개사무소 정보 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Building size={20} /> 중개사무소 정보</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700">중개사무소 이름</label>
                  <input type="text" id="agent-name" defaultValue="하루방 공인중개사사무소" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
                <div>
                  <label htmlFor="owner-name" className="block text-sm font-medium text-gray-700">대표자명</label>
                  <input type="text" id="owner-name" defaultValue="유승현" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
                <div>
                  <label htmlFor="agent-contact" className="block text-sm font-medium text-gray-700">대표 연락처</label>
                  <input type="tel" id="agent-contact" defaultValue="02-123-4567" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
              </div>
            </div>

            {/* 비밀번호 변경 */}
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><KeyRound size={20} /> 비밀번호 변경</h2>
              <div className="space-y-4">
                 <div>
                  <label htmlFor="current-password-agent" className="block text-sm font-medium text-gray-700">현재 비밀번호</label>
                  <input type="password" id="current-password-agent" placeholder="현재 비밀번호를 입력하세요" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
                <div>
                  <label htmlFor="new-password-agent" className="block text-sm font-medium text-gray-700">새 비밀번호</label>
                  <input type="password" id="new-password-agent" placeholder="새로운 비밀번호를 입력하세요" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
                <div>
                  <label htmlFor="confirm-password-agent" className="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
                  <input type="password" id="confirm-password-agent" placeholder="새로운 비밀번호를 다시 한번 입력하세요" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-harubang-blue focus:border-harubang-blue" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link to="/agent/dashboard" className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">취소</Link>
              <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-harubang-blue hover:bg-harubang-blue-dark">정보 저장하기</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditAgentInfoPage;