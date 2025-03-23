import Boom from "@hapi/boom";
import { IdSpec, placelistArraySpec, placelistSpec, placelistSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placelistApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placelists = await db.placelistStore.getAllplacelists();
        return placelists;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: placelistArraySpec, failAction: validationError },
    description: "Get all placelists",
    notes: "Returns all placelists",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placelist = await db.placelistStore.getplacelistById(request.params.id);
        if (!placelist) {
          return Boom.notFound("No Placelist with this id");
        }
        return placelist;
      } catch (err) {
        return Boom.serverUnavailable("No Placelist with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placelist",
    notes: "Returns a placelist",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: placelistSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placelist = request.payload;
        const newplacelist = await db.placelistStore.addplacelist(placelist);
        if (newplacelist) {
          return h.response(newplacelist).code(201);
        }
        return Boom.badImplementation("error creating placelist");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Placelist",
    notes: "Returns the newly created placelist",
    validate: { payload: placelistSpec, failAction: validationError },
    response: { schema: placelistSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placelist = await db.placelistStore.getplacelistById(request.params.id);
        if (!placelist) {
          return Boom.notFound("No Placelist with this id");
        }
        await db.placelistStore.deleteplacelistById(placelist._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placelist with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placelist",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placelistStore.deleteAllplacelists();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placelistApi",
  },
};
