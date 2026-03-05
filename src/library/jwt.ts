import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const issuer = process.env.JWT_ISSUER;

export async function signToken(
  payload: { userId: string; email: string },
  expiresInSeconds: number,
) {
  if (!secret) throw new Error("JWT_SECRET missing");
  if (!issuer) throw new Error("JWT_ISSUER missing");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresInSeconds)
    .setSubject(payload.userId)
    .sign(secret);
}

export async function verifyToken(token: string) {
  if (!secret) throw new Error("JWT_SECRET missing");
  if (!issuer) throw new Error("JWT_ISSUER missing");

  const { payload } = await jwtVerify(token, secret, {
    issuer,
  });

  return payload;
}
