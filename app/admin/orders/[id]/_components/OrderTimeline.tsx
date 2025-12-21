import React from 'react';
import { STATUS_META } from '../../../constants';

interface OrderTimelineProps {
    currentStatus: string;
    createdAt: string;
}

export function OrderTimeline({ currentStatus, createdAt }: OrderTimelineProps) {
    const timelineSteps = [
        { id: 'pending', label: 'Chờ xác nhận', icon: 'schedule' },
        { id: 'processing', label: 'Đang xử lý', icon: 'hourglass_top' },
        { id: 'completed', label: 'Hoàn thành', icon: 'check_circle' },
    ];

    const currentStepIndex = timelineSteps.findIndex(step => step.id === currentStatus);

    return (
        <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                <span className="material-symbols-outlined text-blue-600">pending_actions</span>
                Tiến độ đơn hàng
            </h3>

            <div className="relative pl-2">
                {timelineSteps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <div key={step.id} className="grid grid-cols-[32px_1fr] gap-x-3 pb-8 last:pb-0 relative">
                            {/* Line Connector */}
                            {index !== timelineSteps.length - 1 && (
                                <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${isCompleted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                    }`}></div>
                            )}

                            {/* Icon Bubble */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isCompleted
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                                <span className="material-symbols-outlined text-[16px] font-bold">{step.icon}</span>
                            </div>

                            {/* Content */}
                            <div>
                                <p className={`font-bold text-sm leading-tight ${isCompleted ? 'text-text-main dark:text-white' : 'text-gray-400'
                                    }`}>
                                    {step.label}
                                </p>
                                {isCompleted && index === 0 && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {new Date(createdAt).toLocaleString('vi-VN')}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
