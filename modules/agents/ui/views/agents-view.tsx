'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { DataTable } from '../components/data-table';
import { columns } from '../components/columns';
import { EmptyState } from '@/components/empty-state';

export const AgentsView = () => {
  const trpc = useTRPC();
  const router = useRouter();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data}
        columns={columns}
        onRowClick={row => router.push(`/agents/${row.id}`)}
      />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your first meeting."
        />
      )}
    </div>
  );
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
