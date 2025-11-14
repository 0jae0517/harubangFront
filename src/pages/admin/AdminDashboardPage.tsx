import React from "react";
import { Users, FileText, Building } from "lucide-react";
import { useAppContext } from "../../store/AppContext";

const AdminDashboardPage: React.FC = () => {
  const { state } = useAppContext();

  // 실제로는 API를 통해 데이터를 가져와야 합니다.
  const totalUsers = 150; // 가상 데이터 (customer + agent)
  const totalRequests = state.requests.length;
  const totalProperties = state.properties.length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-harubang-ink mb-6">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 총 회원 수 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105">
          <div className="bg-blue-100 p-4 rounded-full">
            <Users className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">총 회원 수</p>
            <p className="text-2xl font-bold text-harubang-ink">
              {totalUsers}명
            </p>
          </div>
        </div>
        {/* 총 신청서 수 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105">
          <div className="bg-green-100 p-4 rounded-full">
            <FileText className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">누적 신청서</p>
            <p className="text-2xl font-bold text-harubang-ink">
              {totalRequests}건
            </p>
          </div>
        </div>
        {/* 총 매물 수 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105">
          <div className="bg-purple-100 p-4 rounded-full">
            <Building className="text-purple-600" size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">등록된 매물</p>
            <p className="text-2xl font-bold text-harubang-ink">
              {totalProperties}건
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-harubang-ink">
          최근 활동 (구현 예정)
        </h2>
        <p className="text-gray-600">
          이곳에 최근 가입한 회원 목록이나, 새로 등록된 신청서 목록 등을
          동적으로 표시할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
