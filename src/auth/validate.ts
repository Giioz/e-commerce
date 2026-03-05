import { cookies } from "next/headers";
import { auth } from "@/src/auth/auth";

export async function validateRequest() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(auth.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await auth.validateSession(sessionId);

  if (result.session?.fresh) {
    const sessionCookie = auth.createSessionCookie(result.session.id);
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }

  if (!result.session) {
    const blankCookie = auth.createBlankSessionCookie();
    cookieStore.set(
      blankCookie.name,
      blankCookie.value,
      blankCookie.attributes,
    );
  }

  return result;
}
