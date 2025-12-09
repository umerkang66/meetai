'use client';

import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { MeetingIdViewHeader } from '../components/meeting-id-view-header';
import { useConfirm } from '@/hooks/use-confirm';
import { UpdateMeetingDialog } from '../components/update-meeting-dialog';

interface Props {
  meetingid: string;
}

export const MeetingIdView = ({ meetingid: id }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure?',
    'The following action will remove this meeting.'
  );

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id }));

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        // TODO: invalidate free tier usage
        router.push('/meetings');
      },
      onError: err => toast.error(err.message),
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id });
  };

  return (
    <>
      <RemoveConfirmation />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-1">
        <MeetingIdViewHeader
          meetingId={id}
          meetingName={data.name}
          onEdit={() => setDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        <UpdateMeetingDialog
          initialValues={data}
          onOpenChange={setDialogOpen}
          open={dialogOpen}
        />
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading meeting"
      description="Something went wrong while loading the meeting"
    />
  );
};
