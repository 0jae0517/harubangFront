import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Building, Banknote, Home, ParkingCircle, Sun, PawPrint, MessageSquare } from 'lucide-react';

const RequestDetailPage: React.FC = () => {
    const { requestId } = useParams();

    // 실제로는 API를 통해 requestId에 맞는 데이터를 가져옵니다.
    const mockRequestDetails = {
        id: requestId,
        customerName: '김하루',
        propertyType: '아파트',
        transactionType: '전세',
        location: '서울특별시 강남구',
        deposit: '5억',
        details: '역세권이었으면 좋겠습니다. 그리고 남향집을 선호해요. 주차 공간은 1대 이상 필수입니다. 반려동물은 키우지 않습니다.',
        timestamp: '2시간 전',
    };

    return (
        <div className="bg-harubang-sky min-h-full py-12">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/agent/dashboard" className="inline-flex items-center gap-2 text-harubang-ink-light hover:text-harubang-blue mb-6">
                        <ArrowLeft size={18} /> 목록으로 돌아가기
                    </Link>
                    <h1 className="text-3xl font-bold text-harubang-ink">고객 신청서 상세 정보</h1>
                    <p className="text-harubang-ink-light mt-2">{mockRequestDetails.timestamp}에 등록된 신청서입니다.</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-white rounded-xl shadow-md p-8"
                >
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <User size={24} className="text-harubang-blue"/>
                            <div>
                                <p className="text-sm text-gray-500">신청자</p>
                                <p className="font-semibold text-lg">{mockRequestDetails.customerName}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-3">
                                <Building size={24} className="text-harubang-blue"/>
                                <div>
                                    <p className="text-sm text-gray-500">희망 매물</p>
                                    <p className="font-semibold text-lg">{mockRequestDetails.propertyType}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Home size={24} className="text-harubang-blue"/>
                                <div>
                                    <p className="text-sm text-gray-500">거래 종류</p>
                                    <p className="font-semibold text-lg">{mockRequestDetails.transactionType}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-3">
                                <Banknote size={24} className="text-harubang-blue"/>
                                <div>
                                    <p className="text-sm text-gray-500">예산</p>
                                    <p className="font-semibold text-lg">{mockRequestDetails.deposit}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                             <p className="text-sm text-gray-500 mb-2">상세 요청사항</p>
                             <p className="bg-gray-50 p-4 rounded-md text-gray-700 leading-relaxed">
                                {mockRequestDetails.details}
                             </p>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t flex justify-end">
                        <Link 
                            to={`/agent/proposal/submit/${requestId}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-harubang-blue text-white font-bold rounded-lg hover:bg-harubang-blue-dark transition-colors shadow-md"
                        >
                            <MessageSquare size={18} /> 이 고객에게 매물 제안하기
                        </Link>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default RequestDetailPage;