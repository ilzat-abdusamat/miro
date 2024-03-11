'use client';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = (props: NewBoardButtonProps) => {
  const { orgId } = useAuth();
  const router = useRouter();

  const { mutate: createBoard, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    createBoard({ title: 'untitled', orgId: orgId! }).then((id) => {
      toast.success(`Board created!`);
      router.push(`board/${id}`);
    });
  };

  return (
    <button
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (pending || props.disabled) && 'opacity-75 hover:bg-blue-600 cursor-not-allowed'
      )}
      onClick={onClick}
    >
      <div />
      <PlusIcon className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New board</p>
    </button>
  );
};
