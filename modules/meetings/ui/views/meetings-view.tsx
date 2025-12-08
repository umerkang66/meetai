'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useAgentFilters } from '@/modules/agents/hooks/use-agents-filters';
import { useTRPC } from '@/trpc/client';

export const MeetingsView = () => {
  const [filters] = useAgentFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Something went wrong while loading the meetings"
    />
  );
};
