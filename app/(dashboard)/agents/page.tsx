import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { SearchParams } from 'nuqs/server';

import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from '@/modules/agents/ui/views/agents-view';
import { AgentsListHeader } from '@/modules/agents/ui/components/agent-list-header';
import { loadAgentsFilterParams } from '@/modules/agents/params';

interface Props {
  searchParams: Promise<SearchParams>;
}

const AgentsPage = async ({ searchParams }: Props) => {
  const filters = await loadAgentsFilterParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/signin');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default AgentsPage;
