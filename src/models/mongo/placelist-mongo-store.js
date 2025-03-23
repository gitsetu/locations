import { Placelist } from "./placelist.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const placelistMongoStore = {
  async getAllplacelists() {
    const placelists = await Placelist.find().lean();
    return placelists;
  },

  async getplacelistById(id) {
    if (id) {
      const placelist = await Placelist.findOne({ _id: id }).lean();
      if (placelist) {
        placelist.locations = await locationMongoStore.getlocationsByplacelistId(placelist._id);
      }
      return placelist;
    }
    return null;
  },

  async addplacelist(placelist) {
    const newplacelist = new Placelist(placelist);
    const placelistObj = await newplacelist.save();
    return this.getplacelistById(placelistObj._id);
  },

  async getUserplacelists(id) {
    const placelist = await Placelist.find({ userid: id }).lean();
    return placelist;
  },

  async deleteplacelistById(id) {
    try {
      // TODO: Cascade on Mongo DB - DONE!
      // Delete all locations from list prior to deleting the list
      await locationMongoStore.deleteAlllocationsFromPlacelist(id)
      // Delete list
      await Placelist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllplacelists() {
    await Placelist.deleteMany({});
  },

  async updateplacelist(updatedplacelist) {
    const placelist = await Placelist.findOne({ _id: updatedplacelist._id });
    placelist.placelistname = updatedplacelist.placelistname;
    placelist.img = updatedplacelist.img;
    await placelist.save();
  },
};
