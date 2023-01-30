import dbConnect from "@/db/connect";
import Episode from "@/db/models/Episode";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const episodes = await Episode.find();
    return response.status(200).json(episodes);
  }
}
