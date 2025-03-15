import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.playtimeUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createPlaylist(playlist) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlists`, playlist);
    return res.data;
  },

  async deleteAllPlaylists() {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists`);
    return response.data;
  },

  async deletePlaylist(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists/${id}`);
    return response;
  },

  async getAllPlaylists() {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists`);
    return res.data;
  },

  async getPlaylist(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists/${id}`);
    return res.data;
  },

  async getAllTracks() {
    const res = await axios.get(`${this.playtimeUrl}/api/tracks`);
    return res.data;
  },

  async createTrack(id, track) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlists/${id}/tracks`, track);
    return res.data;
  },

  async deleteAllTracks() {
    const res = await axios.delete(`${this.playtimeUrl}/api/tracks`);
    return res.data;
  },

  async getTrack(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/tracks/${id}`);
    return res.data;
  },

  async deleteTrack(id) {
    const res = await axios.delete(`${this.playtimeUrl}/api/tracks/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.playtimeUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
