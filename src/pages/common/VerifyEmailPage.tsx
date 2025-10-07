import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
    const [search] = useSearchParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState("인증 처리 중...");
    const [ok, setOk] = useState<boolean | null>(null);

    useEffect(() => {
        const token = search.get("token");
        if (!token) {
            setOk(false);
            setMsg("유효하지 않은 요청입니다. 토큰이 없습니다.");
            return;
        }

        (async () => {
            try {
                const res = await fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`);
                const text = await res.text();
                if (!res.ok) throw new Error(text || "인증 실패");
                setOk(true);
                setMsg(text || "인증이 완료되었습니다. 로그인해 주세요.");
            } catch (e: any) {
                setOk(false);
                setMsg(`인증 실패: ${e?.message ?? e ?? "알 수 없는 오류"}`);
            }
        })();
    }, [search]);

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="mb-3 text-2xl font-bold">이메일 인증</h1>
            <div
                className={`rounded-lg border p-4 ${
                    ok === null
                        ? "border-gray-300 text-gray-700"
                        : ok
                            ? "border-green-500 text-green-700"
                            : "border-red-500 text-red-700"
                }`}
            >
                {msg}
            </div>

            <div className="mt-6 flex gap-2">
                <button
                    onClick={() => navigate("/")}
                    className="rounded bg-gray-100 px-4 py-2 hover:bg-gray-200"
                >
                    홈으로
                </button>
                <button
                    onClick={() => {
                        // 로그인 모달 여는 방식이 모달 컴포넌트 prop 기반이면
                        // 여기서는 홈으로 이동 후 로그인 모달을 띄우도록 처리하세요.
                        navigate("/?login=1");
                    }}
                    className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:opacity-90"
                >
                    로그인으로
                </button>
            </div>
        </div>
    );
}
