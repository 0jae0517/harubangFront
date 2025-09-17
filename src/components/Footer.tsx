import React from 'react';
import { Link } from 'react-router-dom';
import harubangLogo from '../assets/logo.png';
import { Instagram } from 'lucide-react';

// 카카오톡 아이콘은 lucide-react에 없으므로 직접 SVG로 만듭니다.
const KakaoIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 4.6c-6.2 0-11.2 4.2-11.2 9.4 0 3.4 2.2 6.3 5.3 7.9l-1.9 6.8 7.1-3.7c.6 0 1.1.1 1.7.1 6.2 0 11.2-4.2 11.2-9.4S22.2 4.6 16 4.6z" />
    </svg>
);

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-100">
    <div className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-12 gap-8">
        
        {/* 로고 및 설명 */}
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={harubangLogo} alt="하루방 로고" className="h-10 w-auto" />
            </Link>
          <p className="text-sm text-harubang-ink-light pr-4">
            신청서 하나로 완성되는 <br /> 나만의 부동산 매칭 서비스
          </p>
        </div>

        {/* 네비게이션 링크 */}
        <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
                <h4 className="font-bold text-harubang-ink mb-4 tracking-wider">서비스</h4>
                <ul className="space-y-3 text-sm text-harubang-ink-light">
                    <li><Link to="/about" className="hover:text-harubang-blue transition-colors">서비스 소개</Link></li>
                    <li><Link to="/apply" className="hover:text-harubang-blue transition-colors">신청서 작성</Link></li>
                    <li><Link to="/faq" className="hover:text-harubang-blue transition-colors">FAQ</Link></li>
                </ul>
            </div>
             <div>
                <h4 className="font-bold text-harubang-ink mb-4 tracking-wider">고객지원</h4>
                <ul className="space-y-3 text-sm text-harubang-ink-light">
                    <li><Link to="/terms" className="hover:text-harubang-blue transition-colors">이용약관</Link></li>
                    <li><Link to="/privacy" className="hover:text-harubang-blue transition-colors">개인정보처리방침</Link></li>
                </ul>
            </div>
        </div>

        {/* SNS 아이콘 */}
        <div className="md:col-span-3">
            <h4 className="font-bold text-harubang-ink mb-4 tracking-wider">Follow Us</h4>
            <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/harubang_official?igsh=MWg5Nm1uN2lrcjltZQ==" target="_blank" rel="noopener noreferrer" className="text-harubang-ink-light hover:text-black transition-colors" aria-label="Instagram">
                    <Instagram size={24} />
                </a>
                <a href="http://pf.kakao.com/_xhvRUn" target="_blank" rel="noopener noreferrer" className="text-harubang-ink-light hover:text-black transition-colors" aria-label="Kakao Talk">
                    <KakaoIcon />
                </a>
            </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="mt-16 pt-8 border-t border-gray-100 text-sm text-gray-400">
        <p className="mb-1">(주)하루방 | 대표: 유승현 | 사업자등록번호: -</p>
        <p>&copy; {new Date().getFullYear()} Harubang Inc. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;