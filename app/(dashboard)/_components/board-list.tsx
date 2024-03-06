'use client';

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

  return <div>{JSON.stringify(query)}</div>;
};
