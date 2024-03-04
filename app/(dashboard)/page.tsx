'use client';

import { useOrganization } from '@clerk/nextjs';
import { EmptyOrg } from './_components/empty-org';
import { BoardList } from './_components/board-list';

const DashboardPage = () => {
  const { organization } = useOrganization();

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {!organization ? <EmptyOrg /> : <BoardList />}
    </div>
  );
};

export default DashboardPage;
