import type { NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import type { Post } from "./live";
import { ref, set } from "firebase/database";
import { Card } from "~/components/Card";

const Master: NextPage = () => {
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <div className="flex min-h-screen flex-col items-center overflow-y-auto bg-blue-500 bg-cover bg-center">
      <main className="grid grid-cols-1 items-center justify-center gap-5 px-2 py-5 lg:grid-cols-2">
        {data &&
          Object.values(data)
            .filter((p) => p?.id && !p?.approved)
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((post) => (
              <Card
                onClick={() =>
                  void set(ref(db, `${post.createdAt}`), {
                    ...post,
                    approved: true,
                    createdAt: Date.now(),
                  })
                }
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
      </main>
    </div>
  );
};

export default Master;
