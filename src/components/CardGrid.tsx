import { type FunctionComponent } from "react";
import { type Post } from "~/pages/live";
import { LiveCard } from "./LiveCard";
import { yearLabel } from "~/constants";

interface Level1GridProps {
  data: Record<string, Post>;
  level: number;
  marginLeft: string;
}

export const CardGrid: FunctionComponent<Level1GridProps> = ({
  data,
  level,
  marginLeft,
}) => {
  return (
    <div className={`${marginLeft} flex w-[300px] flex-col py-32`}>
      <p className="mb-7 w-full rounded-full bg-white py-3 text-center font-tungsten text-5xl text-black">
        {yearLabel[level]}
      </p>
      <div className="flex h-[700px] flex-col gap-5 overflow-y-scroll">
        {data &&
          Object.values(data)
            .filter((p) => p?.id && p.approved && p.level === level)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((post) => (
              <LiveCard
                approved={post.approved}
                cg={post.cg}
                createdAt={post.createdAt}
                name={post.name}
                key={post.id}
                level={post.level}
                id={post.id}
                gradient={post.gradient}
                number={1}
                // onMounted={(el) => el.scrollIntoView({ behavior: "smooth" })}
              />
            ))}
      </div>
    </div>
  );
};
