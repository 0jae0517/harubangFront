import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Banknote, X, Home, Bath, Square } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

interface SelectPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropose: (propertyId: number) => void;
}

const SelectPropertyModal: React.FC<SelectPropertyModalProps> = ({ isOpen, onClose, onPropose }) => {
  const { state } = useAppContext();
  const properties = state.properties;

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
            <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl font-bold text-harubang-ink">제안할 매물 선택</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="overflow-y-auto p-6">
                <ul className="space-y-4">
                    {properties.map(prop => (
                       <li key={prop.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div className="flex-grow">
                                <p className="font-bold text-harubang-ink">{prop.name}</p>
                                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-harubang-ink-light mt-2">
                                    <span className="flex items-center gap-1.5"><Building size={14} /> {prop.type}</span>
                                    <span className="flex items-center gap-1.5"><Banknote size={14} /> {prop.deal} | {prop.price}</span>
                                    <span className="flex items-center gap-1.5"><Square size={14} /> {prop.area}</span>
                                    <span className="flex items-center gap-1.5"><Home size={14} /> 방 {prop.rooms}</span>
                                    <span className="flex items-center gap-1.5"><Bath size={14} /> 욕실 {prop.baths}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => onPropose(prop.id)}
                                className="bg-harubang-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-harubang-blue-dark transition-colors text-sm w-full sm:w-auto flex-shrink-0"
                            >
                                이 매물로 제안하기
                            </button>
                        </li>
                    ))}
                     {properties.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            <p>먼저 '매물 관리' 페이지에서 매물을 등록해주세요.</p>
                        </div>
                     )}
                </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SelectPropertyModal;