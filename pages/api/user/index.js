import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const conn = await dbConnect();

  const session = await conn.startSession();
  await session.withTransaction(async () => {
    const token = await getToken({ req: request });
    if (token)
      switch (request.method) {
        case "GET": {
          const existingUser = await User.findOne({ id: token.user.id });

          if (!existingUser) {
            const newUser = new User({
              id: token.user.id,
              favorites: [],
              lastPlayed: { albumURI: null, trackURI: null },
            });

            await newUser.save();

            return response
              .status(201)
              .json(newUser, { status: "CREATED NEW USER" });
          }
          return response.status(200).json(existingUser);
        }
        default: {
          return response.status(405).json({ status: "Method not allowed" });
        }
      }
  });

  session.endSession();
}
