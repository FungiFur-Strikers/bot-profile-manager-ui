"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { Bot } from "../types";

export function BotList() {
  const [expandedBot, setExpandedBot] = useState<string | null>(null);

  const {
    data: bots,
    isLoading,
    error,
  } = useQuery<Bot[]>({
    queryKey: ["bots"],
    queryFn: async () => {
      const response = await fetch("/api/bots");
      if (!response.ok) {
        throw new Error("Failed to fetch bots");
      }
      return response.json();
    },
  });

  if (isLoading) {
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

  if (error) {
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
      {bots?.map((bot) => (
        <Card
          key={bot.botId}
          className="transition-all duration-200 hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                <AvatarImage src={bot.avatar} alt={bot.name} />
                <AvatarFallback className="bg-primary/5 text-primary">
                  {bot.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{bot.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{bot.language}</p>
              </div>
            </div>
            <button
              onClick={() =>
                setExpandedBot(expandedBot === bot.botId ? null : bot.botId)
              }
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {expandedBot === bot.botId ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </CardHeader>
          <CardContent
            className={`px-6 ${
              expandedBot === bot.botId ? "pb-6" : "h-0 overflow-hidden p-0"
            }`}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">{bot.personality}</p>
              <pre className="rounded-lg bg-muted p-4 overflow-auto text-sm">
                <code>{JSON.stringify(bot, null, 2)}</code>
              </pre>
              <div className="text-xs text-muted-foreground">
                Updated: {format(new Date(bot.updatedAt), "PPp")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
