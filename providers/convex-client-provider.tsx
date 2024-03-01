'use client';

import { ConvexReactClient } from 'convex/react';

import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { useAuth } from '@clerk/clerk-react';
import { ClerkProvider } from '@clerk/nextjs';

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk
        client={convex}
        useAuth={useAuth}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
