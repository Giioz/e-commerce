import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@/src/library/db";
import { user_role } from "@/generated/prisma/enums";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email satisfies string,
      username: attributes.username satisfies string,
      role: attributes.role satisfies user_role,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseUserAttributes: {
      email: string;
      username: string;
      role: user_role;
    };
  }
}
