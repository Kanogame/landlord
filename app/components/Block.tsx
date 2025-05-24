import type { ReactNode } from 'react';
import Link from './Link';
import type { TLink } from '../lib/link';

export default function Block(props: {
  children: ReactNode;
  link?: TLink;
  label: string;
}) {
  return (
    <div className="flex flex-col p-[20px] gap-[15px] h-[100%] bg-white block-shadow rounded-[20px]">
      <div className="h3-def flex justify-between">
        {props.label}
        {props.link && <Link link={props.link} />}
      </div>
      {props.children}
    </div>
  );
}
