import { ref } from "firebase/database";
import type { NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { CardGrid } from "~/components/CardGrid";

import "aos/dist/aos.css";
export type Post = {
  level: number;
  name: string;
  cg: string;
  approved: boolean;
  id: string;
  createdAt: EpochTimeStamp;
  gradient: number;
};

const LivePage: NextPage = () => {
  const db = useDatabase();
  const dbRef = ref(db);

  const { data } = useDatabaseObjectData<Record<string, Post>>(dbRef);

  return (
    <main className="relative h-screen overflow-hidden bg-[url('/Base_UNS.png')] bg-cover bg-center">
      <img
        src={"/SPLITSCREEN.png"}
        alt=""
        className="absolute left-0 top-0 z-10 w-full object-cover"
      />
      <div className="z-20 flex w-full flex-row">
        <CardGrid
          data={data}
          level={1}
          marginLeft={""}
          width="small"
          cardWidth="full"
        />
        <CardGrid
          data={data}
          level={2}
          marginLeft={"ml-[85px]"}
          cardWidth={"full"}
          width={"large"}
        />
        <CardGrid
          data={data}
          level={3}
          marginLeft={"ml-[2350px]"}
          cardWidth={"full"}
          width={"large"}
        />
        <CardGrid
          data={data}
          level={4}
          marginLeft={"ml-[85px]"}
          cardWidth="full"
          width={"small"}
        />
      </div>
    </main>
  );
};

export default LivePage;
