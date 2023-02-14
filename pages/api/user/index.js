import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const conn = await dbConnect();

  const session = await conn.startSession();
  await session.withTransaction(async () => {
    const token = await getToken({ req });
    if (token)
      switch (req.method) {
        case "GET": {
          const existingUser = await User.findOne({ id: token.user.id });

          if (!existingUser) {
            const newUser = new User({
              id: token.user.id,
              favorites: [],
              lastPlayed: "empty",
            });

            await newUser.save();

            return res
              .status(201)
              .json(newUser, { status: "CREATED NEW USER" });
          }
          return res.status(200).json(existingUser);
        }
        default: {
          return res.status(405).json({ status: "Method not allowed" });
        }
      }
  });

  session.endSession();
}
