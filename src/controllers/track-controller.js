import { TrackSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const trackController = {
  index: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      const track = await db.trackStore.getTrackById(request.params.trackid);
      const viewData = {
        title: "Edit Song",
        playlist: playlist,
        track: track,
      };
      return h.view("track-view", viewData);
    },
  },

  update: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("track-view", { title: "Edit track error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const track = await db.trackStore.getTrackById(request.params.trackid);
      const newTrack = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.trackStore.updateTrack(track, newTrack);
      return h.redirect(`/playlist/${request.params.id}`);
    },
  },
};
