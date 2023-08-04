import { ThreadsAPI } from "threads-api";

import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  // const threadsApi = new ThreadsAPI()

  const { u: username } = req.query;

  console.log(`Fetching threads of user: ${username}`);

  const jsonDirectory = path.join(process.cwd(), "json");
  const fileContents = await fs.readFile(
    jsonDirectory + "/_junhoyeo.json",
    "utf-8",
  );

  res.status(200).json(JSON.parse(fileContents));
}
