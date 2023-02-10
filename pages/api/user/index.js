import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, resp) {
  const conn = await dbConnect();

  const session = await conn.startSession();
  await session.withTransaction(async () => {
    const token = await getToken({ req });

    if (token && req.method === "GET") {
      const existingUser = await User.findOne({ sub: token.sub });

      if (!existingUser) {
        const newUser = new User({
          sub: token.sub,
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
