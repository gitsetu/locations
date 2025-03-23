export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  placelists: {
    _model: "placelist",
    town: {
      placelistname: "My Favourite Locations in Town",
      userid: "->users.bart"
    },
    city: {
      placelistname: "My Favourite Locations in City",
      userid: "->users.bart"
    },
    country: {
      placelistname: "My Favourite Locations in the Country",
      userid: "->users.bart"
    }
  },
  locations: {
    _model : "location",
    location_1 : {
      locationname: "Cafe, Main Street",
      latitude: 123,
      longitude: 15,
      placelistid: "->placelists.town"
    },
    location_2 : {
      locationname: "Playground, North Street",
      latitude: 234,
      longitude: 11,
      placelistid: "->placelists.town"
    },
    location_3 : {
      locationname: "Book Shop, South Street",
      latitude: 567,
      longitude: 23,
      placelistid: "->placelists.town"
    },
    location_4 : {
      locationname: "Library, City Centre",
      latitude: 123,
      longitude: 15,
      placelistid: "->placelists.city"
    },
    location_5 : {
      locationname: "Art Museum, New Avenue",
      latitude: 234,
      longitude: 11,
      placelistid: "->placelists.city"
    },
    location_6 : {
      locationname: "Deep Calm Forest",
      latitude: 567,
      longitude: 23,
      placelistid: "->placelists.country"
    },
    location_7 : {
      locationname: "Long Sandy Beach",
      latitude: 567,
      longitude: 23,
      placelistid: "->placelists.country"
    }
  }
};
