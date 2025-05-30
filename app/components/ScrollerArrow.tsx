import leftArrow from '~/media/icons/leftArrow.svg';

export default function ScrollerArrow(props: {
  right: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={
        'z-[20] absolute top-[50%] -translate-y-[50%] bg-[#00000075] rounded-full py-[3px] px-[6px] ' +
        (props.right ? 'right-[10px]' : 'left-[10px]')
      }
      onClick={e => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      <img src={leftArrow} alt="" className={props.right ? 'rotate-180' : ''} />
    </div>
  );
}
