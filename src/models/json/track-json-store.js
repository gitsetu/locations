import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const trackJsonStore = {
  async getAllTracks() {
    await db.read();
    return db.data.tracks;
  },

  async addTrack(playlistId, track) {
    await db.read();
    track._id = v4();
    track.playlistid = playlistId;
    db.data.tracks.push(track);
    await db.write();
    return track;
  },

  async getTracksByPlaylistId(id) {
    await db.read();
    let t = db.data.tracks.filter((track) => track.playlistid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getTrackById(id) {
    await db.read();
    let t = db.data.tracks.find((track) => track._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteTrack(id) {
    await db.read();
    const index = db.data.tracks.findIndex((track) => track._id === id);
    if (index !== -1) db.data.tracks.splice(index, 1);
    await db.write();
  },

  async deleteAllTracks() {
    db.data.tracks = [];
    await db.write();
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await db.write();
  },
};
