import { ResponsiveDialogue } from '@/components/responsive-dialogue';
import { MeetingForm } from './meeting-form';
import type { MeetingGetOne } from '../../types';

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export const UpdateMeetingDialog: React.FC<NewMeetingDialogProps> = ({
  open,
  onOpenChange,
  initialValues,
}) => {
  return (
    <ResponsiveDialogue
      title="Update Meeting"
      description="Update this meeting."
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialogue>
  );
};
