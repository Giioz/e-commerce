"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/src/library/db";
import { verifyPassword } from "@/src/auth/password";
import { auth } from "@/src/auth/auth";
import {
  loginFormSchema,
  LoginFormSchema,
} from "./validations/loginFormValidation";

export async function loginAction(data: LoginFormSchema) {
  const parsed = loginFormSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("არასწორი ველები!");
  }

  const { userSearchValue, password, rememberMe } = parsed.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: userSearchValue }, { username: userSearchValue }],
    },
    select: { id: true, email: true, username: true, password: true },
  });

  if (!user) throw new Error("იმეილი ან პაროლი არასწორია.");

  const ok = await verifyPassword(password, user.password);
  if (!ok) throw new Error("იმეილი ან პაროლი არასწორია.");

  const session = await auth.createSession(user.id, {});

  const sessionCookie = auth.createSessionCookie(session.id);

  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, sessionCookie.value, {
    ...sessionCookie.attributes,
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined,
  });

  // FIX: es link unda chanacvldes namdvili userdashboard linkit an homepageit
  redirect("/asmcaks");
}
