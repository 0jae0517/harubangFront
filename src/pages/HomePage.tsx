import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, FileText, Smile } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white font-sans text-harubang-ink">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
            <div className="container mx-auto px-6 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
                >
                    신청서만 작성하세요.
                    <br />
                    <span className="text-harubang-blue">나에게 딱 맞는 집</span>이 도착합니다.
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-harubang-ink-light mb-10 max-w-2xl mx-auto"
                >
                    허위 매물, 끝없는 발품은 이제 그만. '하루방'에서 나만의 맞춤 매물을 제안받으세요.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link to="/apply" className="bg-harubang-blue text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-harubang-blue-dark transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl inline-block">
                        내 집 찾기 신청서 작성하기
                    </Link>
                </motion.div>
            </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-harubang-sky py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">하루방, 이렇게 다릅니다</h2>
          <p className="text-harubang-ink-light mb-12">세 단계만으로 집 구하는 스트레스가 사라집니다.</p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <FileText className="w-12 h-12 text-harubang-blue mx-auto mb-4" strokeWidth={1.5}/>
              <h3 className="text-xl font-bold mb-2">1. 맞춤 신청서 작성</h3>
              <p className="text-harubang-ink-light">원하는 모든 조건을 자유롭게, 그리고 자세하게 알려주세요.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <MapPin className="w-12 h-12 text-harubang-blue mx-auto mb-4" strokeWidth={1.5}/>
              <h3 className="text-xl font-bold mb-2">2. 전문가 매물 추천</h3>
              <p className="text-harubang-ink-light">검증된 중개사가 내 조건에 맞는 핵심 매물 1건을 직접 제안합니다.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Smile className="w-12 h-12 text-harubang-blue mx-auto mb-4" strokeWidth={1.5}/>
              <h3 className="text-xl font-bold mb-2">3. 빠르고 편안한 입주</h3>
              <p className="text-harubang-ink-light">마음에 드는 집을 찾았다면, 나머지는 일사천리로 진행됩니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
