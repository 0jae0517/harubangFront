import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Building, Banknote, Square, Bath, Car, Home } from 'lucide-react';

// 임시 매물 데이터 (더 상세한 정보 포함)
const mockProperties = [
    { id: 101, name: '역삼동 래미안 아파트 101동 502호', type: '아파트', deal: '전세', price: '5억', area: '84㎡', rooms: '3개', baths: '2개' },
    { id: 102, name: '수원시 영통구 광교자이 오피스텔', type: '오피스텔', deal: '월세', price: '2000만 / 80만', area: '52㎡', rooms: '2개', baths: '1개' },
    { id: 103, name: '연남동 신축 빌라 301호', type: '빌라', deal: '매매', price: '12억', area: '110㎡', rooms: '4개', baths: '2개' },
];

const AgentPropertiesPage: React.FC = () => {
    return (
        <div className="bg-harubang-sky min-h-full py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold text-harubang-ink">내 매물 관리</h1>
                        <p className="text-harubang-ink-light mt-2">등록된 매물을 확인하고 관리할 수 있습니다.</p>
                    </motion.div>
                    <Link
                        to="/agent/properties/add"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-harubang-blue text-white font-bold rounded-lg hover:bg-harubang-blue-dark transition-colors shadow-md"
                    >
                        <PlusCircle size={20} /> 새 매물 등록하기
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {mockProperties.length > 0 ? mockProperties.map((prop, index) => (
                            <motion.li
                                key={prop.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-grow">
                                        <p className="font-bold text-lg text-harubang-ink">{prop.name}</p>
                                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-harubang-ink-light mt-2">
                                            <span className="flex items-center gap-1.5"><Building size={14} /> {prop.type}</span>
                                            <span className="flex items-center gap-1.5"><Banknote size={14} /> {prop.deal} | {prop.price}</span>
                                            <span className="flex items-center gap-1.5"><Square size={14} /> {prop.area}</span>
                                            <span className="flex items-center gap-1.5"><Home size={14} /> 방 {prop.rooms}</span>
                                            <span className="flex items-center gap-1.5"><Bath size={14} /> 욕실 {prop.baths}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex items-center gap-3">
                                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-harubang-blue"><Edit size={16} /> 수정</button>
                                        <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"><Trash2 size={16} /> 삭제</button>
                                    </div>
                                </div>
                            </motion.li>
                        )) : (
                            <div className="p-12 text-center text-gray-500">
                                <p>등록된 매물이 없습니다.</p>
                                <p className="mt-2 text-sm">오른쪽 상단의 '새 매물 등록하기' 버튼을 눌러 첫 매물을 등록해보세요.</p>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AgentPropertiesPage;