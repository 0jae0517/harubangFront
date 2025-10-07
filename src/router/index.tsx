import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import ApplyPage from "../pages/common/ApplyPage";
import HomePage from "../pages/common/HomePage";
import LoginPage from "../pages/common/LoginPage"; // ⬅ 없으면 아래 임시 페이지 생성

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    {
        path: "/apply",
        element: <ProtectedRoute />,                  // 로그인 안 되면 /login 으로
        children: [{ index: true, element: <ApplyPage /> }],
    },
]);
