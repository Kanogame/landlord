import { useRef, type ReactNode } from 'react';
import ScrollerArrow from './ScrollerArrow';
import Link from './Link';
import type { TLink } from '../lib/link';

export default function ScrollBlock(props: {
  children: ReactNode;
  link?: TLink;
  label: string;
  scrollStep?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollLeft() {
    if (ref.current) {
      ref.current.scrollBy({
        left: -(props.scrollStep ?? 200),
        behavior: 'smooth',
      });
    }
  }

  function scrollRight() {
    if (ref.current) {
      ref.current.scrollBy({
        left: props.scrollStep ?? 200,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="flex flex-col py-[20px] gap-[15px] bg-white block-shadow rounded-[20px]">
      <div className="h3-def flex justify-between mx-[20px]">
        {props.label}
        {props.link && (
          <div>
            <Link link={props.link} />
          </div>
        )}
      </div>
      <div className="relative">
        <ScrollerArrow right={false} onClick={scrollLeft} />
        <ScrollerArrow right={true} onClick={scrollRight} />
        <div
          ref={ref}
          className="flex gap-[10px] flex-[0_0] overflow-auto scrollbar-0 px-[20px]"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
