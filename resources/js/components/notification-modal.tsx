import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    showCancel?: boolean;
}

export function NotificationModal({
    isOpen,
    onClose,
    title,
    message,
    type = 'info',
    confirmText = 'OK',
    cancelText = 'Cancel',
    onConfirm,
    showCancel = false,
}: NotificationModalProps) {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-6 w-6 text-green-500" />;
            case 'error':
                return <X className="h-6 w-6 text-red-500" />;
            case 'warning':
                return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
            case 'info':
                return <Info className="h-6 w-6 text-blue-500" />;
            default:
                return <Info className="h-6 w-6 text-gray-500" />;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'info':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        {getIcon()}
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className={`p-4 rounded-lg border ${getBackgroundColor()}`}>
                    <DialogDescription className="text-base text-gray-700">
                        {message}
                    </DialogDescription>
                </div>
                <DialogFooter>
                    {showCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}