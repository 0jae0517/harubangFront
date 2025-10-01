import React, { createContext, useReducer, useContext } from 'react';
import type { ReactNode } from 'react'; // ReactNode를 type-only import로 분리

// --- 데이터 타입 정의 ---

// 고객 신청서
export interface Request {
    id: number;
    title: string;
    status: string;
    date: string;
    hasNew: boolean;
    // 상세 정보
    propertyType: string;
    transactionType: string;
    location: string;
    deposit: string;
    rent?: string;
    details: string;
    customerName: string; 
}

// 중개사 보유 매물
export interface Property {
    id: number;
    agentId: number; // 어느 중개사의 매물인지
    name: string;
    type: string;
    deal: string;
    price: string;
    area: string;
    rooms: string;
    baths: string;
}

// 고객에게 보낸 제안
export interface Proposal {
    id: number;
    requestId: number; // 어느 신청서에 대한 제안인지
    propertyId: number; // 어떤 매물을 제안했는지
    agentName: string;
    chatRoomId: number;
}


// --- 중앙 저장소(Store)의 전체 데이터 구조 ---
interface AppState {
    requests: Request[];
    properties: Property[];
    proposals: Proposal[];
}

// --- 데이터 변경 행동(Action) 타입 정의 ---
// ADD_REQUEST의 payload에서 title을 제외합니다. (Reducer에서 생성하기 때문)
type Action =
    | { type: 'ADD_REQUEST'; payload: Omit<Request, 'id' | 'status' | 'hasNew' | 'date' | 'title'> }
    | { type: 'ADD_PROPERTY'; payload: Omit<Property, 'id'> }
    | { type: 'ADD_PROPOSAL'; payload: Omit<Proposal, 'id' | 'chatRoomId'> };


// --- 초기 데이터 (기존 mockData들을 통합) ---
const initialState: AppState = {
    requests: [
        { id: 1, title: '서울시 강남구 아파트 전세', status: '제안 도착 (2건)', date: '2025-09-22', hasNew: true, customerName: '김하루', propertyType: '아파트', transactionType: '전세', location: '서울특별시 강남구', deposit: '5억', details: '역세권, 남향 원합니다.' },
        { id: 2, title: '경기도 수원시 오피스텔 월세', status: '검토 중', date: '2025-09-18', hasNew: false, customerName: '이하루', propertyType: '오피스텔', transactionType: '월세', location: '경기도 수원시 영통구', deposit: '2000만', rent: '80만', details: '깨끗한 신축 원해요.' },
    ],
    properties: [
        { id: 101, agentId: 1, name: '역삼동 래미안 아파트 101동 502호', type: '아파트', deal: '전세', price: '5억', area: '84㎡', rooms: '3개', baths: '2개' },
        { id: 102, agentId: 1, name: '수원시 영통구 광교자이 오피스텔', type: '오피스텔', deal: '월세', price: '2000만 / 80만', area: '52㎡', rooms: '2개', baths: '1개' },
    ],
    proposals: [
        { id: 1, requestId: 1, propertyId: 101, agentName: '친절한 하루방 공인중개사', chatRoomId: 101},
        { id: 2, requestId: 1, propertyId: 102, agentName: '행복 부동산', chatRoomId: 102},
    ],
};

// --- 데이터 변경 규칙 (Reducer) ---
const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_REQUEST':
            const newRequest: Request = {
                id: Date.now(), // 임시로 고유 ID 생성
                ...action.payload,
                title: `${action.payload.location} ${action.payload.propertyType} ${action.payload.transactionType}`,
                status: '검토 중',
                hasNew: false,
                date: new Date().toISOString().split('T')[0],
            };
            return {
                ...state,
                requests: [...state.requests, newRequest],
            };
        case 'ADD_PROPERTY':
             const newProperty: Property = {
                id: Date.now(),
                ...action.payload,
             };
             return {
                ...state,
                properties: [...state.properties, newProperty],
             };
        case 'ADD_PROPOSAL':
            const newProposal: Proposal = {
                id: Date.now(),
                chatRoomId: Date.now() + 1, // 임시 채팅방 ID
                ...action.payload,
            };
             // 해당 요청서의 상태를 '제안 도착'으로 변경
            const updatedRequests = state.requests.map(req => {
                if (req.id === action.payload.requestId) {
                    const proposalCount = state.proposals.filter(p => p.requestId === req.id).length + 1;
                    return { ...req, status: `제안 도착 (${proposalCount}건)`, hasNew: true };
                }
                return req;
            });
            return {
                ...state,
                requests: updatedRequests,
                proposals: [...state.proposals, newProposal],
            };
        default:
            return state;
    }
};

// --- Context 생성 및 Provider, Hook ---
const AppContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};