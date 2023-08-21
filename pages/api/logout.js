import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({})
  }

  req.session.destroy();
  res.json({
    isLoggedIn: false,
  });
}, sessionOptions);
