import type { ReactNode } from 'react';
import Link from './Link';
import type { TLink } from '../lib/link';

export default function Block(props: {
  children: ReactNode;
  link?: TLink;
  label: string;
  isDesktop: boolean;
}) {
  return (
    <div
      className={
        'flex flex-col gap-[15px] h-[100%] bg-white block-shadow rounded-[20px] ' +
        (props.isDesktop
          ? 'p-[20px] rounded-[20px]'
          : 'p-[16px] rounded-[10px]')
      }
    >
      {props.label != '' && (
        <div
          className={
            'flex justify-between ' + (props.isDesktop ? 'h3-def' : 'h4-def')
          }
        >
          {props.label}
          {props.link && <Link link={props.link} />}
        </div>
      )}
      {props.children}
    </div>
  );
}
