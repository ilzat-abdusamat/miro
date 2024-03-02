'use client';

import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { useState } from 'react';
import { Item } from './item';

export const List = () => {
  const [isSelected, setIsSelected] = useState('');
  const { organization } = useOrganization();

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
        <Item
          key={membership.organization.id}
          id={membership.organization.id}
          imageUrl={membership.organization.imageUrl}
          name={membership.organization.name}
        />
      ))}
    </ul>
  );
};
