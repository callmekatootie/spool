import Spool from "@/components/spool";

export default function Home() {
  return (
    <div className="bg-zinc-50 text-gray-900 flex flex-col h-screen">
      <main className="flex overflow-x-auto p-2 pb-px grow">
        <Spool username="_junhoyeo" />
      </main>
    </div>
  );
}
