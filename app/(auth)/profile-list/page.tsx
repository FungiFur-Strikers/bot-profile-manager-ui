import { BotList } from "@/features/bots/components/bot-list";
import { Header } from "@/components/base/header";

export default function ProfileListPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <BotList />
      </main>
    </div>
  );
}
