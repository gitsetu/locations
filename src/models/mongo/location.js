import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  locationname: String,
  latitude: Number,
  longitude: Number,
  placelistid: {
    type: Schema.Types.ObjectId,
    ref: "placelist",
  },
});

export const Location = Mongoose.model("location", locationSchema);
