import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  MeetingIdView,
  MeetingIdViewError,
  MeetingIdViewLoading,
} from '@/modules/meetings/ui/views/meeting-id-view';

interface Props {
  params: Promise<{
    meetingid: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingid: id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(trpc.meetings.getOne.queryOptions({ id }));

  if (!session) {
    return redirect('/signin');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingIdViewError />}>
          <MeetingIdView meetingid={id} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
