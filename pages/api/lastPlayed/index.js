import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  await dbConnect();
  const token = await getToken({ req: request });
  const lastPlayed = await request.body;

  if (token)
    switch (request.method) {
      case "PUT": {
        const updatedUser = await User.findOneAndUpdate(
          { id: token.user.id },
          { $set: { lastPlayed: lastPlayed } }
        );

        if (!updatedUser) {
          return response.status(404).json({ status: "COULD NOT SAVE TRACK" });
        }

        return response.status(200).json({ status: "TRACK WAS SAVED" });
      }
      default: {
        return response.status(405).json({ status: "METHOD NOT ALLOWED" });
      }
    }
}
