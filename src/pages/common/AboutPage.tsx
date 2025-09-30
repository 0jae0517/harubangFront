import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-harubang-ink">
      {/* Hero Section */}
      <section className="bg-harubang-sky py-20 md:py-28 text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 flex flex-col gap-y-3"
          >
            <span>집 구하는 스트레스,</span>
            <span>
                <span className="text-harubang-blue">하루방이 끝내드립니다.</span>
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-harubang-ink-light max-w-3xl mx-auto"
          >
            우리는 부동산 시장의 비효율적인 정보 탐색 과정을 해결하고, <br className="hidden md:block" />
            고객과 중개사 모두가 만족하는 건강한 연결을 만듭니다.
          </motion.p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl font-bold mb-4">우리는 이런 문제를 해결합니다</h2>
                  <p className="text-harubang-ink-light leading-relaxed mb-6">
                      수많은 허위 매물, 끝없이 반복되는 '디지털 발품', 비싼 광고비에 지친 중개사님들. 기존 부동산 시장은 고객과 중개사 모두에게 많은 시간과 노력, 비용을 요구합니다. 하루방은 이 구조적인 문제를 해결하기 위해 시작되었습니다.
                  </p>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-2 bg-harubang-blue rounded-full flex-shrink-0" />
                          <span><strong className="font-semibold">고객의 문제:</strong> 정보 과잉 속에서 진짜 '내 집'을 찾기 위한 과도한 탐색 피로</span>
                      </li>
                       <li className="flex items-start gap-3">
                          <div className="w-2 h-2 mt-2 bg-harubang-blue rounded-full flex-shrink-0" />
                          <span><strong className="font-semibold">중개사의 문제:</strong> 광고비 경쟁에 내몰려 정작 중요한 매물 관리와 고객 상담에 집중하지 못하는 현실</span>
                      </li>
                  </ul>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                  <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop" alt="고민하는 사람" className="rounded-lg shadow-lg" />
              </div>
          </div>
      </section>

      {/* Solution Section */}
      <section className="bg-harubang-sky py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">하루방의 혁신적인 해결책</h2>
          <p className="text-harubang-ink-light mb-12 max-w-2xl mx-auto">
            '매물을 찾는' 방식에서 '매물이 나를 찾는' 방식으로, 패러다임을 전환합니다.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white inline-flex p-4 rounded-full shadow-md mb-4"><Users className="w-8 h-8 text-harubang-blue" /></div>
              <h3 className="font-bold text-lg mb-2">고객 중심</h3>
              <p className="text-sm text-harubang-ink-light">고객의 신청서가 모든 매칭의 중심이 됩니다.</p>
            </div>
            <div className="text-center">
              <div className="bg-white inline-flex p-4 rounded-full shadow-md mb-4"><Target className="w-8 h-8 text-harubang-blue" /></div>
              <h3 className="font-bold text-lg mb-2">역제안 매칭</h3>
              <p className="text-sm text-harubang-ink-light">검증된 중개사가 직접 최적의 매물을 제안합니다.</p>
            </div>
             <div className="text-center">
              <div className="bg-white inline-flex p-4 rounded-full shadow-md mb-4"><Clock className="w-8 h-8 text-harubang-blue" /></div>
              <h3 className="font-bold text-lg mb-2">시간 절약</h3>
              <p className="text-sm text-harubang-ink-light">불필요한 정보 탐색 시간을 획기적으로 줄입니다.</p>
            </div>
             <div className="text-center">
              <div className="bg-white inline-flex p-4 rounded-full shadow-md mb-4"><Award className="w-8 h-8 text-harubang-blue" /></div>
              <h3 className="font-bold text-lg mb-2">신뢰 기반</h3>
              <p className="text-sm text-harubang-ink-light">투명한 정보와 전문가의 안목으로 신뢰를 쌓습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">지금 바로 새로운 경험을 시작해보세요</h2>
          <p className="text-harubang-ink-light mb-8">당신에게 꼭 맞는 집이, 당신을 기다리고 있습니다.</p>
          <Link to="/apply" className="bg-harubang-blue text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-harubang-blue-dark transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl inline-block">
            내 집 찾기 신청서 작성하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;