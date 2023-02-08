import dbConnect from "@/db/connect";
import User from "@/db/models/User";

const email = "max-muster@web.de";

export default async function handler(request, response) {
  await dbConnect();
  const currentEmail = email;

  if (request.method === "GET") {
    const currentUser = await User.findOne({ email: currentEmail });
    if (!currentUser) {
      return response.status(404).json({ status: "Account not found" });
    }

    return response.status(200).json(currentUser);
  }

  if (request.method === "POST") {
    try {
      const newUserData = request.body;

      const newUser = new User(newUserData);

      await newUser.save();

      return response.status(201).json({ status: "Account created" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
