"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { useBotProfileApi } from "../hooks/useBotProfileApi";
import { useBotProfileStore } from "../store/bot-profile-stoer";
import BotCardComponent from "./bot-card";
import BotRegiterComponent from "./bot-register";

export function BotList() {
  const [expandedBot, setExpandedBot] = useState<string | null>(null);
  const { mutation } = useBotProfileApi({ botId: "*" });
  const { isPending, isError } = mutation;
  const { botList } = useBotProfileStore();
  if (isPending) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-24 bg-muted" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-destructive/10">
        <CardContent className="p-6">
          <p className="text-destructive">Error loading bots</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <BotRegiterComponent onRegister={mutation.refetch} />

      {botList.length === 0 && <p>Not registered</p>}
      {botList.map((bot) => (
        <BotCardComponent
          key={bot.botId}
          {...{ expandedBot, setExpandedBot, bot }}
        />
      ))}
    </div>
  );
}
