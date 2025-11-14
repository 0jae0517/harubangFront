import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Building,
  Banknote,
  Home,
  MessageSquare,
} from "lucide-react";
import SelectPropertyModal from "../../components/SelectPropertyModal";
import { useAppContext } from "../../store/AppContext"; // useAppContext import

const RequestDetailPage: React.FC = () => {
  const { state, dispatch } = useAppContext(); // dispatch 함수도 가져옵니다.
  const { requestId } = useParams();
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  // 이제 중앙 저장소에서 현재 요청서 정보를 찾습니다.
  const requestDetails = state.requests.find((r) => r.id === Number(requestId));

  const handlePropose = (propertyId: number) => {
    if (!requestDetails) return;

    // 중앙 저장소에 ADD_PROPOSAL 액션을 전달합니다.
    dispatch({
      type: "ADD_PROPOSAL",
      payload: {
        requestId: requestDetails.id,
        propertyId: propertyId,
        agentName: "친절한 하루방 공인중개사", // 실제로는 로그인된 중개사 정보
      },
    });

    alert(`신청서 ID ${requestId}에 매물 ID ${propertyId}을(를) 제안했습니다!`);
    setIsSelectModalOpen(false);
  };

  if (!requestDetails) {
    return (
      <div className="p-8 text-center">요청서 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <>
      <div className="bg-harubang-sky min-h-full py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/agent/dashboard"
              className="inline-flex items-center gap-2 text-harubang-ink-light hover:text-harubang-blue mb-6"
            >
              <ArrowLeft size={18} /> 목록으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-harubang-ink">
              고객 신청서 상세 정보
            </h1>
            <p className="text-harubang-ink-light mt-2">
              {requestDetails.date}에 등록된 신청서입니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white rounded-xl shadow-md p-8"
          >
            {/* ... 상세 정보 UI ... (이제 requestDetails에서 데이터를 가져옵니다) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <User size={24} className="text-harubang-blue" />
                <div>
                  <p className="text-sm text-gray-500">신청자</p>
                  <p className="font-semibold text-lg">
                    {requestDetails.customerName}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Building size={24} className="text-harubang-blue" />
                  <div>
                    <p className="text-sm text-gray-500">희망 매물</p>
                    <p className="font-semibold text-lg">
                      {requestDetails.propertyType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Home size={24} className="text-harubang-blue" />
                  <div>
                    <p className="text-sm text-gray-500">거래 종류</p>
                    <p className="font-semibold text-lg">
                      {requestDetails.transactionType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Banknote size={24} className="text-harubang-blue" />
                  <div>
                    <p className="text-sm text-gray-500">예산</p>
                    <p className="font-semibold text-lg">
                      {requestDetails.deposit}{" "}
                      {requestDetails.rent ? `/ ${requestDetails.rent}` : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">상세 요청사항</p>
                <p className="bg-gray-50 p-4 rounded-md text-gray-700 leading-relaxed">
                  {requestDetails.details}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t flex justify-end">
              <button
                onClick={() => setIsSelectModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-harubang-blue text-white font-bold rounded-lg hover:bg-harubang-blue-dark transition-colors shadow-md"
              >
                <MessageSquare size={18} /> 이 고객에게 매물 제안하기
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <SelectPropertyModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onPropose={handlePropose}
      />
    </>
  );
};

export default RequestDetailPage;
