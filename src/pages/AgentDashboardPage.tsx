import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Banknote, Eye, Edit } from 'lucide-react';

// ... (mockRequests 데이터는 이전과 동일) ...
const mockRequests = [
  { id: 1, location: '서울특별시 강남구', propertyType: '아파트', transactionType: '전세', deposit: '5억', timestamp: '2시간 전' },
  { id: 2, location: '경기도 수원시 영통구', propertyType: '오피스텔', transactionType: '월세', deposit: '2000만', rent: '80만', timestamp: '5시간 전' },
  { id: 3, location: '인천광역시 연수구 송도동', propertyType: '아파트', transactionType: '매매', deposit: '12억', timestamp: '1일 전' },
  { id: 4, location: '서울특별시 마포구 연남동', propertyType: '빌라', transactionType: '전세', deposit: '3억 5천', timestamp: '2일 전' },
];

const AgentDashboardPage: React.FC = () => {
    const navigate = useNavigate();

    const handleViewDetails = (requestId: number) => {
        navigate(`/agent/request/${requestId}`);
    };

  return (
    <div className="bg-harubang-sky min-h-full py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-harubang-ink mb-2">중개사 대시보드</h1>
                <p className="text-harubang-ink-light">새로운 고객 의뢰 목록입니다. 각 항목을 확인하고 매물을 제안해보세요.</p>
            </div>
            <Link 
                to="/agent/profile/edit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
                <Edit size={16} /> 내 정보 수정
            </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mockRequests.map((req, index) => (
              <motion.li 
                key={req.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 hover:bg-harubang-sky/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                           <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                               req.transactionType === '전세' ? 'bg-blue-100 text-blue-800' :
                               req.transactionType === '월세' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                           }`}>
                               {req.transactionType}
                           </span>
                           <p className="text-sm text-harubang-ink-light">{req.timestamp}</p>
                        </div>
                        <p className="font-bold text-lg text-harubang-ink">{req.location}</p>
                        <div className="flex items-center gap-4 text-sm text-harubang-ink-light mt-2">
                            <span className="flex items-center gap-1"><Building size={14} /> {req.propertyType}</span>
                            <span className="flex items-center gap-1"><Banknote size={14} /> 
                                {req.transactionType === '월세' ? `${req.deposit} / ${req.rent}` : req.deposit}
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
                        <button 
                            onClick={() => handleViewDetails(req.id)}
                            className="flex items-center gap-2 bg-harubang-blue text-white font-bold py-2 px-4 rounded-full hover:bg-harubang-blue-dark transition-colors shadow-sm"
                        >
                            <Eye size={16} /> 상세 보기
                        </button>
                    </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardPage;