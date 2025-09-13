import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-harubang-sky border-t border-gray-200">
    <div className="container mx-auto px-6 py-8 text-center text-harubang-ink-light text-sm">
      <p>&copy; {new Date().getFullYear()} 하루방. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="#" className="hover:text-harubang-blue">이용약관</a>
        <a href="#" className="hover:text-harubang-blue">개인정보처리방침</a>
      </div>
    </div>
  </footer>
);

export default Footer;

