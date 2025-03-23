import { userApi } from "./api/user-api.js";
import { placelistApi } from "./api/placelist-api.js";
import { locationApi } from "./api/location-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/placelists", config: placelistApi.create },
  { method: "DELETE", path: "/api/placelists", config: placelistApi.deleteAll },
  { method: "GET", path: "/api/placelists", config: placelistApi.find },
  { method: "GET", path: "/api/placelists/{id}", config: placelistApi.findOne },
  { method: "DELETE", path: "/api/placelists/{id}", config: placelistApi.deleteOne },

  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "POST", path: "/api/placelists/{id}/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
];
