'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';

export const AgentsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewLoading = () => {
  return (
    <div>
      <LoadingState
        title="Agents Loading"
        description="This might take a few seconds"
      />
    </div>
  );
};

export const AgentsViewError = ({ message }: { message?: string }) => {
  return (
    <div>
      <ErrorState
        title="Error"
        description={message || 'Something went wrong.'}
      />
    </div>
  );
};
