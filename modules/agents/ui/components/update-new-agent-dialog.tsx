import { ResponsiveDialogue } from '@/components/responsive-dialogue';
import { AgentGetOne } from '../../types';
import { AgentForm } from './agent-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  initialValues,
}) => {
  return (
    <ResponsiveDialogue
      title="Edit Agent"
      description="Edit the details of your agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialogue>
  );
};
