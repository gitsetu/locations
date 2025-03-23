import { locationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const placelistController = {
  index: {
    handler: async function (request, h) {
      const placelist = await db.placelistStore.getplacelistById(request.params.id);
      const viewData = {
        title: "placelist",
        placelist: placelist,
      };
      return h.view("placelist-view", viewData);
    },
  },

  addlocation: {
    validate: {
      payload: locationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placelist-view", { title: "Add location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placelist = await db.placelistStore.getplacelistById(request.params.id);
      const newlocation = {
        locationname: request.payload.locationname,
        latitude: request.payload.latitude,
        longitude: Number(request.payload.longitude),
      };
      await db.locationStore.addlocation(placelist._id, newlocation);
      return h.redirect(`/placelist/${placelist._id}`);
    },
  },

  deletelocation: {
    handler: async function (request, h) {
      const placelist = await db.placelistStore.getplacelistById(request.params.id);
      await db.locationStore.deletelocation(request.params.locationid);
      return h.redirect(`/placelist/${placelist._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const placelist = await db.placelistStore.getplacelistById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placelist.img = url;
          await db.placelistStore.updateplacelist(placelist);
        }
        return h.redirect(`/placelist/${placelist._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placelist/${placelist._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
