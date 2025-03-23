import { v4 } from "uuid";
import { locationMemStore } from "./location-mem-store.js";

let placelists = [];

export const placelistMemStore = {
  async getAllplacelists() {
    return placelists;
  },

  async addplacelist(placelist) {
    placelist._id = v4();
    placelists.push(placelist);
    return placelist;
  },

  async getplacelistById(id) {
    const list = placelists.find((placelist) => placelist._id === id);
    if (list) {
      list.locations = await locationMemStore.getlocationsByplacelistId(list._id);
      return list;
    }
    return null;
  },

  async getUserplacelists(userid) {
    return placelists.filter((placelist) => placelist.userid === userid);
  },

  async deleteplacelistById(id) {
    const index = placelists.findIndex((placelist) => placelist._id === id);
    if (index !== -1) placelists.splice(index, 1);
  },

  async deleteAllplacelists() {
    placelists = [];
  },
};
