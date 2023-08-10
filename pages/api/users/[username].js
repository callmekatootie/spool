import { ThreadsAPI } from "threads-api";

import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const { username } = req.query;
  
  // const threadsApi = new ThreadsAPI({
  //   deviceID: process.env.DEVICE_ID
  // })

  // const userID = await threadsApi.getUserIDfromUsername(username);
  // const posts = await threadsApi.getUserProfileThreads(userID);

  // res.status(200).json(posts)

  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(
    jsonDirectory + `/${username}.json`,
    "utf-8",
  );
  
  res.status(200).json(JSON.parse(fileContents));
}
