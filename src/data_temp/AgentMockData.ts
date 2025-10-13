// 전국 개업 공인중개사 데이터베이스 (가상)
export interface AgentInfo {
    id: number;
    registrationNumber: string; // 중개등록번호
    name: string; // 상호명
    representative: string; // 대표자명
    address: string; // 소재지
}

export const agentDatabase: AgentInfo[] = [
    {
        id: 1,
        registrationNumber: '11680-2015-00001',
        name: '하루방 공인중개사사무소',
        representative: '유승현',
        address: '서울특별시 강남구 역삼동',
    },
    {
        id: 2,
        registrationNumber: '41113-2018-00002',
        name: '미래 공인중개사',
        representative: '김미래',
        address: '경기도 수원시 팔달구 인계동',
    },
    {
        id: 3,
        registrationNumber: '26440-2020-00003',
        name: '행복 부동산',
        representative: '박행복',
        address: '부산광역시 부산진구 부전동',
    },
    {
        id: 4,
        registrationNumber: '11680-2019-00004',
        name: '강남 대표 공인중개사',
        representative: '이강남',
        address: '서울특별시 강남구 대치동',
    }
];
