import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
    withCredentials: false,
});

// 요청마다 토큰 자동 첨부 (config.headers 대신 defaults 사용)
http.interceptors.request.use(
    (cfg) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            // 토큰 없으면 기본값 제거(선택)
            delete http.defaults.headers.common["Authorization"];
        }
        return cfg;
    },
    (err) => Promise.reject(err)
);

export default http;

// 디버그(선택)
console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL ?? "/api");
