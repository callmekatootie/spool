import { ThreadsAPI } from "threads-api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.session.user) {
    res.status(401).send({});

    return;
  }
  const { id } = req.query;

  if (req.method === "POST") {
    const threadsApi = new ThreadsAPI({
      deviceID: process.env.DEVICE_ID,
      ...req.session.user,
    });

    await threadsApi.like(id);

    res.status(200).json({});
  } else if (req.method === "DELETE") {
    const threadsApi = new ThreadsAPI({
      deviceID: process.env.DEVICE_ID,
      ...req.session.user,
    });

    await threadsApi.unlike(id);

    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}, sessionOptions);
