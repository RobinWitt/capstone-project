import mongoose from "mongoose";
const { Schema } = mongoose;

const EpisodeSchema = new Schema({
  nummer: { Number, required: true },
  titel: { String, required: true },
  autor: String,
  hörspielskriptautor: String,
  beschreibung: String,
  veröffentlichungsdatum: String,
  kapitel: [{ titel: String }],
  sprecher: [[String, String]],
  links: {
    json: String,
    cover: String,
    cover_itunes: String,
    cover_kosmos: String,
  },
  teile: [
    {
      teilNummer: Number,
      buchstabe: String,
      titel: String,
      autor: String,
      beschreibung: String,
      kapitel: [{ titel: String }],
      sprecher: [[String, String]],
    },
  ],
});

const Episode =
  mongoose.models.Episode || mongoose.model("Episode", EpisodeSchema);

export default Episode;
