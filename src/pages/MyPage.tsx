import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye } from 'lucide-react';

// 내 신청서 목록 임시 데이터
const mockMyRequests = [
    { id: 1, title: '서울시 강남구 아파트 전세', status: '제안 도착 (2건)', date: '2025-09-22' },
    { id: 2, title: '경기도 수원시 오피스텔 월세', status: '검토 중', date: '2025-09-18' },
];

const MyPage: React.FC = () => {
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
        {mockMyRequests.length > 0 ? (
            <ul className="divide-y divide-gray-200">
                {mockMyRequests.map(req => (
                    <li key={req.id} className="py-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg text-harubang-ink">{req.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{req.date} 신청</p>
                        </div>
                        <div className="text-right">
                             <p className={`font-bold ${req.status.includes('제안 도착') ? 'text-green-500' : 'text-gray-500'}`}>{req.status}</p>
                             {req.status.includes('제안 도착') && (
                                <Link to={`/proposals/${req.id}`} className="mt-1 inline-flex items-center gap-1 text-sm text-harubang-blue font-semibold hover:underline">
                                    <Eye size={14} /> 제안 보기
                                </Link>
                             )}
                        </div>
                    </li>
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