import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Building, LogOut } from 'lucide-react';
import harubangLogo from '../../assets/logo.png';

// NavLink 활성화 스타일
const getNavStyle = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
            ? 'bg-harubang-blue text-white' 
            : 'text-gray-600 hover:bg-harubang-sky hover:text-harubang-blue'
    }`;

interface AdminLayoutProps {
    onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/'); // 로그아웃 후 홈으로 이동
    }

    return (
        <div className="flex h-screen bg-harubang-sky/50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col flex-shrink-0">
                <div className="h-20 flex items-center justify-center border-b px-4">
                    <Link to="/admin" className="flex items-center gap-2">
                        <img src={harubangLogo} alt="하루방 로고" className="h-8 w-auto" />
                        <span className="text-xl font-bold text-harubang-ink">Admin</span>
                    </Link>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <NavLink to="/admin/dashboard" className={getNavStyle} end><LayoutDashboard size={20} /> 대시보드</NavLink>
                    <NavLink to="/admin/users" className={getNavStyle}><Users size={20} /> 회원 관리</NavLink>
                    <NavLink to="/admin/requests" className={getNavStyle}><FileText size={20} /> 신청서 관리</NavLink>
                    <NavLink to="/admin/properties" className={getNavStyle}><Building size={20} /> 매물 관리</NavLink>
                </nav>
                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600">
                        <LogOut size={20} /> 로그아웃
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
