'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';
import { format } from 'date-fns';

interface Bot {
  botId: string;
  name: string;
  personality: string;
  avatar: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export function BotList() {
  const [expandedBot, setExpandedBot] = useState<string | null>(null);

  const { data: bots, isLoading, error } = useQuery<Bot[]>({
    queryKey: ['bots'],
    queryFn: async () => {
      const response = await fetch('/api/bots');
      if (!response.ok) {
        throw new Error('Failed to fetch bots');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bots?.map((bot) => (
        <Card
          key={bot.botId}
          className="cursor-pointer transition-shadow hover:shadow-lg"
          onClick={() => setExpandedBot(expandedBot === bot.botId ? null : bot.botId)}
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={bot.avatar} alt={bot.name} />
              <AvatarFallback>
                <Bot className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{bot.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{bot.language}</p>
            </div>
          </CardHeader>
          <CardContent>
            {expandedBot === bot.botId ? (
              <pre className="mt-4 rounded-lg bg-muted p-4 overflow-auto">
                <code>{JSON.stringify(bot, null, 2)}</code>
              </pre>
            ) : (
              <p className="text-muted-foreground line-clamp-2">{bot.personality}</p>
            )}
            <div className="mt-4 text-xs text-muted-foreground">
              Updated: {format(new Date(bot.updatedAt), 'PPp')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}