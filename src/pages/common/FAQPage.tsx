import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Instagram } from 'lucide-react';

// FAQ 데이터
const faqData = [
  {
    question: "'하루방'은 어떤 서비스인가요?",
    answer: "'하루방'은 고객이 원하는 집의 조건을 신청서로 작성하면, 여러 공인중개사가 그에 맞는 최적의 매물 1건씩을 직접 제안하는 역제안 방식의 맞춤형 부동산 매칭 플랫폼입니다. 불필요한 발품과 허위 매물 걱정을 덜어드리는 것을 목표로 합니다.",
  },
  {
    question: "기존 부동산 앱(직방, 다방)과는 무엇이 다른가요?",
    answer: "기존 앱이 수많은 매물을 나열하고 사용자가 직접 필터링하며 찾아야 하는 방식이라면, '하루방'은 정반대입니다. 고객님의 신청서를 보고 전문가인 중개사가 직접 조건에 맞는 매물을 선별하여 제안하기 때문에, 정보 과잉으로 인한 피로 없이 양질의 매물만 확인할 수 있습니다.",
  },
  {
    question: "신청서는 어떻게 작성해야 하나요?",
    answer: "원하는 지역, 예산, 집 종류 등 기본적인 정보와 함께, '반려동물을 키워요', '남향집이었으면 좋겠어요', '조용한 동네를 원해요' 등 자유로운 형식으로 희망사항을 자세하게 적어주실수록 좋습니다. 자세할수록 중개사님이 더 꼭 맞는 집을 찾아드릴 확률이 높아집니다.",
  },
  {
    question: "중개 수수료 외에 추가 비용이 있나요?",
    answer: "아니요. 고객님이 '하루방' 서비스를 이용하는 데에는 어떠한 추가 비용도 발생하지 않습니다. 부동산 계약 시 발생하는 법정 중개보수 외에는 무료로 이용하실 수 있습니다.",
  },
  {
    question: "허위 매물은 없나요?",
    answer: "'하루방'은 중개사님이 직접 실수요 고객에게 매물을 제안하는 구조이므로, 허위·미끼 매물을 올릴 이유가 없습니다. 또한, 중개사 인증 및 사용자 피드백 시스템을 통해 신뢰할 수 있는 매물만 추천되도록 관리하고 있습니다.",
  },
];

interface FAQItemProps {
    question: string;
    answer: string;
}

// 각 질문과 답변을 나타내는 아코디언 아이템 컴포넌트
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-6"
            >
                <span className="text-lg font-semibold text-harubang-ink">{question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-6 h-6 text-harubang-blue" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pr-8 text-harubang-ink-light leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// FAQ 페이지 전체 컴포넌트
const FAQPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-harubang-ink mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-harubang-ink-light max-w-2xl mx-auto">
            '하루방' 이용에 대해 궁금한 점이 있으신가요? <br/>
            자주 묻는 질문들을 확인해보세요.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
            {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
        </div>

        {/* 추가 문의 섹션 */}
        <div className="mt-20 text-center bg-harubang-sky p-10 rounded-xl">
            <h2 className="text-2xl font-bold text-harubang-ink mb-3">찾으시는 답변이 없나요?</h2>
            <p className="text-harubang-ink-light mb-6">추가적인 문의나 궁금한 점이 있다면 언제든지 편하게 연락주세요.</p>
            <div className="flex justify-center items-center gap-4">
                <a 
                    href="http://pf.kakao.com/_xhvRUn" // 나중에 실제 카카오톡 채널 링크로 교체
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold py-2 px-5 rounded-full hover:bg-yellow-500 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" /> 카카오톡으로 문의하기
                </a>
                <a 
                    href="https://www.instagram.com/harubang_official?igsh=MWg5Nm1uN2lrcjltZQ==" // 나중에 실제 인스타그램 링크로 교체
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-800 text-white font-bold py-2 px-5 rounded-full hover:bg-gray-900 transition-colors"
                >
                    <Instagram className="w-5 h-5" /> 인스타그램 DM 보내기
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;