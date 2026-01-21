import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    itemName?: string;
    isLoading?: boolean;
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Delete Item',
    description = 'Are you sure you want to delete this item? This action cannot be undone.',
    itemName,
    isLoading = false,
}: ConfirmDeleteModalProps) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                        {itemName && (
                            <span className="font-semibold text-gray-900"> "{itemName}"</span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 p-4 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-700">
                        This action cannot be undone. Please confirm you want to proceed.
                    </p>
                </div>
                <DialogFooter>
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}