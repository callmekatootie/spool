import { ThreadsAPI } from "threads-api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

import path from "path";
import { promises as fs } from "fs";

export default withIronSessionApiRoute(async function handler(req, res) {
  let { username, cursor } = req.query;

  username = decodeURIComponent(username);

  let data = [];

  if (req.session.user) {
    try {
      data = await getThreadsWithAuth(username, cursor, req.session.user);
    } catch (e) {
      if (e.message?.includes("login_required")) {
        return res
          .status(401)
          .json({ threads: [], message: "login_required" });
      }

      return res
        .status(500)
        .json({ threads: [], message: "An error occurred" });
    }
  } else {
    data = await getThreadsWithoutAuth(username);
  }

  res.json(data);

  // const jsonDirectory = path.join(process.cwd(), "json");
  // const fileContents = await fs.readFile(
  //   jsonDirectory + `/${username}.json`,
  //   "utf-8",
  // );

  // res.status(200).json({ threads: JSON.parse(fileContents), cursor: cursor ?? 0 });
}, sessionOptions);

async function getThreadsWithoutAuth(username) {
  const threadsApi = new ThreadsAPI({
    deviceID: process.env.DEVICE_ID,
  });

  console.log("~~~GETTING THREADS W/O AUTH");

  const userID = await threadsApi.getUserIDfromUsername(username);
  const posts = await threadsApi.getUserProfileThreads(userID);

  return { threads: posts };
}

async function getThreadsWithAuth(username, cursor, auth) {
  const threadsApi = new ThreadsAPI({
    deviceID: process.env.DEVICE_ID,
    ...auth,
  });

  console.log("~~~GETTING THREADS WITH AUTH");

  const userID = await threadsApi.getUserIDfromUsername(username);
  const posts = await threadsApi.getUserProfileThreadsLoggedIn(userID, cursor);

  return { threads: posts.threads, cursor: posts.next_max_id };
}
