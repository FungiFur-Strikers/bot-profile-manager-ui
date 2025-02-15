import { z } from "zod";

export const botProfileRegisterSchema = z.object({
  botId: z.string().min(1, "Bot Id is required"),
  name: z.string().min(1, "Bot Name is required"),
  personality: z.string().min(1, "Personality is required"),
  avatar: z.string().url("Avatar must be a valid URL"),
});
