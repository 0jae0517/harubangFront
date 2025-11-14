import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios"; // API 호출용
import Spinner from "./common/Spinner"; // 로딩 스피너

// 백엔드 API 기본 URL (src/.env 파일에서 읽어옴)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// 1. 모달 Props 인터페이스
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginModalOpen: () => void;
}

// 2. 백엔드 API 응답(Item)과 일치하는 프론트엔드용 인터페이스
interface AgentSearchResultItem {
  estblRegNo: string;
  medOfficeNm: string;
  rprsvNm: string; // [수정됨]
  lctnRoadNmAddr: string;
}

// 3. 비밀번호 유효성 검사 함수 (_ 포함)
const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-_])(?=.*[0-9]).{8,25}$/;
  return passwordRegex.test(password);
};

// 4. 메인 컴포넌트
const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  onLoginModalOpen,
}) => {
  const [userType, setUserType] = useState<"customer" | "agent">("customer"); // 폼 입력 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 에러 메시지 상태
  const [formError, setFormError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState(""); // 휴대폰 인증 상태

  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(180); // 중개사 검색/선택 상태
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AgentSearchResultItem[]>(
    [],
  );
  const [selectedAgent, setSelectedAgent] =
    useState<AgentSearchResultItem | null>(null);
  const [isSearching, setIsSearching] = useState(false); // 검색 API 호출 중 로딩
  // userType이 바뀌거나 모달이 열릴 때 모든 상태 초기화

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setFormError("");
    setPasswordError("");
    setPasswordConfirmError("");
    setPhone("");
    setAuthCode("");
    setIsCodeSent(false);
    setIsVerified(false);
    setTimer(180);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedAgent(null);
  }, [userType, isOpen]); // 인증 타이머 효과
  useEffect(() => {
    if (isCodeSent && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isCodeSent, timer]); // 디바운싱(Debouncing)을 이용한 자동 검색 기능

  useEffect(() => {
    // [수정 1] searchQuery가 null일 때 .trim() 오류를 방지하기 위해 !searchQuery로 변경
    if (!searchQuery || selectedAgent) {
      setSearchResults([]);
      setIsSearching(false);
      setFormError("");
      return;
    }

    setIsSearching(true);
    setFormError("");

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/agent-licenses/search`,
          {
            params: {
              query: searchQuery,
            },
          },
        );

        if (response.data.length === 0) {
          setFormError("검색 결과가 없습니다.");
        }
        setSearchResults(response.data);
      } catch (err) {
        console.error("Agent search error:", err);
        setFormError("검색 중 오류가 발생했습니다.");
      } finally {
        setIsSearching(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedAgent]); // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setPasswordError("8자 이상, 영문/숫자/특수문자를 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
    if (passwordConfirm && newPassword !== passwordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  }; // 비밀번호 확인 핸들러

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);
    if (password !== newPasswordConfirm) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  }; // [수정] 중개사 선택 함수 (대표자명 설정, 검색창 고정)

  const handleSelectAgent = (agent: AgentSearchResultItem) => {
    setSelectedAgent(agent);
    setSearchResults([]); // [수정] null일 수도 있는 값을 대비하여 || '' (빈 문자열) 처리
    setSearchQuery(agent.estblRegNo || "");
    setName(agent.rprsvNm || ""); // [수정됨]
  }; // 인증번호 요청 핸들러

  const handleRequestAuthCode = () => {
    if (phone.length < 10) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    setIsCodeSent(true);
    setTimer(180);
    alert("인증번호가 발송되었습니다."); // (실제 SMS API 연동 필요)
  }; // 인증번호 확인 핸들러

  const handleConfirmAuthCode = () => {
    if (authCode === "123456") {
      // 임시 인증번호
      setIsVerified(true);
      setIsCodeSent(false);
      alert("인증이 완료되었습니다.");
    } else {
      alert("인증번호가 올바르지 않습니다.");
    }
  }; // 최종 회원가입 핸들러

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmed = password === passwordConfirm;
    if (!isPasswordValid || !isPasswordConfirmed) {
      setFormError("비밀번호를 확인해주세요.");
      return;
    }
    if (userType === "customer" && !isVerified) {
      setFormError("휴대폰 인증을 완료해주세요.");
      return;
    }
    if (userType === "agent" && !selectedAgent) {
      setFormError("소속된 중개사무소를 선택해주세요.");
      return;
    }
    if (userType === "agent" && !isVerified) {
      setFormError("대표자 본인인증을 완료해주세요.");
      return;
    }

    try {
      if (userType === "customer") {
        // 고객 회원가입 API 호출
        await axios.post(`${API_BASE_URL}/api/auth/signup/customer`, {
          email: email,
          password: password,
          name: name,
          phone: phone,
        });
      } else if (userType === "agent" && selectedAgent) {
        // 중개사 회원가입 API 호출 (API DTO 필드명으로 전송)
        await axios.post(`${API_BASE_URL}/api/auth/signup/agent`, {
          email: email,
          password: password,
          name: name, // 대표자명
          phone: phone,
          registrationNumber: selectedAgent.estblRegNo,
          officeName: selectedAgent.medOfficeNm,
          officeAddress: selectedAgent.lctnRoadNmAddr,
        });
      }

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      onClose();
      onLoginModalOpen();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setFormError(err.response.data || "회원가입에 실패했습니다.");
      } else {
        setFormError("회원가입 중 오류가 발생했습니다.");
      }
      console.error("Sign up error:", err);
    }
  }; // 탭 스타일링 함수

  const getTabClassName = (type: "customer" | "agent") => {
    const baseClasses =
      "w-1/2 py-3 text-center text-lg font-bold focus:outline-none transition-colors duration-300";
    if (userType === type) {
      return `${baseClasses} text-harubang-blue border-b-2 border-harubang-blue`;
    }
    return `${baseClasses} text-gray-400 border-b-2 border-gray-200 hover:text-harubang-blue hover:border-harubang-blue/50`;
  }; // 가입 버튼 활성화 조건

  const isCustomerFormValid =
    isVerified &&
    validatePassword(password) &&
    password === passwordConfirm &&
    !passwordError &&
    !passwordConfirmError &&
    email &&
    name;
  const isAgentFormValid =
    !!selectedAgent &&
    isVerified &&
    validatePassword(password) &&
    password === passwordConfirm &&
    !passwordError &&
    !passwordConfirmError &&
    email &&
    name;
  const isSubmitDisabled =
    userType === "customer" ? !isCustomerFormValid : !isAgentFormValid; // [복구] 스타일 정의

  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1"; // JSX 렌더링

  return (
    <AnimatePresence>
           {" "}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                   {" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
          />
                              {" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl z-10 flex flex-col max-h-[90vh]"
          >
                       {" "}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
              aria-label="닫기"
            >
                            {/* [수정 4] SVG viewBox="0 0 24 24"로 수정 */}     
                     {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
                         {" "}
            </button>
                                    {" "}
            <div className="p-8 pb-6 flex-shrink-0">
                             {" "}
              <div className="text-center mb-6">
                                 {" "}
                <h2 className="text-2xl font-bold text-harubang-ink">
                  회원가입
                </h2>
                               {" "}
              </div>
                             {" "}
              <div className="flex">
                                 {" "}
                <button
                  onClick={() => setUserType("customer")}
                  className={getTabClassName("customer")}
                >
                  일반 회원
                </button>
                                 {" "}
                <button
                  onClick={() => setUserType("agent")}
                  className={getTabClassName("agent")}
                >
                  공인중개사 회원
                </button>
                               {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <form
              onSubmit={handleSignUp}
              className="flex-grow flex flex-col overflow-hidden"
            >
                            {/* 스크롤 영역 */}             {" "}
              <div className="overflow-y-auto px-8 pb-6">
                                 {" "}
                {userType === "customer" ? (
                  <div className="space-y-4">
                                              {/* --- 일반 회원 폼 --- */}     
                                       {" "}
                    <div>
                                                 {" "}
                      <label className={labelStyle}>이름</label>               
                                 {" "}
                      <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        required
                        className={inputStyle}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                                               {" "}
                    </div>
                                             {" "}
                    <div>
                                                   {" "}
                      <label className={labelStyle}>휴대폰 번호</label>         
                                         {" "}
                      <div className="flex gap-2">
                                                         {" "}
                        <input
                          type="tel"
                          placeholder="'-' 없이 숫자만 입력"
                          required
                          className={inputStyle}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isVerified}
                        />
                                                         {" "}
                        <button
                          type="button"
                          onClick={handleRequestAuthCode}
                          disabled={isCodeSent || isVerified}
                          className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg text-sm flex-shrink-0 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                                                               {" "}
                          {isVerified ? "인증완료" : "인증요청"}               
                                           {" "}
                        </button>
                                                     {" "}
                      </div>
                                               {" "}
                    </div>
                                             {" "}
                    {isCodeSent && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                                                       {" "}
                        <label className={labelStyle}>인증번호</label>         
                                             {" "}
                        <div className="flex gap-2 relative">
                                                             {" "}
                          <input
                            type="text"
                            placeholder="인증번호 6자리 입력"
                            required
                            className={inputStyle}
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                          />
                                                             {" "}
                          <span className="absolute right-28 top-1/2 -translate-y-1/2 text-sm text-red-500">{`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`}</span>
                                                             {" "}
                          <button
                            type="button"
                            onClick={handleConfirmAuthCode}
                            className="bg-harubang-blue text-white font-semibold px-4 rounded-lg text-sm flex-shrink-0 hover:bg-harubang-blue-dark"
                          >
                            확인
                          </button>
                                                         {" "}
                        </div>
                                                   {" "}
                      </motion.div>
                    )}
                                             {" "}
                    <div>
                                                 {" "}
                      <label className={labelStyle}>이메일</label>             
                                   {" "}
                      <input
                        type="email"
                        placeholder="이메일 주소를 입력하세요"
                        required
                        className={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                                               {" "}
                    </div>
                                             {" "}
                    <div>
                                                   {" "}
                      <label className={labelStyle}>비밀번호</label>           
                                       {" "}
                      <input
                        type="password"
                        placeholder="8자 이상, 영문/숫자/특수문자 조합"
                        required
                        className={inputStyle}
                        value={password}
                        onChange={handlePasswordChange}
                      />
                                                   {" "}
                      {passwordError && (
                        <p className="text-red-500 text-xs mt-1">
                          {passwordError}
                        </p>
                      )}
                                         {" "}
                    </div>
                                             {" "}
                    <div>
                                                   {" "}
                      <label className={labelStyle}>비밀번호 확인</label>       
                                           {" "}
                      <input
                        type="password"
                        placeholder="비밀번호를 다시 한번 입력하세요"
                        required
                        className={inputStyle}
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                      />
                                                   {" "}
                      {passwordConfirmError && (
                        <p className="text-red-500 text-xs mt-1">
                          {passwordConfirmError}
                        </p>
                      )}
                                               {" "}
                    </div>
                                         {" "}
                  </div>
                ) : (
                  <div className="space-y-4">
                                               {/* --- 중개사 회원 폼 --- */}   
                                           {" "}
                    <h3 className="font-semibold text-gray-800 border-b pb-2">
                      1. 중개사무소 검색
                    </h3>
                                               {" "}
                    <div>
                                                     {" "}
                      <label className={labelStyle}>중개등록번호</label>       
                                             {" "}
                      <div className="flex gap-2">
                                                           {" "}
                        <input
                          type="search"
                          placeholder="'-' 을 포함한 중개등록번호 전체"
                          className={inputStyle} // [수정 2] value={searchQuery || ''}로 '제어/비제어' 오류 수정
                          value={searchQuery || ""}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          disabled={!!selectedAgent}
                        />
                                                           {" "}
                        <span className="bg-gray-100 text-gray-400 p-3 rounded-lg flex-shrink-0">
                                                                 {" "}
                          <Search size={20} />                                 
                           {" "}
                        </span>
                                                     {" "}
                      </div>
                                                 {" "}
                    </div>
                                                                            {" "}
                    {isSearching && (
                      <div className="flex justify-center py-4">
                        <Spinner />
                      </div>
                    )}
                                                {/* 검색 결과 리스트 */}       
                                       {" "}
                    {searchResults.length > 0 && (
                      <ul className="border rounded-lg max-h-40 overflow-y-auto">
                                                           {" "}
                        {searchResults.map(
                          (
                            agent, // [수정 3] React 경고를 없애기 위해 key prop 추가
                          ) => (
                            <li
                              key={agent.estblRegNo}
                              onClick={() => handleSelectAgent(agent)}
                              className="p-3 hover:bg-harubang-sky/50 cursor-pointer border-b last:border-b-0"
                            >
                                                                         {" "}
                              <p className="font-semibold">
                                {agent.medOfficeNm}
                              </p>
                                                                         {" "}
                              <p className="text-sm text-gray-500">
                                {agent.lctnRoadNmAddr} | 대표: {agent.rprsvNm}
                              </p>
                                                             {" "}
                            </li>
                          ),
                        )}
                                                       {" "}
                      </ul>
                    )}
                                                {/* 선택된 중개사 정보 */}     
                                         {" "}
                    {selectedAgent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                                                           
                        <p className="font-bold text-green-800">
                          {selectedAgent.medOfficeNm} | 대표:{" "}
                          {selectedAgent.rprsvNm}
                        </p>
                                                     {" "}
                        <p className="text-sm text-green-700">
                          {selectedAgent.lctnRoadNmAddr}
                        </p>
                                                           {" "}
                        <button
                          onClick={() => {
                            setSelectedAgent(null);
                            setIsVerified(false);
                            setPhone("");
                            setName("");
                            setEmail("");
                            setPassword("");
                            setPasswordConfirm("");
                            setSearchQuery(""); // 검색창 초기화
                          }}
                          className="text-xs text-red-500 hover:underline mt-1"
                        >
                          다시 검색
                        </button>
                                                       {" "}
                      </motion.div>
                    )}
                                               {" "}
                    {/* 2단계, 3단계 폼 (selectedAgent가 있을 때만 보임) */}   
                                           {" "}
                    {selectedAgent && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                                                           {" "}
                        <h3 className="font-semibold text-gray-800 border-b pb-2 pt-4">
                          2. 대표자 본인인증
                        </h3>
                                                           {" "}
                        <div>
                                                                 {" "}
                          <label className={labelStyle}>대표자명</label>       
                                                         {" "}
                          <input
                            type="text"
                            value={name}
                            required
                            className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                            readOnly
                          />
                                                             {" "}
                        </div>
                                                           {" "}
                        <div>
                                                                 {" "}
                          <label className={labelStyle}>휴대폰 번호</label>     
                                                           {" "}
                          <div className="flex gap-2">
                                                                       {" "}
                            <input
                              type="tel"
                              placeholder="'-' 없이 숫자만 입력"
                              required
                              className={inputStyle}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              disabled={isVerified}
                            />
                                                                       {" "}
                            <button
                              type="button"
                              onClick={handleRequestAuthCode}
                              disabled={isCodeSent || isVerified}
                              className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-lg text-sm flex-shrink-0 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                                                 {" "}
                              {isVerified ? "인증완료" : "인증요청"}           
                                                             {" "}
                              {/* [오류 수정 1] 446라인의 잘못된 텍스트 삭제 */}
                                                                         {" "}
                            </button>
                                                                   {" "}
                          </div>
                                                             {" "}
                        </div>
                                                           {" "}
                        {isCodeSent && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-2"
                          >
                                                                       {" "}
                            <label className={labelStyle}>인증번호</label>     
                                                                 {" "}
                            <div className="flex gap-2 relative">
                                                                             {" "}
                              <input
                                type="text"
                                placeholder="인증번호 6자리 입력"
                                required
                                className={inputStyle}
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                              />
                                                                             {" "}
                              <span className="absolute right-28 top-1/2 -translate-y-1/2 text-sm text-red-500">{`${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`}</span>
                                                                             {" "}
                              <button
                                type="button"
                                onClick={handleConfirmAuthCode}
                                className="bg-harubang-blue text-white font-semibold px-4 rounded-lg text-sm flex-shrink-0 hover:bg-harubang-blue-dark"
                              >
                                확인
                              </button>
                                                                         {" "}
                            </div>
                                                                   {" "}
                          </motion.div>
                        )}
                                                           {" "}
                        <h3 className="font-semibold text-gray-800 border-b pb-2 pt-4">
                          3. 계정 정보 생성
                        </h3>
                                                           {" "}
                        <div>
                                                                 {" "}
                          <label className={labelStyle}>이메일 (아이디)</label> 
                                                   {" "}
                          <input
                            type="email"
                            placeholder="사용하실 이메일 주소를 입력하세요"
                            required
                            className={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                                                     {" "}
                        </div>
                                                           {" "}
                        <div>
                                                                 {" "}
                          <label className={labelStyle}>비밀번호</label>       
                                                         {" "}
                          <input
                            type="password"
                            placeholder="8자 이상, 영문/숫자/특수문자 조합"
                            required
                            className={inputStyle}
                            value={password}
                            onChange={handlePasswordChange}
                          />
                                                       {" "}
                          {passwordError && (
                            <p className="text-red-500 text-xs mt-1">
                              {passwordError}
                            </p>
                          )}
                                                             {" "}
                        </div>
                                                           {" "}
                        <div>
                                                                 {" "}
                          <label className={labelStyle}>비밀번호 확인</label>   
                                                             {" "}
                          <input
                            type="password"
                            placeholder="비밀번호를 다시 한번 입력하세요"
                            required
                            className={inputStyle}
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                          />
                                                                 {" "}
                          {passwordConfirmError && (
                            <p className="text-red-500 text-xs mt-1">
                              {passwordConfirmError}
                            </p>
                          )}
                                                             {" "}
                        </div>
                                                       {" "}
                      </motion.div>
                    )}
                                           
                  </div>
                )}
                                 {" "}
                {/* [오류 수정 2] 492라인의 불필요한 '}' 삭제 */}           
                 {" "}
              </div>
                            {/* 하단 버튼 영역 */}             {" "}
              <div className="p-8 pt-6 mt-auto border-t">
                               {" "}
                {formError && (
                  <div className="text-red-500 text-sm text-center mb-4">
                                      {formError}                   {" "}
                  </div>
                )}
                               {" "}
                <div>
                                     {" "}
                  <label className="flex items-center gap-2 text-xs text-gray-500">
                    <input
                      type="checkbox"
                      required
                      className="rounded border-gray-300 text-harubang-blue focus:ring-harubang-blue"
                    />{" "}
                    <span>
                      (필수) 서비스 이용약관 및 개인정보처리방침에 동의합니다.
                    </span>
                  </label>
                                 {" "}
                </div>
                               {" "}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full bg-harubang-blue text-white font-bold py-3 rounded-lg hover:bg-harubang-blue-dark transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    가입하기
                  </button>
                </div>
                             {" "}
              </div>
                         {" "}
            </form>
                                 {" "}
          </motion.div>
                 {" "}
        </div>
      )}
         {" "}
    </AnimatePresence>
  );
};

export default SignUpModal;
