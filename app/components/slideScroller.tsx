import { useState } from "react";

export interface Slide {
  image: string;
  header: string;
  desc: string;
  href: string;
}

const props: Slide[] = [
  {
    image: "./",
  },
];

export default function SlideScroller() {
  const [slide, setSlide] = useState<number>(0);

  return <div>{}</div>;
}
