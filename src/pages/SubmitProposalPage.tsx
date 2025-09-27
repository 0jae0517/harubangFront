import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, Banknote, Text, Camera, Send } from 'lucide-react';

const SubmitProposalPage: React.FC = () => {
    const { requestId } = useParams();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 실제로는 여기서 폼 데이터를 서버로 전송합니다.
        alert(`신청서 ID ${requestId}에 대한 매물 제안을 성공적으로 보냈습니다.`);
        // 제출 후 대시보드로 이동하는 로직 추가 필요 (예: navigate('/agent/dashboard'))
    };

    const inputStyle = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harubang-blue";
    const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="bg-harubang-sky min-h-full py-12">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-harubang-ink">매물 제안하기</h1>
                    <p className="text-harubang-ink-light mt-2">고객(신청서 ID: {requestId})의 조건에 맞는 매물 정보를 입력해주세요.</p>
                </motion.div>

                <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-white rounded-xl shadow-md p-8 space-y-8"
                >
                    {/* 매물 기본 정보 */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Building size={20} /> 매물 기본 정보</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>매물 종류</label>
                                <select className={inputStyle}>
                                    <option>아파트</option>
                                    <option>오피스텔</option>
                                    <option>빌라</option>
                                    <option>원룸</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelStyle}>거래 종류</label>
                                <select className={inputStyle}>
                                    <option>전세</option>
                                    <option>월세</option>
                                    <option>매매</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className={labelStyle}>주소</label>
                            <input type="text" placeholder="예) 서울특별시 강남구 역삼동 123-45" required className={inputStyle} />
                        </div>
                    </div>

                    {/* 가격 정보 */}
                    <div className="border-b pb-6">
                         <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Banknote size={20} /> 가격 정보</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelStyle}>보증금 / 매매가</label>
                                <div className="relative">
                                    <input type="number" placeholder="5000" required className={inputStyle} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">만원</span>
                                </div>
                            </div>
                             <div>
                                <label className={labelStyle}>월세 (선택)</label>
                                <div className="relative">
                                    <input type="number" placeholder="80" className={inputStyle} />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">만원</span>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* 상세 정보 */}
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Text size={20} /> 상세 설명</h2>
                        <textarea 
                            rows={5} 
                            placeholder="매물의 특징과 장점을 자세하게 설명해주세요. (예: 역세권, 남향, 시스템에어컨 완비)" 
                            className={inputStyle}
                        ></textarea>
                    </div>

                     {/* 사진 첨부 */}
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Camera size={20} /> 사진 첨부</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Camera size={48} className="mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">여기에 사진 파일을 드래그하거나 클릭하여 업로드하세요.</p>
                            <input type="file" className="hidden" multiple />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <Link to={`/agent/request/${requestId}`} className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">취소</Link>
                      <button type="submit" className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-harubang-blue hover:bg-harubang-blue-dark flex items-center gap-2">
                        <Send size={16} /> 제안 보내기
                      </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default SubmitProposalPage;