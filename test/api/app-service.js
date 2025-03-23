import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const appService = {
  appUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.appUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.appUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.appUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.appUrl}/api/users`);
    return res.data;
  },

  async createplacelist(placelist) {
    const res = await axios.post(`${this.appUrl}/api/placelists`, placelist);
    return res.data;
  },

  async deleteAllplacelists() {
    const response = await axios.delete(`${this.appUrl}/api/placelists`);
    return response.data;
  },

  async deleteplacelist(id) {
    const response = await axios.delete(`${this.appUrl}/api/placelists/${id}`);
    return response;
  },

  async getAllplacelists() {
    const res = await axios.get(`${this.appUrl}/api/placelists`);
    return res.data;
  },

  async getplacelist(id) {
    const res = await axios.get(`${this.appUrl}/api/placelists/${id}`);
    return res.data;
  },

  async getAlllocations() {
    const res = await axios.get(`${this.appUrl}/api/locations`);
    return res.data;
  },

  async createlocation(id, location) {
    const res = await axios.post(`${this.appUrl}/api/placelists/${id}/locations`, location);
    return res.data;
  },

  async deleteAlllocations() {
    const res = await axios.delete(`${this.appUrl}/api/locations`);
    return res.data;
  },

  async getlocation(id) {
    const res = await axios.get(`${this.appUrl}/api/locations/${id}`);
    return res.data;
  },

  async deletelocation(id) {
    const res = await axios.delete(`${this.appUrl}/api/locations/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.appUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
