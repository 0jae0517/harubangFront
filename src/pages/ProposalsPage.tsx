import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Banknote, MessageSquare } from 'lucide-react';

// 제안 목록 임시 데이터
const mockProposals = [
    { 
        id: 1, 
        agentName: '친절한 하루방 공인중개사',
        property: {
            type: '아파트',
            address: '서울특별시 강남구 역삼동',
            deposit: '5억',
            features: '역세권, 남향, 시스템에어컨 완비'
        },
    },
    { 
        id: 2, 
        agentName: '행복 부동산',
        property: {
            type: '아파트',
            address: '서울특별시 강남구 대치동',
            deposit: '4억 8천',
            features: '리모델링 완료, 조용한 주거 환경'
        },
    },
];

const ProposalsPage: React.FC = () => {
    const { requestId } = useParams();

    return (
        <div className="bg-harubang-sky min-h-full py-12">
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-harubang-ink">받은 제안 목록</h1>
                    <p className="text-harubang-ink-light mt-2">신청서 ID: {requestId}에 대해 중개사님들이 보내주신 매물 제안입니다.</p>
                </motion.div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {mockProposals.map((proposal, index) => (
                        <motion.div 
                            key={proposal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-md p-6 border flex flex-col justify-between"
                        >
                            <div>
                                <p className="font-semibold text-sm text-gray-500">{proposal.agentName}</p>
                                <h2 className="text-xl font-bold my-2 text-harubang-blue">{proposal.property.address}</h2>
                                <div className="flex items-center gap-4 text-sm text-harubang-ink-light my-3">
                                    <span className="flex items-center gap-1"><Building size={14} /> {proposal.property.type}</span>
                                    <span className="flex items-center gap-1"><Banknote size={14} /> {proposal.property.deposit}</span>
                                </div>
                                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">{proposal.property.features}</p>
                            </div>
                            <Link
                                to={`/chat/${proposal.id}`} // 실제로는 채팅방 ID가 들어가야 합니다.
                                className="mt-6 w-full flex items-center justify-center gap-2 bg-harubang-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-harubang-blue-dark transition-colors shadow-sm"
                            >
                                <MessageSquare size={18} /> 이 중개사와 채팅하기
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProposalsPage;