import { z } from "zod";

export const postUserSchema = z.object({
  name: z.string().min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს."),
  username: z
    .string()
    .min(2, "მომხმარებლის სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს."),
  email: z.email("არასწორი იმაილის სინტაქსი.").min(3),
  password: z
    .string()
    .min(8, "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.")
    .regex(/[a-z]/, "პაროლი უნდა შეიცავდეს ერთ პატარა ასოს მაინც.")
    .regex(/[A-Z]/, "პაროლი უნდა შეიცავდეს ერთ დიდ ასოს მაინც.")
    .regex(/[0-9]/, "პაროლი უნდა შეიცავდეს ერთ ციფრს მაინც.")
    .regex(
      /[^A-Za-z0-9]/,
      "პაროლი უნდა შეიცავდეს ერთ განსაკუთრებულ სიმბოლოს მაინც.",
    ),
  agree: z.coerce.boolean().default(false),
});

export type PostUserSchema = z.input<typeof postUserSchema>;
