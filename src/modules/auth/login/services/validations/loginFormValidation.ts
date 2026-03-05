import { z } from "zod";

export const loginFormSchema = z.object({
  userSearchValue: z.string(),
  password: z.string(),
  rememberMe: z.coerce.boolean().default(false),
});

export type LoginFormSchema = z.input<typeof loginFormSchema>;
