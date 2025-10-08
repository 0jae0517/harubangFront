import { useEffect, useState } from "react";
import { signup } from "../api/auth";

type SignUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginModalOpen: () => void;
};

export default function SignUpModal({
                                      isOpen,
                                      onClose,
                                      onLoginModalOpen,
                                    }: SignUpModalProps) {
  // ✅ 상태 선언 (타입은 useState 제네릭으로만 지정)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [sendingVerify, setSendingVerify] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Hook은 return 위에 와야 함!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verified = params.get("verified");
    const emailParam = params.get("email");
    if (verified === "1" && emailParam) {
      setEmail(emailParam);
      setEmailVerified(true);
    }
  }, []);

  const isValidEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  // ✅ 인증메일 요청
  const handleRequestVerify = async () => {
    if (!isValidEmail(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    try {
      setSendingVerify(true);
      const res = await fetch("/api/auth/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        alert("인증메일을 보냈습니다. 메일함(스팸함 포함)을 확인해 주세요!");
      } else {
        const text = await res.text();
        alert(`인증메일 요청 실패: ${text || "잠시 후 다시 시도해주세요."}`);
      }
    } catch {
      alert("네트워크 오류로 인증메일 요청에 실패했습니다.");
    } finally {
      setSendingVerify(false);
    }
  };

  const validate = () => {
    if (!email || !name || !password || !passwordConfirm) {
      setError("모든 항목을 입력해주세요.");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return false;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setError(null);
    return true;
  };

  // ✅ 회원가입 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await signup({ email, name, password });
      alert("가입이 완료되었습니다. 로그인해 주세요!");
      onClose();
      onLoginModalOpen();
    } catch {
      setError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const clearAndClose = () => {
    setEmail("");
    setName("");
    setPassword("");
    setPasswordConfirm("");
    setError(null);
    setEmailVerified(false);
    onClose();
  };

  // ✅ 이제 return
  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={clearAndClose} />

        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">회원가입</h2>
            <button
                onClick={clearAndClose}
                className="rounded px-2 py-1 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* 이메일 */}
            <div>
              <label className="mb-1 block text-sm">이메일</label>
              <div className="flex gap-2">
                <input
                    type="email"
                    className="flex-1 rounded border px-3 py-2 outline-none focus:ring"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={emailVerified}
                />
                <button
                    type="button"
                    onClick={handleRequestVerify}
                    disabled={!email || sendingVerify || emailVerified}
                    className={`whitespace-nowrap rounded px-3 py-2 text-sm ${
                        emailVerified
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-black"
                    } disabled:opacity-60`}
                >
                  {emailVerified
                      ? "인증완료"
                      : sendingVerify
                          ? "보내는 중..."
                          : "인증메일 보내기"}
                </button>
              </div>
            </div>

            {/* 이름 */}
            <div>
              <label className="mb-1 block text-sm">이름</label>
              <input
                  className="w-full rounded border px-3 py-2 outline-none focus:ring"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  disabled={!emailVerified}
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="mb-1 block text-sm">비밀번호</label>
              <input
                  type="password"
                  className="w-full rounded border px-3 py-2 outline-none focus:ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  disabled={!emailVerified}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="mb-1 block text-sm">비밀번호 확인</label>
              <input
                  type="password"
                  className="w-full rounded border px-3 py-2 outline-none focus:ring"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  placeholder="비밀번호 재입력"
                  disabled={!emailVerified}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={!emailVerified || submitting}
                className={`mt-2 w-full rounded-xl px-4 py-2 font-semibold text-white ${
                    emailVerified
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-300 cursor-not-allowed"
                } disabled:opacity-60`}
            >
              {submitting ? "가입 중..." : "가입하기"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <button
                onClick={() => {
                  onClose();
                  onLoginModalOpen();
                }}
                className="font-semibold text-blue-600 underline"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
  );
}
