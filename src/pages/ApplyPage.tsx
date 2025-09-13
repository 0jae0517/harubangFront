import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const TOTAL_STEPS = 4;

const ApplyPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const steps = [
        <Step1 key={1} />,
        <Step2 key={2} />,
        <Step3 key={3} />,
        <Step4 key={4} />,
    ];

    return (
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
                        <button className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transition-all">
                            신청서 제출하기 <Check size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// 각 단계별 컴포넌트 (실제 내용은 추후 구체화)
const Step1 = () => (
    <div>
        <h2 className="text-2xl font-bold mb-2">어떤 집을 찾으시나요?</h2>
        <p className="text-harubang-ink-light mb-6">가장 기본적인 정보부터 알려주세요.</p>
        {/* Form fields for step 1 */}
    </div>
);
const Step2 = () => (
    <div>
        <h2 className="text-2xl font-bold mb-2">희망 지역을 선택해주세요.</h2>
        <p className="text-harubang-ink-light mb-6">출퇴근, 통학 등 라이프스타일을 고려하면 좋아요.</p>
        {/* Form fields for step 2 */}
    </div>
);
const Step3 = () => (
    <div>
        <h2 className="text-2xl font-bold mb-2">추가적인 희망 조건을 알려주세요.</h2>
        <p className="text-harubang-ink-light mb-6">반려동물, 주차, 채광 등 원하는 모든 것을 자유롭게 적어주세요.</p>
        {/* Form fields for step 3 */}
    </div>
);
const Step4 = () => (
    <div>
        <h2 className="text-2xl font-bold mb-2">거의 다 왔어요!</h2>
        <p className="text-harubang-ink-light mb-6">작성하신 내용을 마지막으로 확인하고 제출해주세요.</p>
        {/* Review of all form data */}
    </div>
);

export default ApplyPage;
