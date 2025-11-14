import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react";
import { useAppContext } from "../../store/AppContext";

const TOTAL_STEPS = 4;

const locationData = [
  {
    sido: "서울특별시",
    sigungu: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    sido: "경기도",
    sigungu: [
      "수원시",
      "용인시",
      "성남시",
      "부천시",
      "화성시",
      "안산시",
      "안양시",
      "평택시",
      "시흥시",
      "김포시",
      "광주시",
      "광명시",
      "군포시",
      "하남시",
      "오산시",
      "이천시",
      "안성시",
      "의왕시",
      "양평군",
      "여주시",
      "과천시",
    ],
  },
];

interface FormData {
  propertyType: "아파트" | "오피스텔" | "빌라" | "원룸" | "";
  transactionType: "전세" | "월세" | "매매" | "";
  location: string;
  deposit: string;
  rent: string;
  details: string;
}

interface StepProps {
  data: Partial<FormData>;
  updateData: (fields: Partial<FormData>) => void;
}

const ApplyPage: React.FC = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    transactionType: "",
    location: "",
    deposit: "",
    rent: "",
    details: "",
  });
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateData = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleSubmit = () => {
    if (
      !formData.propertyType ||
      !formData.transactionType ||
      !formData.location ||
      !formData.deposit
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    dispatch({
      type: "ADD_REQUEST",
      payload: {
        customerName: "새로운 고객",
        propertyType: formData.propertyType,
        transactionType: formData.transactionType,
        location: formData.location,
        deposit: formData.deposit,
        rent: formData.rent,
        details: formData.details,
      },
    });

    alert("신청서가 성공적으로 제출되었습니다!");
    navigate("/mypage");
  };

  const steps = [
    <Step1 key={1} data={formData} updateData={updateData} />,
    <Step2
      key={2}
      data={formData}
      updateData={updateData}
      onModalOpen={() => setIsLocationModalOpen(true)}
    />,
    <Step3 key={3} data={formData} updateData={updateData} />,
    <Step4 key={4} data={formData} updateData={updateData} />,
  ];

  return (
    <>
      <div className="bg-harubang-sky min-h-full flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-harubang-blue">
                신청서 작성
              </span>
              <span className="text-sm text-harubang-ink-light">
                {currentStep} / {TOTAL_STEPS}
              </span>
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
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md hover:shadow-lg transition-all"
              >
                신청서 제출하기 <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(location) => {
          updateData({ location });
          setIsLocationModalOpen(false);
        }}
      />
    </>
  );
};

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
}
const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [selectedSido, setSelectedSido] = useState(locationData[0].sido);
  const selectedSigunguList =
    locationData.find((d) => d.sido === selectedSido)?.sigungu || [];

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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">희망 지역 선택</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex h-96 border rounded-lg">
              <ul className="w-1/3 border-r overflow-y-auto">
                {locationData.map((item) => (
                  <li key={item.sido}>
                    <button
                      onClick={() => setSelectedSido(item.sido)}
                      className={`w-full text-left p-4 text-sm transition-colors ${selectedSido === item.sido ? "bg-harubang-sky font-bold text-harubang-blue" : "hover:bg-gray-50"}`}
                    >
                      {item.sido}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="w-2/3 overflow-y-auto">
                {selectedSigunguList.map((sigungu) => (
                  <li key={sigungu}>
                    <button
                      onClick={() => onSelect(`${selectedSido} ${sigungu}`)}
                      className="w-full text-left p-4 text-sm hover:bg-harubang-sky/50 transition-colors"
                    >
                      {sigungu}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Step1: React.FC<StepProps> = ({ data, updateData }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2">어떤 집을 찾으시나요?</h2>
    <p className="text-harubang-ink-light mb-6">
      찾으시는 매물의 종류와 거래 유형을 선택해주세요.
    </p>
    <div className="space-y-6">
      <div>
        <label className="font-semibold text-harubang-ink">매물 종류</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {["아파트", "오피스텔", "빌라", "원룸"].map((type) => (
            <button
              key={type}
              onClick={() =>
                updateData({ propertyType: type as FormData["propertyType"] })
              }
              className={`p-4 rounded-lg border-2 text-center transition-colors ${data.propertyType === type ? "bg-harubang-sky border-harubang-blue text-harubang-blue font-bold" : "border-gray-200 hover:border-harubang-blue"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="font-semibold text-harubang-ink">거래 유형</label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {["전세", "월세", "매매"].map((type) => (
            <button
              key={type}
              onClick={() =>
                updateData({
                  transactionType: type as FormData["transactionType"],
                })
              }
              className={`p-4 rounded-lg border-2 text-center transition-colors ${data.transactionType === type ? "bg-harubang-sky border-harubang-blue text-harubang-blue font-bold" : "border-gray-200 hover:border-harubang-blue"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);
interface Step2Props extends StepProps {
  onModalOpen: () => void;
}
const Step2: React.FC<Step2Props> = ({ data, updateData, onModalOpen }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2">희망 지역과 예산을 알려주세요.</h2>
    <p className="text-harubang-ink-light mb-6">
      동네 이름이나 지하철 역 이름으로 직접 입력하거나, 지역을 선택해주세요.
    </p>
    <div className="space-y-4">
      <div>
        <label htmlFor="location" className="font-semibold text-harubang-ink">
          희망 지역
        </label>
        <div className="flex items-center gap-2 mt-2">
          <input
            id="location"
            type="text"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            placeholder="예) 서울시 강남구, 강남역 근처"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
          />
          <button
            onClick={onModalOpen}
            className="flex-shrink-0 px-4 py-3 bg-gray-100 font-semibold text-harubang-ink rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            지역 선택
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="deposit" className="font-semibold text-harubang-ink">
            {data.transactionType === "매매" ? "매매가" : "보증금"}
          </label>
          <div className="relative mt-2">
            <input
              id="deposit"
              type="text"
              value={data.deposit}
              onChange={(e) => updateData({ deposit: e.target.value })}
              placeholder="예) 5000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              만원
            </span>
          </div>
        </div>
        {data.transactionType === "월세" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="rent" className="font-semibold text-harubang-ink">
              월세
            </label>
            <div className="relative mt-2">
              <input
                id="rent"
                type="text"
                value={data.rent}
                onChange={(e) => updateData({ rent: e.target.value })}
                placeholder="예) 80"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                만원
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  </div>
);
const Step3: React.FC<StepProps> = ({ data, updateData }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2">
      추가적인 희망 조건을 알려주세요.
    </h2>
    <p className="text-harubang-ink-light mb-6">
      반려동물, 주차, 채광 등 원하는 모든 것을 자유롭게 적어주세요.
    </p>
    <div>
      <label htmlFor="details" className="font-semibold text-harubang-ink">
        상세 요청사항
      </label>
      <textarea
        id="details"
        rows={8}
        value={data.details}
        onChange={(e) => updateData({ details: e.target.value })}
        placeholder="예) 1. 강남역 도보 10분 이내였으면 좋겠어요.&#10;2. 반려동물을 키우고 있어서 동거 가능해야 해요.&#10;3. 채광이 좋은 남향집을 선호합니다."
        className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue"
      ></textarea>
    </div>
  </div>
);
const Step4: React.FC<StepProps> = ({ data }) => (
  <div>
    <h2 className="text-2xl font-bold mb-2">거의 다 왔어요!</h2>
    <p className="text-harubang-ink-light mb-6">
      작성하신 내용을 마지막으로 확인하고 제출해주세요.
    </p>
    <div className="space-y-4 bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between">
        <span className="text-gray-500">매물 종류</span>
        <span className="font-semibold">{data.propertyType}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">거래 유형</span>
        <span className="font-semibold">{data.transactionType}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">희망 지역</span>
        <span className="font-semibold">{data.location}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">
          {data.transactionType === "매매" ? "매매가" : "보증금"}
        </span>
        <span className="font-semibold">{data.deposit}만원</span>
      </div>
      {data.transactionType === "월세" && (
        <div className="flex justify-between">
          <span className="text-gray-500">월세</span>
          <span className="font-semibold">{data.rent}만원</span>
        </div>
      )}
      <div className="pt-2">
        <p className="text-gray-500 mb-2">상세 요청사항</p>
        <p className="whitespace-pre-wrap">{data.details}</p>
      </div>
    </div>
  </div>
);

export default ApplyPage;
