import dbConnect from "@/db/connect";
import Episode from "@/db/models/Episode";

export default async function handler(request, response) {
  await dbConnect();
  const { currentEpisode } = request.query;

  if (request.method === "GET") {
    const episode = await Episode.findOne({ nummer: currentEpisode });
    if (!episode) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(episode);
  }
}
