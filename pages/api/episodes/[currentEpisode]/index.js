import dbConnect from "@/db/connect";
import Episode from "@/db/models/Episode";

export default async function handler(req, res) {
  await dbConnect();
  const { currentEpisode } = req.query;

  switch (req.method) {
    case "GET": {
      const episode = await Episode.findOne({ nummer: currentEpisode });

      if (!episode) {
        return res.status(404).json({ status: "Not Found" });
      }

      return res.status(200).json(episode);
    }
    default: {
      return res.status(405).json({ status: "Method not allowed" });
    }
  }
}
