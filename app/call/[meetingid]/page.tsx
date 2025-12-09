import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { CallView } from '@/modules/call/ui/views/call-view';

interface Props {
  params: Promise<{
    meetingid: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { meetingid } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/signin');
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingid })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallView meetingid={meetingid} />
    </HydrationBoundary>
  );
};

export default Page;
