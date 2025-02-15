import { Header } from "@/components/base/header";
import { BotList } from "@/features/bots/components/bot-list";

export default function ProfileListPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto p-6 flex flex-col gap-6  justify-start align-top">
        <BotList />
      </main>
    </div>
  );
}
