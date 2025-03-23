import { Location } from "./location.js";
import { Placelist } from "./placelist.js";

export const locationMongoStore = {
  async getAlllocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addlocation(placelistId, location) {
    location.placelistid = placelistId;
    const newlocation = new Location(location);
    const locationObj = await newlocation.save();
    return this.getlocationById(locationObj._id);
  },

  async getlocationsByplacelistId(id) {
    const locations = await Location.find({ placelistid: id }).lean();
    return locations;
  },

  async getlocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deletelocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAlllocations() {
    await Location.deleteMany({});
  },

  async updatelocation(location, updatedlocation) {
    const locationDoc = await Location.findOne({ _id: location._id})
    locationDoc.locationname = updatedlocation.locationname;
    locationDoc.latitude = updatedlocation.latitude;
    locationDoc.longitude = updatedlocation.longitude;
    await locationDoc.save();
  },
};
