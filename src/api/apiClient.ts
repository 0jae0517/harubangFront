import axios from "axios";

// 1. Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor (요청 전)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    // 로그인/회원가입 요청에는 토큰을 보내지 않음
    const isAuthRequest =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/signup");

    if (token && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (응답 후)
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답 (2xx)

    // ApiResponse 구조 체크
    if (
      response.data &&
      typeof response.data === "object" &&
      "success" in response.data
    ) {
      // success가 false인 경우
      if (response.data.success === false) {
        const error = new Error(
          response.data.message || "요청 처리에 실패했습니다."
        );
        return Promise.reject(error);
      }

      // success가 true인 경우 - data 필드만 추출
      return {
        ...response,
        data: response.data.data,
      };
    }

    // ApiResponse 구조가 아닌 경우 그대로 반환
    return response;
  },
  (error) => {
    // 에러 응답 (4xx, 5xx)

    console.error("API Error:", error);

    // 응답이 있는 경우
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // 401 Unauthorized (인증 실패)
      if (status === 401) {
        console.error("인증되지 않은 접근입니다.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");

        // 로그인 페이지가 아닌 경우에만 리다이렉트
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/";
        }
      }

      // 403 Forbidden (권한 없음)
      if (status === 403) {
        console.error("접근 권한이 없습니다.");
      }

      // 백엔드에서 ApiResponse 형태로 에러를 보낸 경우
      if (data && typeof data === "object") {
        if (data.message) {
          const errorMessage = data.message;
          const customError = new Error(errorMessage);
          // @ts-ignore
          customError.response = error.response;
          return Promise.reject(customError);
        }
      }

      // 일반적인 HTTP 에러
      const statusMessages: { [key: number]: string } = {
        400: "잘못된 요청입니다.",
        401: "인증이 필요합니다.",
        403: "접근 권한이 없습니다.",
        404: "요청한 리소스를 찾을 수 없습니다.",
        500: "서버 오류가 발생했습니다.",
        502: "게이트웨이 오류가 발생했습니다.",
        503: "서비스를 사용할 수 없습니다.",
      };

      const message =
        statusMessages[status] || `오류가 발생했습니다. (${status})`;
      const customError = new Error(message);
      // @ts-ignore
      customError.response = error.response;
      return Promise.reject(customError);
    }

    // 응답이 없는 경우 (네트워크 에러 등)
    if (error.request) {
      const networkError = new Error(
        "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
      );
      return Promise.reject(networkError);
    }

    // 그 외의 에러
    return Promise.reject(error);
  }
);

export default apiClient;
