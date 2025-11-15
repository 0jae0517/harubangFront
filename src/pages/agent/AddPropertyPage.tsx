import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building,
  Banknote,
  Text,
  Save,
  ArrowLeft,
  Square,
  Bath,
  Home,
} from "lucide-react";
import apiClient from "../../api/apiClient";

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    propertyType: "아파트",
    transactionType: "전세",
    address: "",
    deposit: "",
    rent: "",
    area: "",
    rooms: 0,
    baths: 0,
    floor: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("📤 매물 등록 요청:", formData);
      
      const response = await apiClient.post("/properties", formData);
      
      console.log("✅ 매물 등록 성공:", response.data);
      
      alert("새로운 매물이 성공적으로 등록되었습니다.");
      navigate("/agent/properties");
    } catch (error: any) {
      console.error("❌ 매물 등록 실패:", error);
      alert(error.message || "매물 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rooms" || name === "baths" ? parseInt(value) || 0 : value,
    }));
  };

  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const sectionTitleStyle =
    "text-xl font-semibold flex items-center gap-3 mb-4 text-harubang-ink";

  return (
    <div className="bg-harubang-sky min-h-full py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/agent/properties"
            className="inline-flex items-center gap-2 text-harubang-ink-light hover:text-harubang-blue mb-6"
          >
            <ArrowLeft size={18} /> 매물 목록으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-harubang-ink">새 매물 등록</h1>
          <p className="text-harubang-ink-light mt-2">
            보유하고 있는 매물의 상세 정보를 입력해주세요.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-white rounded-xl shadow-md p-8 space-y-8"
        >
          <div className="border-b pb-8">
            <h2 className={sectionTitleStyle}>
              <Building size={22} /> 기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>매물 종류</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option>아파트</option>
                  <option>오피스텔</option>
                  <option>빌라</option>
                  <option>원룸</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>거래 종류</label>
                <select
                  name="transactionType"
                  value={formData.transactionType}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option>전세</option>
                  <option>월세</option>
                  <option>매매</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className={labelStyle}>주소</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="예) 서울특별시 강남구 역삼동 123-45 래미안아파트 101동 502호"
                required
                className={inputStyle}
              />
            </div>
          </div>

          <div className="border-b pb-8">
            <h2 className={sectionTitleStyle}>
              <Banknote size={22} /> 가격 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>
                  {formData.transactionType === "매매" ? "매매가" : "보증금"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    placeholder="5000"
                    required
                    className={inputStyle}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    만원
                  </span>
                </div>
              </div>
              {formData.transactionType === "월세" && (
                <div>
                  <label className={labelStyle}>월세</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="rent"
                      value={formData.rent}
                      onChange={handleChange}
                      placeholder="80"
                      className={inputStyle}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      만원
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-b pb-8">
            <h2 className={sectionTitleStyle}>
              <Home size={22} /> 매물 상세
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className={labelStyle}>전용 면적</label>
                <div className="relative">
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="84"
                    required
                    className={inputStyle}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ㎡
                  </span>
                </div>
              </div>
              <div>
                <label className={labelStyle}>방 개수</label>
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder="3"
                  required
                  min="0"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>욕실 개수</label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  placeholder="2"
                  required
                  min="0"
                  className={inputStyle}
                />
              </div>
              <div>
                <label className={labelStyle}>해당 층</label>
                <input
                  type="text"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="5"
                  required
                  className={inputStyle}
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-8">
            <h2 className={sectionTitleStyle}>
              <Text size={22} /> 상세 설명
            </h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="매물의 특징과 장점을 자세하게 설명해주세요. (예: 역세권, 남향, 시스템에어컨 완비, 리모델링 완료 등)"
              required
              className={inputStyle}
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/agent/properties"
              className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-harubang-blue hover:bg-harubang-blue-dark flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save size={16} /> 매물 저장하기
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddPropertyPage;