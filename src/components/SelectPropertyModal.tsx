import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Banknote, X } from 'lucide-react';

// AgentPropertiesPage와 동일한 임시 매물 데이터
const mockProperties = [
    { id: 101, name: '역삼동 래미안 아파트 101동 502호', type: '아파트', deal: '전세', price: '5억' },
    { id: 102, name: '수원시 영통구 광교자이 오피스텔', type: '오피스텔', deal: '월세', price: '2000만 / 80만' },
    { id: 103, name: '연남동 신축 빌라 301호', type: '빌라', deal: '매매', price: '12억' },
];

interface SelectPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropose: (propertyId: number) => void;
}

const SelectPropertyModal: React.FC<SelectPropertyModalProps> = ({ isOpen, onClose, onPropose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/50" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl z-10 flex flex-col max-h-[80vh]"
          >
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl font-bold text-harubang-ink">제안할 매물 선택</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="overflow-y-auto p-6">
                <ul className="space-y-4">
                    {mockProperties.map(prop => (
                        <li key={prop.id} className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold text-harubang-ink">{prop.name}</p>
                                <div className="flex items-center gap-4 text-sm text-harubang-ink-light mt-1">
                                    <span className="flex items-center gap-1.5"><Building size={14} /> {prop.type}</span>
                                    <span className="flex items-center gap-1.5"><Banknote size={14} /> {prop.deal} | {prop.price}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => onPropose(prop.id)}
                                className="bg-harubang-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-harubang-blue-dark transition-colors text-sm"
                            >
                                선택하기
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SelectPropertyModal;