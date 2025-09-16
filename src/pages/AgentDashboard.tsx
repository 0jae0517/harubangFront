import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

// 임시 데이터
const requests = [
  { id: 1, location: '서울시 강남구', type: '아파트 전세', budget: '5억', date: '3일 전' },
  { id: 2, location: '서울시 마포구', type: '오피스텔 월세', budget: '1000/80', date: '5일 전' },
  { id: 3, location: '성남시 분당구', type: '빌라 매매', budget: '7억 5천', date: '1주 전' },
  { id: 4, location: '서울시 관악구', type: '원룸 전세', budget: '2억', date: '2주 전' },
];

const AgentDashboard: React.FC = () => {
  return (
    <div className="bg-harubang-sky min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-harubang-ink mb-2">중개사 대시보드</h1>
          <p className="text-harubang-ink-light mb-8">새로운 고객의 매물 요청을 확인하고 매물을 제안해보세요.</p>
        </motion.div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {requests.map((req, index) => (
              <motion.li 
                key={req.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-harubang-sky/50 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-lg font-semibold text-harubang-blue">{req.location}</p>
                    <p className="text-harubang-ink mt-1">
                      <span className="font-medium">{req.type}</span> | 예산: <span className="font-medium">{req.budget}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{req.date} 등록</p>
                  </div>
                  <button className="flex items-center gap-2 bg-white border border-harubang-blue text-harubang-blue font-bold py-2 px-4 rounded-full hover:bg-harubang-blue hover:text-white transition-colors duration-300">
                    <Eye size={16} /> 요청 확인 및 제안하기
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;