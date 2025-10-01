import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Banknote, MessageSquare, ArrowLeft, Home, Bath, Square } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

const ProposalsPage: React.FC = () => {
    const { state } = useAppContext();
    const { requestId } = useParams();

    const proposals = state.proposals.filter(p => p.requestId === Number(requestId));

    return (
        <div className="bg-harubang-sky min-h-full py-12">
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/mypage" className="inline-flex items-center gap-2 text-harubang-ink-light hover:text-harubang-blue mb-6">
                        <ArrowLeft size={18} /> 내 정보로 돌아가기
                    </Link>
                    <h1 className="text-3xl font-bold text-harubang-ink">받은 제안 목록</h1>
                    <p className="text-harubang-ink-light mt-2">신청서 ID: {requestId}에 대해 중개사님들이 보내주신 매물 제안입니다.</p>
                </motion.div>
                <div className="mt-8 grid gap-8 md:grid-cols-2">
                    {proposals.map((proposal, index) => {
                        const property = state.properties.find(p => p.id === proposal.propertyId);
                        if (!property) return null;

                        return (
                            <motion.div 
                                key={proposal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border flex flex-col justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-sm text-gray-500">{proposal.agentName}</p>
                                    <h2 className="text-xl font-bold my-2 text-harubang-blue">{property.name}</h2>
                                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-harubang-ink-light my-3">
                                        <span className="flex items-center gap-1.5"><Building size={14} /> {property.type}</span>
                                        <span className="flex items-center gap-1.5"><Banknote size={14} /> {property.deal} | {property.price}</span>
                                        <span className="flex items-center gap-1.5"><Square size={14} /> {property.area}</span>
                                        <span className="flex items-center gap-1.5"><Home size={14} /> 방 {property.rooms}</span>
                                        <span className="flex items-center gap-1.5"><Bath size={14} /> 욕실 {property.baths}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md border">임시 특징 설명</p>
                                </div>
                                <Link
                                    to={`/chat/${proposal.chatRoomId}`}
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors shadow-md"
                                >
                                    <MessageSquare size={18} /> 이 중개사와 채팅하기
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProposalsPage;