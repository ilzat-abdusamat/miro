import { ChangeEvent, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from 'next/navigation';

import qs from 'query-string';

export const SearchInput = () => {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>(searchValue, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  console.log('searchValue', searchValue);
  console.log('debouncedValue', debouncedValue);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [router, debouncedValue]);

  return (
    <div className='w-full relative'>
      <SearchIcon className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        className='w-full max-w-[516px] pl-9'
        placeholder='Search boards'
        onChange={handleChange}
        value={searchValue}
      />
    </div>
  );
};
