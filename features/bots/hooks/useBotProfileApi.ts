import { useQuery } from "@tanstack/react-query";
import { useBotProfileStore } from "../store/bot-profile-stoer";
import { Bot } from "../types";

export interface BotProfileApiOptions {
  botId?: string;
}

export const useBotProfileApi = (options: BotProfileApiOptions) => {
  const { setBotList } = useBotProfileStore();

  const mutation = useQuery<Bot[]>({
    queryKey: ["bots/" + options.botId],
    queryFn: async () => {
      const response = await fetch("/api/bots?bot-id=" + options.botId);
      if (!response.ok) {
        throw new Error("Failed to fetch bots");
      }
      const botList: Bot[] = await response.json();
      setBotList(botList);
      return botList;
    },
  });

  return {
    mutation,
  };
};
