import { ThreadsAPI } from "threads-api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

import path from "path";
import { promises as fs } from "fs";

export default withIronSessionApiRoute(async function handler(req, res) {
  const { q } = req.query
  const query = decodeURIComponent(q)

  let results = []

  if (req.session.user && q.length) {
    const threadsApi = new ThreadsAPI({
      deviceID: process.env.DEVICE_ID,
      ...req.session.user,
    });

    const data = await threadsApi.searchUsers(query, 7)

    results = data
    // const jsonDirectory = path.join(process.cwd(), "json");
    // const fileContents = await fs.readFile(
    //   jsonDirectory + `/search-results.json`,
    //   "utf-8",
    // );

    // results = JSON.parse(fileContents)
  }

  res.json(results)
}, sessionOptions);
