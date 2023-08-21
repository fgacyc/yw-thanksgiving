/* eslint-disable @next/next/no-img-element */
import { type FunctionComponent } from "react";
import { bgColor } from "~/constants";
import type { Post } from "~/pages/live";
import { truncateName } from "~/utils/helpers";

export const LiveCard: FunctionComponent<
  Post & { number: number } & {
    onClick?: () => void;
  }
> = ({ id, name, gradient }) => {
  return (
    <div
      id={id}
      data-aos="fade-up"
      className={`flex min-h-[80px] w-[300px] flex-col justify-center gap-3 overflow-hidden bg-gradient-to-tr ${bgColor[gradient]} relative`}
    >
      <img
        className={`absolute -left-4 -top-5 h-[140%]`}
        alt="open-peeps"
        src={`https://api.dicebear.com/6.x/micah/svg?seed=${name}`}
      />
      <p className="z-10 pr-5 text-right font-tungsten text-[45px] text-white">
        {truncateName(name)}
      </p>
    </div>
  );
};
