'use client';

import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2Icon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
  id: string;
  title: string;
}

const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
  const { mutate: deleteBoard, pending } = useApiMutation(api.board.deleteBoard);

  const onDelete = () => {
    deleteBoard({ id })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete board'));
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <DropdownMenu>
      <div className='absolute z-50 top-1 right-1'>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          onClick={(e) => e.stopPropagation()}
          side={side}
          sideOffset={sideOffset}
          className='w-60'
        >
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem
            onClick={onCopyLink}
            className='p-3 cursor-pointer'
          >
            <Link2Icon className='h-4 w-4 mr-2' />
            Copy board link
          </DropdownMenuItem>

          <ConfirmModal
            onConfirm={onDelete}
            header='Delete board?'
            description='This will delete the board and all of its contents.'
            disabled={pending}
          >
            <Button
              variant='ghost'
              className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
            >
              <Trash2Icon className='h-4 w-4 mr-2' />
              Delete
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default Actions;
