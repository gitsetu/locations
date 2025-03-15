import { Playlist } from "./playlist.js";
import { trackMongoStore } from "./track-mongo-store.js";

export const playlistMongoStore = {
  async getAllPlaylists() {
    const playlists = await Playlist.find().lean();
    return playlists;
  },

  async getPlaylistById(id) {
    if (id) {
      const playlist = await Playlist.findOne({ _id: id }).lean();
      if (playlist) {
        playlist.tracks = await trackMongoStore.getTracksByPlaylistId(playlist._id);
      }
      return playlist;
    }
    return null;
  },

  async addPlaylist(playlist) {
    const newPlaylist = new Playlist(playlist);
    const playlistObj = await newPlaylist.save();
    return this.getPlaylistById(playlistObj._id);
  },

  async getUserPlaylists(id) {
    const playlist = await Playlist.find({ userid: id }).lean();
    return playlist;
  },

  async deletePlaylistById(id) {
    try {
      await Playlist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaylists() {
    await Playlist.deleteMany({});
  },

  async updatePlaylist(updatedPlaylist) {
    const playlist = await Playlist.findOne({ _id: updatedPlaylist._id });
    playlist.title = updatedPlaylist.title;
    playlist.img = updatedPlaylist.img;
    await playlist.save();
  },
};
