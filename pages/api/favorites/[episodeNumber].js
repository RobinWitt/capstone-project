import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, resp) {
  await dbConnect();
  const { episodeNumber } = req.query;
  const token = await getToken({ req });
  if (token && req.method === "GET") {
    const currentUser = await User.findOne({ email: token.email });
    if (!currentUser) {
      return resp.status(404).json({ status: "Account not found" });
    }

    return resp.status(200).json(currentUser.favorites);
  }

  if (token && req.method === "PUT") {
    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      { $push: { favorites: req.body } }
    );

    if (!updatedUser) {
      return resp.status(404).json({ status: "could not add favorite" });
    }

    return resp.status(200).json("favorite added");
  }

  if (token && req.method === "DELETE") {
    const updatedUser = await User.findOneAndUpdate(
      { email: token.email },
      { $pull: { favorites: req.body } }
    );

    if (!updatedUser) {
      return resp.status(404).json({ status: "could not delete favorite" });
    }

    return resp.status(200).json("favorite deleted");
  }
}
