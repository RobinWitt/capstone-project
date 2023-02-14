import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req });
  const { episodeNumber } = req.query;

  if (token)
    switch (req.method) {
      case "PUT": {
        const updatedUser = await User.findOneAndUpdate(
          { id: token.user.id },
          { $push: { favorites: parseInt(episodeNumber) } }
        );

        if (!updatedUser) {
          return res.status(404).json({ status: "could not add favorite" });
        }

        return res.status(200).json({ status: "favorite added" });
      }

      case "DELETE": {
        const updatedUser = await User.findOneAndUpdate(
          { id: token.user.id },
          { $pull: { favorites: parseInt(episodeNumber) } }
        );

        if (!updatedUser) {
          return res.status(404).json({ status: "could not delete favorite" });
        }

        return res.status(200).json({ status: "favorite deleted" });
      }
      default: {
        return res.status(405).json({ status: "Method not allowed" });
      }
    }
}
