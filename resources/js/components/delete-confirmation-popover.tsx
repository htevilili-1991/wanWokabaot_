import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface DeleteConfirmationPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    isLoading?: boolean;
}

export function DeleteConfirmationPopover({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    isLoading = false,
}: DeleteConfirmationPopoverProps) {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
            const popoverWidth = 320; // Approximate width
            const popoverHeight = 200; // Approximate height

            // Center on screen
            const left = (window.innerWidth - popoverWidth) / 2;
            const top = (window.innerHeight - popoverHeight) / 2;

            setPosition({ top: Math.max(16, top), left: Math.max(16, left) });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleConfirm = () => {
        onConfirm();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            {/* Popover */}
            <div
                ref={popoverRef}
                className="fixed z-50 w-96 max-w-[90vw] bg-white rounded-lg border border-gray-200 shadow-xl"
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                }}
            >
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete {itemName}
                            </h3>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}