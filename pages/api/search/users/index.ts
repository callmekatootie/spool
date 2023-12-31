import { ThreadsAPI } from "threads-api";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";
import type { SearchUsersResponse } from "threads-api";

import path from "path";
import { promises as fs } from "fs";

export default withIronSessionApiRoute(async function handler(req, res) {
  if (!req.session.user) {
    res.status(401).send({});

    return;
  }

  const { q } = req.query;

  if (typeof q !== "string") {
    res.status(400).send({ message: "missing search query" });

    return;
  }

  const query = decodeURIComponent(q);

  let results: SearchUsersResponse["users"] = [];

  if (req.session.user && q.length) {
    const threadsApi = new ThreadsAPI({
      deviceID: process.env.DEVICE_ID,
      ...req.session.user,
    });

    const data = await threadsApi.searchUsers(query, 7);

    results = data.users;
    // const jsonDirectory = path.join(process.cwd(), "json");
    // const fileContents = await fs.readFile(
    //   jsonDirectory + `/search-results.json`,
    //   "utf-8",
    // );

    // results = JSON.parse(fileContents).users
  }

  res.json(results);
}, sessionOptions);
