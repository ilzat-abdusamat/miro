'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

interface ActionsProps {
  children: React.ReactNode;
  id: string;
}

const Actions = ({ children, id }: ActionsProps) => {
  const { mutate: deleteBoard, pending } = useApiMutation(api.board.deleteBoard);

  const onDelete = () => {
    deleteBoard({ id })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete board'));
  };

  return (
    <DropdownMenu>
      <div className='absolute z-50 top-1 right-1'>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={pending}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default Actions;
