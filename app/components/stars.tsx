export function Stars(props: { raiting: number }) {
  return (
    <div className="flex gap-[5px] py-[2px] px-[5px] bg-[#D9D9D9] items-center rounded-[4px]">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_298_5760)">
          <path
            d="M2.25763 9.6517C2.01638 9.77545 1.74263 9.55857 1.79138 9.2817L2.31013 6.32545L0.10826 4.22795C-0.097365 4.0317 0.00950995 3.67295 0.285135 3.6342L3.34638 3.1992L4.71138 0.494824C4.83451 0.251074 5.16763 0.251074 5.29076 0.494824L6.65576 3.1992L9.71701 3.6342C9.99263 3.67295 10.0995 4.0317 9.89326 4.22795L7.69201 6.32545L8.21076 9.2817C8.25951 9.55857 7.98576 9.77545 7.74451 9.6517L5.00013 8.2417L2.25763 9.6517Z"
            fill="black"
          />
        </g>
      </svg>
      <div className="p-def">{props.raiting}</div>
    </div>
  );
}
