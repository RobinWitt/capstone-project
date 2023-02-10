import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, resp) {
  const conn = await dbConnect();

  const session = await conn.startSession();
  await session.withTransaction(async () => {
    const token = await getToken({ req });

    if (token && req.method === "GET") {
      const existingUser = await User.findOne({ id: token.user.id });

      if (!existingUser) {
        const newUser = new User({
          id: token.user.id,
          favorites: [],
        });

        await newUser.save();

        return resp.status(201).json(newUser, { status: "CREATED NEW USER" });
      }
      return resp.status(200).json(existingUser);
    }
  });

  session.endSession();
}
