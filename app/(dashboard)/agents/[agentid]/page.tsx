import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  AgentIdView,
  AgentsIdViewError,
  AgentsIdViewLoading,
} from '@/modules/agents/ui/views/agent-id-view';

interface Props {
  // it should be the same as the filename of [<filename>]
  params: Promise<{ agentid: string }>;
}

const Page = async ({ params }: Props) => {
  const { agentid } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentid })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary fallback={<AgentsIdViewError />}>
          <AgentIdView agentId={agentid} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
