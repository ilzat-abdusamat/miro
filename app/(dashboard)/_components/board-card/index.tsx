'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Overlay } from './overlay';
import { Footer } from './footer';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import Actions from './actions';
import { MoreHorizontalIcon } from 'lucide-react';

interface BoardCardProps {
  key: string;
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = (props: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === props.authorId ? 'You' : props.authorName;
  const createdAtLabel = formatDistanceToNow(props.createdAt, {
    addSuffix: true,
  });

  const toggleFavorite = () => {};

  return (
    <Link href={`/board/${props.id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image
            src={props.imageUrl}
            alt={props.title}
            fill
            className='object-fit'
          />
          <Overlay />
          <Actions
            id={props.id}
            title={props.title}
            side='right'
          >
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontalIcon className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={false}
          title={props.title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={false}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
