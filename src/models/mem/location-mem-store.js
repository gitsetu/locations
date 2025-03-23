import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAlllocations() {
    return locations;
  },

  async addlocation(placelistId, location) {
    location._id = v4();
    location.placelistid = placelistId;
    locations.push(location);
    return location;
  },

  async getlocationsByplacelistId(id) {
    return locations.filter((location) => location.placelistid === id);
  },

  async getlocationById(id) {
    let foundlocation = locations.find((location) => location._id === id);
    if (!foundlocation) {
      foundlocation = null;
    }
    return foundlocation;
  },

  async getplacelistlocations(placelistId) {
    let foundlocations = locations.filter((location) => location.placelistid === placelistId);
    if (!foundlocations) {
      foundlocations = null;
    }
    return foundlocations;
  },

  async deletelocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    if (index !== -1) locations.splice(index, 1);
  },

  async deleteAlllocations() {
    locations = [];
  },

  async updatelocation(location, updatedlocation) {
    location.locationname = updatedlocation.locationname;
    location.latitude = updatedlocation.latitude;
    location.longitude = updatedlocation.longitude;
  },
};
