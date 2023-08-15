import { useEffect, useState } from "react";
import Head from "next/head";
import Spool from "@/components/Spool";
import localforage from "@/utils/localforage";
import { SPOOL_RACK } from "@/constants";
import EmptySpool from "@/components/Spool/EmptySpool";
import Loader from "@/components/Loader";
import NotLoggedIn from "@/components/NotLoggedIn";
import { useSelf } from "@/hooks/useSelf";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [rack, setRack] = useState([]);
  const { user } = useSelf();
  let loggedInState;

  // Rack - a set of spools. In this case,
  // the spools / columns configured by the user
  useEffect(() => {
    async function fetchRack() {
      let data = await localforage.getItem(SPOOL_RACK);

      if (data) {
        setRack(data);
      } else {
        // No data found. Default to some popular accounts
        data = [
          {
            type: "single",
            username: "zuck",
          },
          {
            type: "single",
            username: "gordongram",
          },
          {
            type: "single",
            username: "shakira",
          },
        ];

        setRack(data);

        await localforage.setItem(SPOOL_RACK, data);
      }

      setLoading(false);
    }

    fetchRack();
  }, []);

  const onSpoolAddition = async (handle) => {
    const newSpool = { type: "single", username: handle };
    await localforage.setItem(SPOOL_RACK, [...rack, newSpool]);
    setRack((current) => [...current, newSpool]);
  };

  const onSpoolDeletion = async (handle) => {
    const newRack = rack.filter((s) => s.username !== handle);
    await localforage.setItem(SPOOL_RACK, newRack);
    setRack(newRack);
  };

  if (user?.isLoggedIn) {
  } else {
    loggedInState = <NotLoggedIn />;
  }

  if (loading) {
    return (
      <div className="bg-zinc-50 text-gray-900 flex flex-col h-screen">
        <Head>
          <title>Loading spools...</title>
        </Head>
        <main className="w-full h-full">
          <Loader />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 text-gray-900 flex flex-col h-screen">
      <Head>
        <title>Spool | A deck for Threads</title>
      </Head>
      <main className="flex overflow-x-auto pb-px grow">
        {rack.map(({ username }, id) => (
          <Spool key={id} username={username} onDeletion={onSpoolDeletion} />
        ))}
        <EmptySpool onEnterUsername={onSpoolAddition} />
      </main>
      {loggedInState}
    </div>
  );
}
