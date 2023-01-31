import mongoose from "mongoose";
const { Schema } = mongoose;

const episodeSchema = new Schema({
  nummer: { type: Number, required: true },
  titel: { type: String, required: true },
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
  mongoose.models.Episode || mongoose.model("Episode", episodeSchema);

export default Episode;
