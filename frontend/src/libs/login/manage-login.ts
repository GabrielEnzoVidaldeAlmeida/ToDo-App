import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString("base64");
  return base64;
}

type JwtPayload = {
  name: string;
  expiresAt: Date;
};

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, "base64").toString("utf-8");
  return bcrypt.compare(password, hash);
}

// export async function createLoginSession(user: {
//   id: string;
//   username: string;
// }) {
//   const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
//   const loginSession = await signJwt({
//     userId: user.id,
//     username: user.username,
//     expiresAt,
//   });
//   const cookieStore = await cookies();

//   cookieStore.set(loginCookieName, loginSession, {
//     httpOnly: true,
//     secure: true,
//     sameSite: true,
//     expires: expiresAt,
//   });
// }

export async function createLoginSessionFromApi(jwt: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = jwt;
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, "", { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function getLoginSessionForApi() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return jwt;
}

export async function requireLoginSessionForApiOrRedirect() {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    redirect("/login");
  }
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(loginCookieName)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, jwtEncodedKey);
    return {
      id: payload.userId as string,
      username: payload.username as string,
    };
  } catch {
    console.log("JWT inválido");
    return null;
  }
}
