import {
  useEffect,
  type FunctionComponent,
  useLayoutEffect,
  useRef,
} from "react";
import { type Post } from "~/pages/live";
import { LiveCard } from "./LiveCard";
import { yearLabel } from "~/constants";

import aos from "aos";
import "aos/dist/aos.css";

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
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to scroll to the bottom of the container

    const scrollToBottom = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight;
        // console.log(container.scrollHeight);
      }
    };

    // Listen for changes in the itemList and scroll to the bottom
    scrollToBottom();
  }, [data]);

  return (
    <div className={`${marginLeft} flex w-[300px] flex-col py-32`}>
      <p className="mb-7 w-full rounded-full bg-white py-3 text-center font-tungsten text-5xl text-black">
        {yearLabel[level]}
      </p>
      <div
        id={`container-${level}`}
        className="flex h-[700px] flex-col gap-5 overflow-x-hidden"
        ref={containerRef}
      >
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
                onMounted={(el) => el.scrollIntoView({ behavior: "smooth" })}
              />
            ))}
      </div>
    </div>
  );
};
