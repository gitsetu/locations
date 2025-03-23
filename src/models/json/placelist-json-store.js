import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { locationJsonStore } from "./location-json-store.js";

export const placelistJsonStore = {
  async getAllplacelists() {
    await db.read();
    return db.data.placelists;
  },

  async addplacelist(placelist) {
    await db.read();
    placelist._id = v4();
    db.data.placelists.push(placelist);
    await db.write();
    return placelist;
  },

  async getplacelistById(id) {
    await db.read();
    let list = db.data.placelists.find((placelist) => placelist._id === id);
    if (list) {
      list.locations = await locationJsonStore.getlocationsByplacelistId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserplacelists(userid) {
    await db.read();
    return db.data.placelists.filter((placelist) => placelist.userid === userid);
  },

  async deleteplacelistById(id) {
    await db.read();
    const index = db.data.placelists.findIndex((placelist) => placelist._id === id);
    if (index !== -1) db.data.placelists.splice(index, 1);
    await db.write();
  },

  async deleteAllplacelists() {
    db.data.placelists = [];
    await db.write();
  },
};
