import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/utils/session";

export default withIronSessionApiRoute(async (req, res) => {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}, sessionOptions);
