'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { useState } from 'react';

export const List = () => {
  const [isSelected, setIsSelected] = useState('');

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <ul>
      {userMemberships.data.map((membership) => (
        <button
          className={`mb-3 ${isSelected === membership.organization.id && 'text-2xl'}`}
          key={membership.organization.id}
          onClick={() => {
            setActive({ organization: membership.organization.id });
            setIsSelected(membership.organization.id);
          }}
        >
          {membership.organization.name}
        </button>
      ))}
    </ul>
  );
};
