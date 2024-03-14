'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRenameModal } from '@/hooks/use-rename-modal';
import { Button } from '../ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

export const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const { mutate: updateBoard, pending } = useApiMutation(api.board.update);

  const [title, setTitle] = useState<string>(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    updateBoard({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed');
        onClose();
      })
      .catch(() => {
        toast.error('Failed to rename board');
      });
  };

  console.log('initialValues', initialValues);
  console.log('title', title);

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
        <form
          onSubmit={onSubmit}
          className='space-y-4'
        >
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='outline'
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={pending}
              type='submit'
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
