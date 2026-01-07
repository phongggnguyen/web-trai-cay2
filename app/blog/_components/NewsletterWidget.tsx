'use client';

import { useState } from 'react';

export default function NewsletterWidget() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription
        console.log('Subscribe:', email);
        setEmail('');
    };

    return (
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
            <div className="bg-white size-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span className="material-symbols-outlined text-primary text-2xl">mail</span>
            </div>
            <h3 className="text-lg font-bold text-text-main mb-2">Nhận bí kíp ăn ngon</h3>
            <p className="text-sm text-text-secondary mb-4">
                Đăng ký để không bỏ lỡ những bài viết "nghiệp tụ" mới nhất.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    className="w-full rounded-xl border-none bg-white py-2 px-4 text-sm focus:ring-2 focus:ring-primary"
                    placeholder="Email của bạn"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    className="w-full rounded-xl bg-primary text-text-main font-bold py-2 hover:bg-primary/90 transition-colors"
                    type="submit"
                >
                    Đăng ký ngay
                </button>
            </form>
        </div>
    );
}
