import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placelistSchema = new Schema({
  placelistname: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placelist = Mongoose.model("placelist", placelistSchema);
