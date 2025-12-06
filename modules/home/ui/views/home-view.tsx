'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export const HomeView = () => {
  const trpc = useTRPC();

  // TODO: Remove this
  const { data } = useQuery(trpc.hello.queryOptions({ text: 'umer did this' }));

  return (
    <div className="flex flex-col p-4 gap-y-4">Hello {data?.greeting}</div>
  );
};
