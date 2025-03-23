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
    mozart: {
      placelistname: "Mozart Favourites",
      userid: "->users.bart"
    }
  },
  locations: {
    _model : "location",
    location_1 : {
      locationname: "Violin Concerto No. 1",
      latitude: 123,
      longitude: 15,
      placelistid: "->placelists.mozart"
    },
    location_2 : {
      locationname: "Violin Concerto No. 2",
      latitude: 234,
      longitude: 11,
      placelistid: "->placelists.mozart"
    },
    location_3 : {
      locationname: "Violin Concerto No. 3",
      latitude: 567,
      longitude: 23,
      placelistid: "->placelists.mozart"
    }
  }
};
