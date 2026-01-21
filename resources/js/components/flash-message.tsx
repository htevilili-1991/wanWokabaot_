import { Transition } from '@headlessui/react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

interface FlashMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    show: boolean;
    onClose?: () => void;
    autoHide?: boolean;
    duration?: number;
}

export function FlashMessage({
    message,
    type,
    show,
    onClose,
    autoHide = true,
    duration = 5000
}: FlashMessageProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        if (autoHide && isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, autoHide, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-400" />;
            case 'error':
                return <X className="h-5 w-5 text-red-400" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
            case 'info':
                return <CheckCircle className="h-5 w-5 text-blue-400" />;
            default:
                return <CheckCircle className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    return (
        <Transition
            show={isVisible}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border p-4 shadow-lg ring-1 ring-black ring-opacity-5 ${getStyles()}`}>
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {getIcon()}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium">{message}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                            onClick={() => {
                                setIsVisible(false);
                                onClose?.();
                            }}
                        >
                            <span className="sr-only">Dismiss</span>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    );
}