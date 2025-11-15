import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Edit,
  Trash2,
  Building,
  Banknote,
  Square,
  Bath,
  Home,
} from "lucide-react";
import apiClient from "../../api/apiClient";

interface Property {
  id: number;
  name: string;
  address: string;
  propertyType: string;
  transactionType: string;
  price: string;
  deposit: string;
  monthlyRent: string;
  area: string;
  rooms: number;
  baths: number;
  floor: string;
  description: string;
}

const AgentPropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      console.log("📥 매물 목록 조회 중...");
      const response = await apiClient.get("/properties/my");
      console.log("✅ 매물 목록:", response.data);
      setProperties(response.data);
    } catch (error: any) {
      console.error("❌ 매물 목록 조회 실패:", error);
      alert(error.message || "매물 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: number, propertyName: string) => {
    if (!confirm(`정말 "${propertyName}" 매물을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await apiClient.delete(`/properties/${propertyId}`);
      alert("매물이 삭제되었습니다.");
      fetchMyProperties();
    } catch (error: any) {
      console.error("❌ 매물 삭제 실패:", error);
      alert(error.message || "매물 삭제에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="bg-harubang-sky min-h-full py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-harubang-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">매물 목록을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-harubang-sky min-h-full py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-harubang-ink">
              내 매물 관리
            </h1>
            <p className="text-harubang-ink-light mt-2">
              등록된 매물을 확인하고 관리할 수 있습니다.
            </p>
          </motion.div>
          <Link
            to="/agent/properties/add"
            className="inline-flex items-center gap-2 px-5 py-3 bg-harubang-blue text-white font-bold rounded-lg hover:bg-harubang-blue-dark transition-colors shadow-md"
          >
            <PlusCircle size={20} /> 새 매물 등록하기
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {properties.length > 0 ? (
              properties.map((prop, index) => (
                <motion.li
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-grow">
                      <p className="font-bold text-lg text-harubang-ink">
                        {prop.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {prop.address}
                      </p>
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-harubang-ink-light mt-2">
                        <span className="flex items-center gap-1.5">
                          <Building size={14} /> {prop.propertyType}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Banknote size={14} /> {prop.transactionType} |{" "}
                          {prop.price}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Square size={14} /> {prop.area}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Home size={14} /> 방 {prop.rooms}개
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Bath size={14} /> 욕실 {prop.baths}개
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex items-center gap-3">
                      <button 
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-harubang-blue"
                        onClick={() => alert("수정 기능은 추후 구현 예정입니다.")}
                      >
                        <Edit size={16} /> 수정
                      </button>
                      <button 
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(prop.id, prop.name)}
                      >
                        <Trash2 size={16} /> 삭제
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg font-semibold mb-2">등록된 매물이 없습니다.</p>
                <p className="text-sm">
                  오른쪽 상단의 '새 매물 등록하기' 버튼을 눌러 첫 매물을
                  등록해보세요.
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentPropertiesPage;