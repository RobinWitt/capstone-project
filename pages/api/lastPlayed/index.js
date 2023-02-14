import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req });
  const lastPlayed = await req.body;
  console.log(lastPlayed);

  if (token)
    switch (req.method) {
      case "PUT": {
        const updatedUser = await User.findOneAndUpdate(
          { id: token.user.id },
          { $set: { lastPlayed: lastPlayed } }
        );

        if (!updatedUser) {
          return res.status(404).json({ status: "COULD NOT SAVE TRACK" });
        }

        return res.status(200).json({ status: "TRACK WAS SAVED" });
      }
      default: {
        return res.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
