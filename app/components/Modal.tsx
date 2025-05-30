import type { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

interface ModalProps {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
  isDesktop: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Modal({
  children,
  trigger,
  title,
  isDesktop,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={
          'bg-white block-shadow ' +
          (isDesktop
            ? 'p-[20px] rounded-[20px] max-w-[350px]'
            : 'p-[16px] rounded-[10px] max-w-[100%]')
        }
      >
        <DialogHeader>
          <DialogTitle
            className={'text-left ' + (isDesktop ? 'h3-def' : 'h4-def')}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-[15px]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
