import { useRef, type ReactNode } from 'react';
import ScrollerArrow from './ScrollerArrow';
import ArrowLink from './Link';
import type { TLink } from '../lib/link';

export default function ScrollBlock(props: {
  children: ReactNode;
  link?: TLink;
  label: string;
  scrollStep?: number;
  isDesktop: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollLeft() {
    console.log('scroll left');
    if (ref.current) {
      ref.current.scrollBy({
        left: -(props.scrollStep ?? 200),
        behavior: 'smooth',
      });
    }
  }

  function scrollRight() {
    console.log('scroll right');
    if (ref.current) {
      ref.current.scrollBy({
        left: props.scrollStep ?? 200,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div
      className={
        'flex flex-col gap-[15px] bg-white block-shadow ' +
        (props.isDesktop
          ? 'py-[20px] rounded-[20px]'
          : 'py-[16px] rounded-[10px]')
      }
    >
      <div
        className={
          'flex justify-between ' +
          (props.isDesktop ? 'h3-def mx-[20px]' : 'h4-def mx-[16px]')
        }
      >
        {props.label}
        {props.link && (
          <div>
            <ArrowLink link={props.link} big={props.isDesktop} />
          </div>
        )}
      </div>
      <div className="relative pointer-events-auto">
        <ScrollerArrow right={false} onClick={scrollLeft} />
        <ScrollerArrow right={true} onClick={scrollRight} />
        <div
          ref={ref}
          className={
            'flex gap-[10px] flex-[0_0] overflow-auto scrollbar-0 ' +
            (props.isDesktop ? 'px-[20px]' : 'px-[16px]')
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
