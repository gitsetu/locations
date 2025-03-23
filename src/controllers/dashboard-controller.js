import { placelistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const placelists = await db.placelistStore.getUserplacelists(loggedInUser._id);
      const viewData = {
        title: "App Dashboard",
        user: loggedInUser,
        placelists: placelists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addplacelist: {
    validate: {
      payload: placelistSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Placelist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newplacelist = {
        userid: loggedInUser._id,
        placelistname: request.payload.placelistname,
      };
      await db.placelistStore.addplacelist(newplacelist);
      return h.redirect("/dashboard");
    },
  },

  deleteplacelist: {
    handler: async function (request, h) {
      const placelist = await db.placelistStore.getplacelistById(request.params.id);
      await db.placelistStore.deleteplacelistById(placelist._id);
      return h.redirect("/dashboard");
    },
  },
};
