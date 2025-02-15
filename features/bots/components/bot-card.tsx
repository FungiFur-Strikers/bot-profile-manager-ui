"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useBotProfileApi } from "../hooks/useBotProfileApi";
import { Bot } from "../types";
import { BotDeleteComponent } from "./bot-delete";
import BotFormComponent from "./bot-form";

export interface BotCardProps {
  bot: Bot;
  expandedBot: string | null;
  setExpandedBot: (botId: string | null) => void;
}

const BotCardComponent = ({
  bot,
  setExpandedBot,
  expandedBot,
}: BotCardProps) => {
  const isOpen = expandedBot === bot.botId;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const {
    mutation: { refetch },
  } = useBotProfileApi({ botId: "*" });

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [isOpen]);

  const handleToggle = () => setExpandedBot(isOpen ? null : bot.botId);

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader
        onClick={handleToggle}
        className="flex flex-row items-center justify-between p-6 cursor-pointer hover:bg-accent/50 transition-colors gap-4"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/10">
            <AvatarImage src={bot.avatar} alt={bot.name} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {bot.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <CardTitle className="text-xl line-clamp-1">{bot.name}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {bot.language}
            </p>
            <div className="text-xs text-muted-foreground">{bot.botId}</div>
          </div>
        </div>
        <div className="text-muted-foreground">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </CardHeader>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-200"
        style={{ height: isOpen ? `${contentHeight}px` : 0 }}
      >
        <CardContent
          className="px-6 pb-6"
          copyText={JSON.stringify(bot, null, 2)}
        >
          <div className="space-y-4">
            <div className="flex gap-2">
              <BotFormComponent onRegister={refetch} initialBot={bot}>
                Edit
              </BotFormComponent>

              <BotDeleteComponent>Delete</BotDeleteComponent>
            </div>

            <p className="text-muted-foreground">{bot.personality}</p>
            <pre className="rounded-lg bg-muted p-4 overflow-auto text-sm whitespace-pre-wrap">
              <code className="whitespace-pre-wrap">
                {JSON.stringify(bot, null, 2)}
              </code>
            </pre>
            <div className="text-xs text-muted-foreground">
              Updated: {format(new Date(bot.updatedAt), "PPp")}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BotCardComponent;
