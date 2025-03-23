import { locationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const placelist = await db.placelistStore.getplacelistById(request.params.id);
      const location = await db.locationStore.getlocationById(request.params.locationid);
      const viewData = {
        title: "Edit Location",
        placelist: placelist,
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  update: {
    validate: {
      payload: locationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Edit location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getlocationById(request.params.locationid);
      const newlocation = {
        locationname: request.payload.locationname,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.locationStore.updatelocation(location, newlocation);
      return h.redirect(`/placelist/${request.params.id}`);
    },
  },
};
