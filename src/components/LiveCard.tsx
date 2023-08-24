/* eslint-disable @next/next/no-img-element */
import { useEffect, type FunctionComponent, useState } from "react";
import { bgColor } from "~/constants";
import type { Post } from "~/pages/live";
import { truncateName } from "~/utils/helpers";

export const LiveCard: FunctionComponent<
  Post & {
    number: number;
    onClick?: () => void;
    width: string;
    onMounted: (el: Element) => void;
  }
> = ({ id, name, gradient, width, level }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 250);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      id={id}
      data-aos={level === 1 || level === 2 ? "fade-right" : "fade-left"}
      className={`${
        animate ? "aos-animate" : ""
      } flex min-h-[80px] w-full flex-col justify-center gap-3 overflow-hidden bg-gradient-to-tr ${
        // bgColor[gradient]
        "bg-black"
      } relative`}
    >
      <img
        className={`absolute -left-4 -top-5 z-10 h-[140%] rounded-full bg-white`}
        alt="open-peeps"
        src={`https://api.dicebear.com/6.x/micah/svg?seed=${name}`}
      />
      <p className="truncate pr-5 text-right font-tungsten text-[45px] font-bold text-white">
        {truncateName(name)}
      </p>
    </div>
  );
};
