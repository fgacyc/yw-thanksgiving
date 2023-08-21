/* eslint-disable @next/next/no-img-element */
import { type FunctionComponent } from "react";
import { bgColor, yearLabel } from "~/constants";
import type { Post } from "~/pages/live";

export const Card: FunctionComponent<
  Post & { number: number } & {
    onClick?: () => void;
  }
> = ({ cg, id, level, name, onClick, approved, gradient }) => {
  return (
    <div
      id={id}
      data-aos="fade-up"
      className={`flex w-full flex-col gap-3 rounded-xl bg-white p-3 shadow-xl`}
    >
      <div className="h-full rounded-xl bg-white p-5">
        <div className="h mb-2 flex flex-row items-center gap-5">
          <img
            className={`h-[70px] w-[70px] rounded-full  bg-gradient-to-tr  ${bgColor[gradient]}`}
            alt=""
            src={`https://api.dicebear.com/6.x/micah/svg?seed=${name}`}
          />
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p>
              {cg} | {yearLabel[level]}
            </p>
          </div>
        </div>
      </div>
      {!approved && (
        <button
          className="text-md mb-2 w-full rounded-lg bg-green-400 py-2 capitalize text-white"
          onClick={onClick}
        >
          Approve
        </button>
      )}
    </div>
  );
};
