import React from "react";

const AdminUserManagementPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-harubang-ink mb-6">회원 관리</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-harubang-ink">
          회원 목록 (구현 예정)
        </h2>
        <p className="text-gray-600">
          이곳에 전체 회원 목록(일반, 중개사)을 테이블 형태로 표시하고, 검색,
          필터링, 회원 상태 변경(활성/정지) 등의 기능을 구현할 수 있습니다.
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <p className="font-semibold text-gray-700">추가 기능 아이디어:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            <li>회원 상세 정보 보기 모달</li>
            <li>역할(Role)별 필터링 기능 (일반/중개사)</li>
            <li>회원 강제 탈퇴 기능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
