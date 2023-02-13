import dbConnect from "@/db/connect";
import Episode from "@/db/models/Episode";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const episodes = await Episode.find();

      if (!episodes) {
        return res.status(404).json({ status: "Episodes not found" });
      }

      return res.status(200).json(episodes);
  }
}
