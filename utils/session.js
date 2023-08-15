export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "spool-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
}
