import { userMemStore } from "./mem/user-mem-store.js";
import { placelistMemStore } from "./mem/placelist-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placelistJsonStore } from "./json/placelist-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placelistMongoStore } from "./mongo/placelist-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placelistStore: null,
  locationStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.placelistStore = placelistJsonStore;
        this.locationStore = locationJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.placelistStore = placelistMongoStore;
        this.locationStore = locationMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.placelistStore = placelistMemStore;
        this.locationStore = locationMemStore;
    }
  }
};
