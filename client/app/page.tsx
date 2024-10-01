import Hero from "@/components/layouts/hero";
import Info from "@/components/layouts/info";
import ListTopic from "@/components/layouts/list-topic";
import ListeningTest from "@/components/layouts/listening-test";
import Topics from "@/components/layouts/topics";

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-4 p-8 mt-4 bg-white rounded-lg shadow-lg">
      <div className="col-span-2">
        <Topics />
      </div>
      <div>
        <Info />
      </div>
    </main>
  );
}
