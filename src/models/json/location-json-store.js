import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const locationJsonStore = {
  async getAlllocations() {
    await db.read();
    return db.data.locations;
  },

  async addlocation(placelistId, location) {
    await db.read();
    location._id = v4();
    location.placelistid = placelistId;
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  async getlocationsByplacelistId(id) {
    await db.read();
    let t = db.data.locations.filter((location) => location.placelistid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getlocationById(id) {
    await db.read();
    let t = db.data.locations.find((location) => location._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deletelocation(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    if (index !== -1) db.data.locations.splice(index, 1);
    await db.write();
  },

  async deleteAlllocations() {
    db.data.locations = [];
    await db.write();
  },

  async updatelocation(location, updatedlocation) {
    location.locationname = updatedlocation.locationname;
    location.latitude = updatedlocation.latitude;
    location.longitude = updatedlocation.longitude;
    await db.write();
  },
};
