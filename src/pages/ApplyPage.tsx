import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, X, ChevronLeft } from 'lucide-react';

const TOTAL_STEPS = 4;

// --- 타입 정의 ---
interface Dong {
    code: string;
    name: string;
}
interface Sigungu {
    code: string;
    name: string;
    dong: Dong[];
}
interface Sido {
    code: string;
    name: string;
    sigungu: Sigungu[];
}

// --- 한국 행정구역 데이터 (법정동 코드 포함 상세 버전) ---
const locationData: Sido[] = [
    {
        code: '1100000000', name: '서울특별시',
        sigungu: [
            { code: '1111000000', name: '종로구', dong: [ { code: '1111010100', name: '청운동' }, { code: '1111010200', name: '신교동' }, { code: '1111010300', name: '궁정동' } ] },
            { code: '1117000000', name: '용산구', dong: [ { code: '1117010100', name: '후암동' }, { code: '1117010200', name: '용산동1가' }, { code: '1117010300', name: '용산동2가' } ] },
            { code: '1121500000', name: '광진구', dong: [ { code: '1121510100', name: '중곡동' }, { code: '1121510200', name: '능동' }, { code: '1121510300', name: '구의동' } ] },
        ]
    },
    {
        code: '4100000000', name: '경기도',
        sigungu: [
            { code: '4111000000', name: '수원시', dong: [ { code: '4111110100', name: '파장동' }, { code: '4111110200', name: '정자동' }, { code: '4111310100', name: '매탄동' } ] },
            { code: '4113000000', name: '성남시', dong: [ { code: '4113110100', name: '신흥동' }, { code: '4113110200', name: '태평동' }, { code: '4113510100', name: '분당동' } ] },
            { code: '4115000000', name: '의정부시', dong: [ { code: '4115010100', name: '의정부동' }, { code: '4115010200', name: '호원동' }, { code: '4115010300', name: '장암동' } ] },
        ]
    },
    {
        code: '2800000000', name: '인천광역시',
        sigungu: [
            { code: '2811000000', name: '중구', dong: [ { code: '2811010100', name: '중앙동1가' }, { code: '2811010200', name: '중앙동2가' }, { code: '2811011300', name: '운서동' } ] },
            { code: '2818500000', name: '미추홀구', dong: [ { code: '2818510100', name: '숭의동' }, { code: '2818510200', name: '용현동' }, { code: '2818510300', name: '주안동' } ] },
            { code: '2823700000', name: '부평구', dong: [ { code: '2823710100', name: '부평동' }, { code: '2823710200', name: '십정동' }, { code: '2823710300', name: '산곡동' } ] },
        ]
    },
];


// 폼 데이터의 타입을 정의합니다.
interface FormData {
  propertyType: '아파트' | '오피스텔' | '원룸' | '상가' | '';
  transactionType: '전세' | '월세' | '매매' | '';
  location: string;
  locationCode: string; // 법정동 코드를 저장할 필드 추가
  deposit: string;
  rent: string;
  details: string;
}

// 각 스텝 컴포넌트가 받을 props 타입을 정의합니다.
interface StepProps {
    data: Partial<FormData>;
    updateData: (fields: Partial<FormData>) => void;
}

const ApplyPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        propertyType: '',
        transactionType: '',
        location: '',
        locationCode: '',
        deposit: '',
        rent: '',
        details: ''
    });
    // 지역 선택 모달의 상태를 관리합니다.
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    
    const updateData = (fields: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const steps = [
        <Step1 key={1} data={formData} updateData={updateData} />,
        <Step2 key={2} data={formData} updateData={updateData} onModalOpen={() => setIsLocationModalOpen(true)} />,
        <Step3 key={3} data={formData} updateData={updateData} />,
        <Step4 key={4} data={formData} updateData={updateData} />,
    ];

    return (
        <>
            <div className="bg-harubang-sky min-h-full flex flex-col justify-center items-center py-12 px-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-harubang-blue">신청서 작성</span>
                            <span className="text-sm text-harubang-ink-light">{currentStep} / {TOTAL_STEPS}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div 
                                className="bg-harubang-blue h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* Form Steps */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {steps[currentStep - 1]}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="mt-10 flex justify-between items-center">
                        <button 
                            onClick={handlePrev} 
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 px-6 py-2 text-harubang-ink-light rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeft size={16} /> 이전
                        </button>
                        {currentStep < TOTAL_STEPS ? (
                            <button 
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2 bg-harubang-blue text-white rounded-full hover:bg-harubang-blue-dark shadow-md hover:shadow-lg transition-all"
                            >
                                다음 <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#4e7aad] text-white rounded-full hover:bg-[#406790] shadow-md hover:shadow-lg transition-all">
                                신청서 제출하기 <Check size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <LocationModal 
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
                onSelect={(location, code) => {
                    updateData({ location, locationCode: code });
                    setIsLocationModalOpen(false);
                }}
            />
        </>
    );
};

// --- 지역 선택 모달 컴포넌트 ---
interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (location: string, code: string) => void;
}
const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [step, setStep] = useState<'sido' | 'sigungu' | 'dong'>('sido');
    const [selectedSido, setSelectedSido] = useState<Sido | null>(null);
    const [selectedSigungu, setSelectedSigungu] = useState<Sigungu | null>(null);
    
    useEffect(() => {
        // 모달이 열릴 때 상태 초기화
        if (isOpen) {
            setStep('sido');
            setSelectedSido(null);
            setSelectedSigungu(null);
        }
    }, [isOpen]);

    const handleSidoSelect = (sido: Sido) => {
        setSelectedSido(sido);
        setStep('sigungu');
    };

    const handleSigunguSelect = (sigungu: Sigungu) => {
        setSelectedSigungu(sigungu);
        setStep('dong');
    };
    
    const handleBack = (targetStep: 'sido' | 'sigungu') => {
        setStep(targetStep);
        if (targetStep === 'sido') {
            setSelectedSigungu(null);
        }
    };
    
    const getTitle = () => {
        if (step === 'sigungu') return '시/군/구 선택';
        if (step === 'dong') return '읍/면/동 선택';
        return '시/도 선택';
    }
    
    const listVariants = {
        enter: { opacity: 0, x: 50 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 z-10 flex flex-col h-[70vh]"
                    >
                        <div className="flex justify-between items-center mb-4 flex-shrink-0">
                            <div className="flex items-center gap-2">
                                {step !== 'sido' && (
                                    <button onClick={() => handleBack(step === 'dong' ? 'sigungu' : 'sido')} className="p-1 rounded-full hover:bg-gray-100">
                                        <ChevronLeft size={24} />
                                    </button>
                                )}
                                <h3 className="text-2xl font-bold">{getTitle()}</h3>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                <X size={28} />
                            </button>
                        </div>
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 font-semibold truncate">
                           {selectedSido ? selectedSido.name : '시/도'}
                           {selectedSigungu ? ` > ${selectedSigungu.name}` : ''}
                        </div>
                        {/* --- 수정된 부분 --- */}
                        <div className="flex-grow overflow-y-auto border rounded-lg relative overflow-x-hidden">
                           <AnimatePresence mode="wait">
                                {step === 'sido' && (
                                    <motion.ul key="sido" variants={listVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="absolute w-full">
                                        {locationData.map(item => (
                                            <li key={item.code}>
                                                <button onClick={() => handleSidoSelect(item)} className="w-full text-left p-4 text-sm hover:bg-harubang-sky/50 transition-colors border-b">
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                                {step === 'sigungu' && selectedSido && (
                                     <motion.ul key="sigungu" variants={listVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="absolute w-full">
                                        {selectedSido.sigungu.map(item => (
                                            <li key={item.code}>
                                                <button onClick={() => handleSigunguSelect(item)} className="w-full text-left p-4 text-sm hover:bg-harubang-sky/50 transition-colors border-b">
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                                {step === 'dong' && selectedSido && selectedSigungu && (
                                     <motion.ul key="dong" variants={listVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="absolute w-full">
                                        {selectedSigungu.dong.map(item => (
                                            <li key={item.code}>
                                                <button onClick={() => onSelect(`${selectedSido.name} ${selectedSigungu!.name} ${item.name}`, item.code)} className="w-full text-left p-4 text-sm hover:bg-harubang-sky/50 transition-colors border-b">
                                                    {item.name}
                                                </button>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                           </AnimatePresence>
                        </div>
                    </motion.div>
                 </div>
            )}
        </AnimatePresence>
    );
};


// --- 각 단계별 컴포넌트 수정 ---

const Step1: React.FC<StepProps> = ({ data, updateData }) => (
    <div>
        <h2 className="text-2xl font-bold mb-2">어떤 집을 찾으시나요?</h2>
        <p className="text-harubang-ink-light mb-6">찾으시는 매물의 종류와 거래 유형을 선택해주세요.</p>
        <div className="space-y-6">
            <div>
                <label className="font-semibold text-harubang-ink">매물 종류</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {['아파트', '오피스텔', '빌라', '원룸'].map(type => (
                        <button key={type} onClick={() => updateData({ propertyType: type as FormData['propertyType'] })} className={`p-4 rounded-lg border-2 text-center transition-colors ${data.propertyType === type ? 'bg-harubang-sky border-harubang-blue text-harubang-blue font-bold' : 'border-gray-200 hover:border-harubang-blue'}`}>
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="font-semibold text-harubang-ink">거래 유형</label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {['전세', '월세', '매매'].map(type => (
                        <button key={type} onClick={() => updateData({ transactionType: type as FormData['transactionType'] })} className={`p-4 rounded-lg border-2 text-center transition-colors ${data.transactionType === type ? 'bg-harubang-sky border-harubang-blue text-harubang-blue font-bold' : 'border-gray-200 hover:border-harubang-blue'}`}>
                            {type}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// Step2 컴포넌트에 모달을 여는 함수를 props로 추가합니다.
interface Step2Props extends StepProps {
    onModalOpen: () => void;
}
const Step2: React.FC<Step2Props> = ({ data, updateData, onModalOpen }) => (
    <div>
        <h2 className="text-2xl font-bold mb-5">희망 지역과 예산을 알려주세요.</h2>
            <div className="space-y-4">
            <div>
                <label htmlFor="location" className="font-semibold text-harubang-ink">희망 지역</label>
                <div className="flex items-center gap-2 mt-2">
                    <input id="location" type="text" value={data.location} onChange={e => updateData({ location: e.target.value })} placeholder="예) 서울시 강남구 역삼동" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" />
                    <button onClick={onModalOpen} className="flex-shrink-0 px-4 py-3 bg-gray-100 font-semibold text-harubang-ink rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors">
                        지역 선택
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="deposit" className="font-semibold text-harubang-ink">
                        {data.transactionType === '매매' ? '매매가' : '보증금'}
                    </label>
                    <div className="relative mt-2">
                        <input id="deposit" type="text" value={data.deposit} onChange={e => updateData({ deposit: e.target.value })} placeholder="예) 5000" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">만원</span>
                    </div>
                </div>
                {data.transactionType === '월세' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <label htmlFor="rent" className="font-semibold text-harubang-ink">월세</label>
                        <div className="relative mt-2">
                           <input id="rent" type="text" value={data.rent} onChange={e => updateData({ rent: e.target.value })} placeholder="예) 80" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue" />
                           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">만원</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    </div>
);
const Step3: React.FC<StepProps> = ({ data, updateData }) => (
    <div>
        <h2 className="text-2xl font-bold mb-2">추가적인 희망 조건을 알려주세요.</h2>
        <p className="text-harubang-ink-light mb-6">반려동물, 주차, 채광 등 원하는 모든 것을 자유롭게 적어주세요.</p>
        <textarea 
            value={data.details}
            onChange={(e) => updateData({ details: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue mt-2"
            placeholder="예) 남향이었으면 좋겠어요. 반려동물을 키울 수 있어야 하고, 주차 공간은 1대 필요합니다."
        />
    </div>
);
const Step4: React.FC<StepProps> = ({ data, updateData }) => (
    <div>
        <h2 className="text-2xl font-bold mb-2">거의 다 왔어요!</h2>
        <p className="text-harubang-ink-light mb-6">작성하신 내용을 마지막으로 확인하고 제출해주세요.</p>
        <div className="bg-harubang-sky/50 p-6 rounded-lg space-y-4 text-left border">
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">매물/거래</span>
                <span className="font-bold">{data.propertyType} / {data.transactionType}</span>
            </div>
             <div className="flex justify-between">
                <span className="font-semibold text-gray-600">희망 지역</span>
                <span className="font-bold">{data.location}</span>
            </div>
             <div className="flex justify-between">
                <span className="font-semibold text-gray-600">{data.transactionType === '매매' ? '매매가' : '보증금'}</span>
                <span className="font-bold">{data.deposit} 만원</span>
            </div>
            {data.transactionType === '월세' && (
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">월세</span>
                    <span className="font-bold">{data.rent} 만원</span>
                </div>
            )}
            <div className="pt-2">
                <p className="font-semibold text-gray-600 mb-2">추가 조건</p>
                <p className="text-sm bg-white p-3 rounded">{data.details || '입력된 추가 조건이 없습니다.'}</p>
            </div>
        </div>
    </div>
);

export default ApplyPage;