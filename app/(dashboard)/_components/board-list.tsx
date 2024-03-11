'use client';

import { useQuery } from 'convex/react';
import { EmptyBoards } from './empty-boards';
import { EmptyFavorites } from './empty-favorites';
import { EmptySearch } from './empty-search';
import { api } from '@/convex/_generated/api';
import { BoardCard } from './board-card';
import { NewBoardButton } from './new-board-button';

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ query, orgId }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div>
        <h2 className='text-3xl'>{query.favorites ? 'Favorite boards' : 'Team boards'}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
          <NewBoardButton
            orgId={orgId}
            disabled
          />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className='text-3xl'>{query.favorites ? 'Favorite boards' : 'Team boards'}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            authorName={board.authorName}
            imageUrl={board.imageUrl}
            title={board.title}
            isFavorite={false}
            id={board._id}
            authorId={board.authorId}
            orgId={board.orgId}
            createdAt={board._creationTime}
          />
        ))}
      </div>
    </div>
  );
};
