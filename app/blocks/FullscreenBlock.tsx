import { Children } from 'react';
import Block from '~/components/Block';
import { useDesktop } from '~/hooks/useDesktop';

export default function FullscreenBlock(props: {
  children: React.ReactNode;
  label: string;
}) {
  const isDesktop = useDesktop();
  return (
    <div
      className={
        'w-[100%] h-[100%] self-center flex justify-center items-center'
      }
    >
      <div className="w-[100%] max-w-[400px]">
        <Block isDesktop={isDesktop} label={props.label}>
          {props.children}
        </Block>
      </div>
    </div>
  );
}
