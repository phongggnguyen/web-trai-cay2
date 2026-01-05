'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AIMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Send welcome message when modal first opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage: AIMessage = {
                id: 'welcome',
                role: 'assistant',
                content: 'Xin chào! 👋 Tôi là trợ lý AI của Tiệm Quả Nghiệp. Tôi có thể giúp bạn tìm hiểu về sản phẩm, giá cả, danh mục trái cây. Bạn muốn hỏi gì ạ? 🍎🍇',
                timestamp: new Date(),
            };
            setMessages([welcomeMessage]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: AIMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationHistory: messages.map(msg => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra');
            }

            const aiMessage: AIMessage = {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: data.reply,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Không thể kết nối với trợ lý AI');
            console.error('AI Assistant error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReset = () => {
        setMessages([]);
        setError(null);
        // Re-trigger welcome message
        const welcomeMessage: AIMessage = {
            id: 'welcome-new',
            role: 'assistant',
            content: 'Xin chào! 👋 Tôi là trợ lý AI của Tiệm Quả Nghiệp. Tôi có thể giúp bạn tìm hiểu về sản phẩm, giá cả, danh mục trái cây. Bạn muốn hỏi gì ạ? 🍎🍇',
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity"
            onClick={handleBackdropClick}
        >
            <div
                className="relative w-full max-w-2xl h-[600px] rounded-2xl bg-surface-light dark:bg-surface-dark border border-border-color dark:border-border-dark shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border-color dark:border-border-dark bg-surface-light/50 dark:bg-surface-dark/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-text-main dark:text-white">Trợ lý AI</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Hỏi đáp về sản phẩm</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {messages.length > 1 && (
                            <button
                                onClick={handleReset}
                                className="flex h-9 px-3 items-center justify-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
                                title="Bắt đầu cuộc trò chuyện mới"
                            >
                                <span className="material-symbols-outlined text-[16px]">refresh</span>
                                <span>Làm mới</span>
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="flex h-9 px-3 items-center justify-center gap-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors text-xs font-medium"
                            title="Đóng trợ lý AI"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                            <span>Đóng</span>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                    ? 'bg-primary text-text-main'
                                    : 'bg-gray-100 dark:bg-black/20 text-text-main dark:text-white'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                <p className="text-[10px] mt-1 opacity-60">
                                    {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-black/20">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">AI đang trả lời...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-4 mb-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </p>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-border-color dark:border-border-dark">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Hỏi về sản phẩm, giá cả, danh mục..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/20 text-text-main dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-text-main shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">
                        Nhấn Enter để gửi • Shift + Enter để xuống dòng
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;
