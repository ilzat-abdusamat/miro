'use client';

import { useRenameModal } from '@/hooks/use-rename-modal';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
