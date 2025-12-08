import { useState, type ReactNode } from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';

import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command';

interface Props {
  options: {
    id: string;
    value: string;
    children: ReactNode;
  }[];
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  onSearch,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find(op => op.value === value);

  const handleOpenChange = (value: boolean) => {
    onSearch?.('');
    setOpen(value);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          'h-9',
          'justify-between font-normal px-2',
          !selectedOption && 'text-muted-foreground',
          className
        )}
        type="button"
        variant="outline"
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found
            </span>
          </CommandEmpty>
          {options.map(option => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
