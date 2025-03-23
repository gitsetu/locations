import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, locationSpec, locationSpecPlus, locationArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const locationApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAlllocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: locationArraySpec, failAction: validationError },
    description: "Get all locationApi",
    notes: "Returns all locationApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const location = await db.locationStore.getlocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No location with this id");
      }
    },
    tags: ["api"],
    description: "Find a location",
    notes: "Returns a location",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: locationSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.addlocation(request.params.id, request.payload);
        if (location) {
          return h.response(location).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a location",
    notes: "Returns the newly created location",
    validate: { payload: locationSpec },
    response: { schema: locationSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAlllocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all locationApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getlocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        await db.locationStore.deletelocation(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No location with this id");
      }
    },
    tags: ["api"],
    description: "Delete a location",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
