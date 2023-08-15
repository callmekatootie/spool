import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";
import { ThreadsAPI } from "threads-api";

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const user = {};

    const threadsApi = new ThreadsAPI({
      username: process.env.THREADS_USERNAME,
      password: process.env.THREADS_PASSWORD,
      deviceID: process.env.DEVICE_ID,
    });

    user.token = await threadsApi.getToken();
    user.userID = await threadsApi.getCurrentUserID();

    req.session.user = user;
    await req.session.save();
    res.json({
      ...user,
      isLoggedIn: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
