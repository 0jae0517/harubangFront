import axios from 'axios';

// 1. Axios 인스턴스 생성
const apiClient = axios.create({
  // 2. Vite 프록시 설정과 일치하도록 baseURL 설정
  // (이제 apiClient.get('/login')은 '/api/login'으로 요청됩니다)
  baseURL: '/api',
});

// 3. "요청" 인터셉터 (Request Interceptor)
//    모든 API 요청이 서버로 전송되기 전에 이 코드를 거칩니다.
apiClient.interceptors.request.use(
  (config) => {
    // 4. localStorage에서 'accessToken'을 가져옵니다.
    const token = localStorage.getItem('accessToken');

    // 5. 토큰이 존재하면, 모든 요청 헤더(headers)에
    //    Authorization: 'Bearer <토큰값>' 형식으로 토큰을 추가합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 4. "응답" 인터셉터 (Response Interceptor)
//    서버로부터 응답을 받은 직후에 이 코드를 거칩니다.
apiClient.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드일 때:
    // 응답 데이터를 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 2xx 외의 상태 코드일 때 (예: 401, 404, 500 등):
    if (error.response) {
      // 401 (Unauthorized) 에러가 발생한 경우 (예: 토큰 만료)
      if (error.response.status === 401) {
        console.error('인증되지 않은 접근입니다. 로그아웃 처리됩니다.');
        
        // 1. 기존 토큰을 삭제합니다.
        localStorage.removeItem('accessToken');
        
        // 2. 로그인 페이지 (홈)로 리디렉션합니다.
        //    (location.href를 사용하면 App.tsx의 상태와 관계없이 즉시 이동)
        location.href = '/'; 
        
        // (필요하다면: "로그인이 만료되었습니다." 알림창 표시)
        // alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;