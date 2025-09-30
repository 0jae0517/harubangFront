import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, MessageSquare, Users, UserCheck, BadgePercent, MessageCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white font-sans text-harubang-ink">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 container mx-auto px-6 text-left">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 flex flex-col gap-y-4" // flex, flex-col, gap-y-* 로 간격 조절
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
              <span>어쩌구 저쩌구,</span>
              <span>어쩌구 저쩌구.</span>
</motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl"
            >
                필터 대신 신청서로, 원하는 조건의 집을 한 번에 받아보세요.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Link to="/apply" className="bg-white text-harubang-blue font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                    신청서 작성하러 가기
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
            </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">맞춤형 부동산 매칭 서비스</h2>
          <p className="text-harubang-ink-light text-lg mb-16">하루방은 고객과 중개사 모두에게 최적화된 경험을 제공합니다.</p>
          <div className="grid md:grid-cols-2 gap-10">
            {/* 고객을 위한 서비스 */}
            <div className="bg-harubang-sky/50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-left">고객을 위한 서비스</h3>
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><ClipboardList className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">신청서로 간단하게 상황 전달</h4>
                        <p className="text-harubang-ink-light">복잡한 필터 대신 원하는 조건을 자유롭게 작성하여 전달하세요.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><MessageSquare className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">매물 리스트 추천받기</h4>
                        <p className="text-harubang-ink-light">내 신청서에 맞는 엄선된 매물들을 전문가에게 직접 추천받아요.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><Users className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">여러 중개사와 자유로운 채팅</h4>
                        <p className="text-harubang-ink-light">마음에 드는 매물을 추천한 중개사와 편하게 대화하고 일정을 잡으세요.</p>
                    </div>
                </div>
              </div>
            </div>
            {/* 중개사를 위한 혜택 */}
            <div className="bg-harubang-sky/50 p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-left">중개사를 위한 혜택</h3>
               <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><UserCheck className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">실수요자 중심 타겟 마케팅</h4>
                        <p className="text-harubang-ink-light">실제 구매/임차 의사가 있는 고객의 신청서에 직접 매물을 제안하세요.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><BadgePercent className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">광고 없이 매물 추천 가능</h4>
                        <p className="text-harubang-ink-light">불필요한 광고비 경쟁 없이, 보유한 매물의 가치로 승부할 수 있습니다.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm"><MessageCircle className="w-6 h-6 text-harubang-blue" /></div>
                    <div>
                        <h4 className="font-bold text-lg">고객과 직접 채팅 연결</h4>
                        <p className="text-harubang-ink-light">관심 있는 고객과 직접 소통하며 신뢰를 쌓고 계약을 성사시키세요.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;