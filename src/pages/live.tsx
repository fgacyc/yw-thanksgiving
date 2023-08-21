import { ref } from "firebase/database";
import type { NextPage } from "next";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { CardGrid } from "~/components/CardGrid";

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
        className="absolute left-0 top-0 w-full object-cover"
      />
      <div className="flex w-full flex-row">
        <CardGrid data={data} level={1} marginLeft={"ml-6"} />
        <CardGrid data={data} level={2} marginLeft={"ml-[155px]"} />
        <CardGrid data={data} level={3} marginLeft={"ml-[2440px]"} />
        <CardGrid data={data} level={4} marginLeft={"ml-[155px]"} />
      </div>
    </main>
  );
};

export default LivePage;
