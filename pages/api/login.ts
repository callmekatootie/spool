import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";
import { ThreadsAPI } from "threads-api";
import type { SessionUser } from "@/application-types";

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({});
  }

  try {
    const user: SessionUser = {} as SessionUser;

    const threadsApi = new ThreadsAPI({
      username: process.env.THREADS_USERNAME,
      password: process.env.THREADS_PASSWORD,
      deviceID: process.env.DEVICE_ID,
    });

    const token = await threadsApi.getToken();
    if (!token) {
      throw new Error("Login failed. Could not get auth token.")
    }
    user.token = token

    const userId = await threadsApi.getCurrentUserID();
    if (!userId) {
      throw new Error("Login failed. Could not get logged in user id")
    }
    user.userID = userId

    req.session.user = user;
    await req.session.save();
    res.json({
      ...user,
      isLoggedIn: true,
    });
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred during login" });
    }
  }
}, sessionOptions);
