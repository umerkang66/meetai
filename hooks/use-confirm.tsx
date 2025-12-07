import { ResponsiveDialogue } from '@/components/responsive-dialogue';
import { Button } from '@/components/ui/button';
import { JSX, useCallback, useState } from 'react';

type UseConfirmResponse = [() => JSX.Element, () => Promise<boolean>];

type Variant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | null
  | undefined;

export const useConfirm = (
  title: string,
  description: string,
  btnVariant: Variant = 'default'
): UseConfirmResponse => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise<boolean>(resolve => {
      setPromise({ resolve });
    });
  };

  const handleClose = useCallback(() => {
    setPromise(null);
  }, []);

  const handleConfirm = useCallback(() => {
    promise?.resolve(true);
    handleClose();
  }, [handleClose, promise]);

  const handleCancel = useCallback(() => {
    promise?.resolve(false);
    handleClose();
  }, [handleClose, promise]);

  const ConfirmationDialog = useCallback(
    () => (
      <ResponsiveDialogue
        open={promise !== null}
        onOpenChange={handleClose}
        title={title}
        description={description}
      >
        <div className="pt-4 w-full flex  flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={btnVariant}
            className="w-full lg:w-auto"
          >
            Confirm
          </Button>
        </div>
      </ResponsiveDialogue>
    ),
    [
      handleCancel,
      description,
      handleClose,
      handleConfirm,
      promise,
      title,
      btnVariant,
    ]
  );

  return [ConfirmationDialog, confirm];
};
