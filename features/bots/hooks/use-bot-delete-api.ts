import { useMutation } from "@tanstack/react-query";

export interface BotDeleteApiOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useBotDeleteApi = (options: BotDeleteApiOptions) => {
  const mutation = useMutation({
    mutationKey: ["bots"],
    mutationFn: async (botId: string) => {
      const response = await fetch(`/api/bots/${botId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bot");
      }

      return response.json();
    },
    onSuccess: () => options.onSuccess?.(),
    onError: options.onError,
  });

  return {
    mutation,
  };
};
