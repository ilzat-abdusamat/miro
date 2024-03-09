'use client';

import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';

export const NewBoardButton = () => {
  return (
    <button
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6'
      )}
    >
      <div />
      <PlusIcon className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New board</p>
    </button>
  );
};
