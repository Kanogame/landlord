import type { ReactNode } from 'react';
import ArrowLink from './Link';
import type { TLink } from '../lib/link';
import { useDesktop } from '~/hooks/useDesktop';

interface BlockProps {
  children: ReactNode;
  link?: TLink;
  label?: string;
  isDesktop?: boolean;
}

export default function Block({
  children,
  link,
  label,
  isDesktop,
}: BlockProps) {
  if (!isDesktop) {
    isDesktop = useDesktop();
  }
  return (
    <div
      className={
        'flex flex-col gap-[15px] h-[100%] bg-white block-shadow p-def ' +
        (isDesktop ? 'p-[20px] rounded-[20px]' : 'p-[16px] rounded-[10px]')
      }
    >
      {label && label != '' && (
        <div
          className={
            'flex justify-between ' + (isDesktop ? 'h3-def' : 'h4-def')
          }
        >
          {label}
          {link && <ArrowLink link={link} big={isDesktop} />}
        </div>
      )}
      {children}
    </div>
  );
}
