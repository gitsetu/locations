import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { appService } from "./app-service.js";
import { maggie, town, maggieCredentials, testplacelists, testlocations, concerto } from "../fixtures.js";

suite("location API tests", () => {
  let user = null;
  let citySonatas = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllplacelists();
    await appService.deleteAlllocations();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    town.userid = user._id;
    citySonatas = await appService.createplacelist(town);
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedlocation = await appService.createlocation(citySonatas._id, concerto);
    assertSubset(concerto, returnedlocation);
  });

  test("create Multiple locations", async () => {
    for (let i = 0; i < testlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createlocation(citySonatas._id, testlocations[i]);
    }
    const returnedlocations = await appService.getAlllocations();
    assert.equal(returnedlocations.length, testlocations.length);
    for (let i = 0; i < returnedlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await appService.getlocation(returnedlocations[i]._id);
      assertSubset(location, returnedlocations[i]);
    }
  });

  test("Delete locationApi", async () => {
    for (let i = 0; i < testlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createlocation(citySonatas._id, testlocations[i]);
    }
    let returnedlocations = await appService.getAlllocations();
    assert.equal(returnedlocations.length, testlocations.length);
    for (let i = 0; i < returnedlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await appService.deletelocation(returnedlocations[i]._id);
    }
    returnedlocations = await appService.getAlllocations();
    assert.equal(returnedlocations.length, 0);
  });

  test("denormalised placelist", async () => {
    for (let i = 0; i < testlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createlocation(citySonatas._id, testlocations[i]);
    }
    const returnedplacelist = await appService.getplacelist(citySonatas._id);
    assert.equal(returnedplacelist.locations.length, testlocations.length);
    for (let i = 0; i < testlocations.length; i += 1) {
      assertSubset(testlocations[i], returnedplacelist.locations[i]);
    }
  });
});
