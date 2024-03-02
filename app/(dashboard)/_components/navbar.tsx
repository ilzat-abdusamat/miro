'use client';

import { UserButton } from '@clerk/nextjs';
import { SearchInput } from './search-input';

const Navbar = () => {
  return (
    <div className='flex items-center gap-x-4 p-5'>
      <div>
        <SearchInput />
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
