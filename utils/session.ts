import type { IronSessionOptions } from "iron-session";
import type { SessionUser } from "@/application-types";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "spool-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
  }
}
