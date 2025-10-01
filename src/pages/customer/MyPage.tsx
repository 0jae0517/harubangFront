import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Eye, Bell } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

const MyPage: React.FC = () => {
  const { state } = useAppContext();
  const myRequests = state.requests;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">내 정보</h1>
                <p className="mt-2 text-gray-600">나의 신청 내역과 회원 정보를 관리할 수 있습니다.</p>
            </div>
            <Link 
                to="/mypage/edit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
                <Edit size={16} /> 정보 수정하기
            </Link>
        </div>
      
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">나의 신청 내역</h2>
        {myRequests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
                {myRequests.map((req, index) => (
                    <motion.li 
                        key={req.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="py-5 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold text-lg text-harubang-ink">{req.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{req.date} 신청</p>
                        </div>
                        <div className="text-right">
                             <div className="flex items-center justify-end gap-2">
                                {req.hasNew && (
                                    <span className="flex items-center gap-1 text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded-full">
                                        <Bell size={12} /> NEW
                                    </span>
                                )}
                                <p className={`font-bold ${req.status.includes('제안 도착') ? 'text-green-600' : 'text-gray-500'}`}>{req.status}</p>
                             </div>
                             {req.status.includes('제안 도착') && (
                                <Link to={`/proposals/${req.id}`} className="mt-2 inline-flex items-center gap-1.5 text-sm text-white bg-harubang-blue font-semibold hover:bg-harubang-blue-dark py-2 px-4 rounded-lg transition-colors">
                                    <Eye size={14} /> 제안 보기
                                </Link>
                             )}
                        </div>
                    </motion.li>
                ))}
            </ul>
        ) : (
             <div className="text-center text-gray-500 py-8">
                <p>작성한 신청서 내역이 없습니다.</p>
                <Link to="/apply" className="mt-4 inline-block text-harubang-blue font-semibold hover:underline">
                첫 신청서 작성하러 가기
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;