import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { appService } from "./playtime-service.js";
import { maggie, mozart, maggieCredentials, testplacelists, testlocations, concerto } from "../fixtures.js";

suite("location API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllplacelists();
    await appService.deleteAlllocations();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    mozart.userid = user._id;
    beethovenSonatas = await appService.createplacelist(mozart);
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedlocation = await appService.createlocation(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedlocation);
  });

  test("create Multiple locations", async () => {
    for (let i = 0; i < testlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await appService.createlocation(beethovenSonatas._id, testlocations[i]);
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
      await appService.createlocation(beethovenSonatas._id, testlocations[i]);
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
      await appService.createlocation(beethovenSonatas._id, testlocations[i]);
    }
    const returnedplacelist = await appService.getplacelist(beethovenSonatas._id);
    assert.equal(returnedplacelist.locations.length, testlocations.length);
    for (let i = 0; i < testlocations.length; i += 1) {
      assertSubset(testlocations[i], returnedplacelist.locations[i]);
    }
  });
});
