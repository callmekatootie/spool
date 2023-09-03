/**
 * !TODO - I'd like to credit the original author
 * https://github.com/stevenlafl/threads-web-client/blob/master/src/pages/api/video/%5B...path%5D.ts
 */

import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParse: false,
    responseLimit: false,
  },
};

export default async function proxyVideo(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return new Promise<void>((resolve, reject) => {
    const { source } = req.query;

    const url = new URL(decodeURIComponent(source as string));

    const { origin, pathname, searchParams } = url;

    const finalUrl = `${origin}${pathname}?${searchParams}`;

    proxy.web(
      req,
      res,
      {
        target: finalUrl,
        changeOrigin: true,
        ignorePath: true,
        followRedirects: true,
      },
      (error) => {
        if (error) {
          console.log("ERROR");
          console.log(error);
          return reject(error);
        }

        resolve();
      },
    );
  });
}
