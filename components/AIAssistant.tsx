'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AIMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
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
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
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
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-primary text-text-main shadow-[0_4px_20px_rgba(76,223,32,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
                title="Chat với AI"
            >
                {/* Pulse Effect Background */}
                <span className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping group-hover:animate-none"></span>
                <span className="material-symbols-outlined text-[32px] relative z-10">smart_toy</span>
            </button>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-200"
                    onClick={handleBackdropClick}
                >
                    <div
                        className="relative w-full max-w-2xl max-h-[90vh] h-[600px] flex flex-col rounded-3xl bg-surface-light dark:bg-surface-dark border border-white/20 dark:border-white/10 shadow-[0_0_50px_-12px_rgb(0,0,0,0.25)] dark:shadow-[0_0_50px_-12px_rgb(255,255,255,0.1)] overflow-hidden animate-in zoom-in-95 duration-300 ease-out"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-black/10 dark:hover:bg-white/20 transition-all backdrop-blur-sm"
                            title="Đóng chat"
                        >
                            <span className="material-symbols-outlined text-[24px]">close</span>
                        </button>

                        {/* Header */}
                        <div className="flex items-center p-4 border-b border-border-color dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-text-main dark:text-white">Trợ lý AI</h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Hỏi đáp về sản phẩm</p>
                                </div>
                            </div>
                            {/* Refresh Button */}
                            {messages.length > 1 && (
                                <button
                                    onClick={handleReset}
                                    className="ml-auto mr-12 flex h-8 px-3 items-center justify-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
                                    title="Làm mới cuộc trò chuyện"
                                >
                                    <span className="material-symbols-outlined text-[16px]">refresh</span>
                                    <span className="hidden sm:inline">Làm mới</span>
                                </button>
                            )}
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
            )}
        </>
    );
};

export default AIAssistant;
