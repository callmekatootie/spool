import { ThreadsAPI } from "threads-api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.session.user) {
    res.status(401).send({});

    return;
  }
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).send({ message: "id must be a single string" })

    return
  }

  if (req.method === "POST") {
    try {
      const threadsApi = new ThreadsAPI({
        deviceID: process.env.DEVICE_ID,
        ...req.session.user,
      });

      await threadsApi.repost(id);

      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(200).json({});
    }
  } else if (req.method === "DELETE") {
    const threadsApi = new ThreadsAPI({
      deviceID: process.env.DEVICE_ID,
      ...req.session.user,
    });

    await threadsApi.unrepost(id);

    res.status(200).json({});
  } else {
    res.status(405).json({});
  }
}, sessionOptions);
