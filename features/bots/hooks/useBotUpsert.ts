import { botProfileRegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Bot } from "../types";

export interface useBotUpsertOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  initialBot?: Bot;
}

export const useBotUpsert = (options?: useBotUpsertOptions) => {
  const form = useForm<Pick<Bot, "name" | "avatar" | "personality" | "botId">>({
    resolver: zodResolver(botProfileRegisterSchema),
    defaultValues: {
      name: options?.initialBot?.name ?? "",
      avatar: options?.initialBot?.avatar ?? "",
      personality: options?.initialBot?.personality ?? "",
      botId: options?.initialBot?.botId ?? "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["bots"],
    mutationFn: async (
      formdata: Pick<Bot, "name" | "avatar" | "personality" | "botId">
    ) => {
      const response = await fetch("/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formdata.name,
          personality: formdata.personality,
          avatar: formdata.avatar,
          botId: formdata.botId,
        }),
      });

      return response.json();
    },
    onSuccess: () => options?.onSuccess?.(),
    onError: options?.onError,
  });

  return {
    form,
    mutation,
  };
};
