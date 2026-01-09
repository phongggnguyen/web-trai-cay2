'use client';

interface ModeSwitcherProps {
    mode: 'manual' | 'ai';
    onChange: (mode: 'manual' | 'ai') => void;
    disabled?: boolean;
}

export function ModeSwitcher({ mode, onChange, disabled = false }: ModeSwitcherProps) {
    return (
        <div className="inline-flex gap-1 p-1 bg-gray-100 dark:bg-white/10 rounded-lg">
            <button
                type="button"
                onClick={() => onChange('manual')}
                disabled={disabled}
                className={`
                    px-4 py-2 rounded-md text-sm font-bold transition-all
                    ${mode === 'manual'
                        ? 'bg-white dark:bg-surface-dark text-text-main dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-text-main dark:hover:text-white'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Viết thủ công
                </span>
            </button>

            <button
                type="button"
                onClick={() => onChange('ai')}
                disabled={disabled}
                className={`
                    px-4 py-2 rounded-md text-sm font-bold transition-all
                    ${mode === 'ai'
                        ? 'bg-white dark:bg-surface-dark text-text-main dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-text-main dark:hover:text-white'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    Viết bằng AI
                </span>
            </button>
        </div>
    );
}
