import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, resp) {
  await dbConnect();
  const token = await getToken({ req });
  if (token && req.method === "GET") {
    const currentUser = await User.findOne({ email: token.email });
    if (!currentUser) {
      return resp.status(404).json({ status: "Account not found" });
    }

    return resp.status(200).json(currentUser);
  }
}
