import http from "./http";

// ===== 타입 정의 =====
export type LoginRequest = { email: string; password: string };
export type SignupRequest = { email: string; name: string; password: string };

// ===== 로그인 =====
export async function login(body: LoginRequest) {
    const { data } = await http.post<{ accessToken: string }>("/api/auth/login", body);
    localStorage.setItem("access_token", data.accessToken);
    return data;
}

// ===== 회원가입 =====
// 회원가입 성공 시 서버가 이메일 인증 메일을 보냄
export async function signup(body: SignupRequest) {
    await http.post("/api/auth/signup", body);
    alert("입력하신 이메일로 인증 링크를 보냈습니다. 이메일을 확인해주세요!");
}

// ===== 이메일 인증 =====
// 이메일로 받은 토큰을 검증
export async function verifyEmail(token: string) {
    const { data } = await http.get("/api/auth/verify", { params: { token } });
    return data; // "이메일 인증 완료" 메시지
}

// ===== 로그아웃 =====
export function logout() {
    localStorage.removeItem("access_token");
}

// ===== 로그인 여부 확인 =====
export function isAuthed() {
    return !!localStorage.getItem("access_token");
}
