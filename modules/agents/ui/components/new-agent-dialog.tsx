import { ResponsiveDialogue } from '@/components/responsive-dialogue';
import { AgentForm } from './agent-form';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDialogue
      title="New Agent Form"
      description="Create new Agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialogue>
  );
};
