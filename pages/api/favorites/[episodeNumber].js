import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, resp) {
  await dbConnect();
  const token = await getToken({ req });
  const { episodeNumber } = req.query;

  if (token && req.method === "PUT") {
    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      { $push: { favorites: parseInt(episodeNumber) } }
    );

    if (!updatedUser) {
      return resp.status(404).json({ status: "could not add favorite" });
    }

    return resp.status(200).json({ status: "favorite added" });
  }

  if (token && req.method === "DELETE") {
    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      { $pull: { favorites: parseInt(episodeNumber) } }
    );

    if (!updatedUser) {
      return resp.status(404).json({ status: "could not delete favorite" });
    }

    return resp.status(200).json({ status: "favorite deleted" });
  }
}
