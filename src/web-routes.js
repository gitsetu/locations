import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placelistController } from "./controllers/placelist-controller.js";
import { locationController } from "./controllers/location-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacelist", config: dashboardController.addplacelist },
  { method: "GET", path: "/dashboard/deleteplacelist/{id}", config: dashboardController.deleteplacelist },

  { method: "GET", path: "/placelist/{id}", config: placelistController.index },
  { method: "POST", path: "/placelist/{id}/addlocation", config: placelistController.addlocation },
  { method: "GET", path: "/placelist/{id}/deletelocation/{locationid}", config: placelistController.deletelocation },

  { method: "GET", path: "/location/{id}/editlocation/{locationid}", config: locationController.index },
  { method: "POST", path: "/location/{id}/updatelocation/{locationid}", config: locationController.update },

  { method: "POST", path: "/placelist/{id}/uploadimage", config: placelistController.uploadImage },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
