import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';

const ChatPage: React.FC = () => {
    const { chatRoomId } = useParams();
    const [messages, setMessages] = useState([
        { id: 1, text: '안녕하세요! 제안드린 강남구 역삼동 아파트 매물 관련해서 문의드립니다.', sender: 'me' },
        { id: 2, text: '네, 고객님 안녕하세요! 어떤 점이 궁금하신가요?', sender: 'other' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me' }]);
        setNewMessage('');
        // 실제로는 여기서 웹소켓으로 메시지를 서버에 전송합니다.
    };

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Chat Header */}
            <header className="bg-white border-b shadow-sm z-10">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <Link to="/mypage" className="text-gray-500 hover:text-harubang-blue mr-4">
                        <ArrowLeft />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg">친절한 하루방 공인중개사</h1>
                        <p className="text-xs text-green-500">온라인</p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                            msg.sender === 'me' 
                                ? 'bg-harubang-blue text-white rounded-br-none' 
                                : 'bg-white text-harubang-ink border rounded-bl-none'
                        }`}>
                            <p>{msg.text}</p>
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Message Input */}
            <footer className="bg-white border-t p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-harubang-blue"
                    />
                    <button type="submit" className="bg-harubang-blue text-white p-3 rounded-full hover:bg-harubang-blue-dark transition-colors flex-shrink-0">
                        <Send />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatPage;