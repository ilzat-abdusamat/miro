'use client';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { toast } from 'sonner';

export const EmptyBoards = () => {
  const { mutate: createBoard, pending } = useApiMutation(api.board.create);
  const { orgId } = useAuth();

  const onClick = () => {
    createBoard({ title: 'new-board', orgId: orgId! }).then((result) =>
      toast.success(`Board ${result} created`)
    );
  };

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
        src='/note.svg'
        alt='Empty'
        width={110}
        height={110}
      />
      <h2 className='text-2xl font-semibold mt-6'>Create your first board!</h2>
      <p className='text-muted-foreground textg-sm mt-2'>
        Start by creating a board for your orgaization
      </p>
      <div className='mt-6'>
        <Button
          size='lg'
          onClick={onClick}
        >
          {pending ? 'creating...' : 'Create board'}
        </Button>
      </div>
    </div>
  );
};
