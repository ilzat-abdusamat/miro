'use client';

import { EmptyFavorites } from './empty-favorites';
import { EmptySearch } from './empty-search';

interface BoardListProps {
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList = ({ query }: BoardListProps) => {
  const data = [];

  if (!data.length && query.search) {
    return <EmptySearch />;
  }

  if (!data.length && query.favorites) {
    return <EmptyFavorites />;
  }

  return <div>{JSON.stringify(query)}</div>;
};
