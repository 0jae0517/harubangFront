import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
    const authed = !!localStorage.getItem("access_token");
    const loc = useLocation();
    return authed ? <Outlet/> : <Navigate to="/login" replace state={{ from: loc }} />;
}
