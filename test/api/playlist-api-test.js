import { EventEmitter } from "events";
import { assert } from "chai";
import { appService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, mozart, testplacelists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placelist API tests", () => {
  let user = null;

  setup(async () => {
    appService.clearAuth();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllplacelists();
    await appService.deleteAllUsers();
    user = await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create placelist", async () => {
    const returnedplacelist = await appService.createplacelist(mozart);
    assert.isNotNull(returnedplacelist);
    assertSubset(mozart, returnedplacelist);
  });

  test("delete a placelist", async () => {
    const placelist = await appService.createplacelist(mozart);
    const response = await appService.deleteplacelist(placelist._id);
    assert.equal(response.status, 204);
    try {
      const returnedplacelist = await appService.getplacelist(placelist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placelist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placelists", async () => {
    for (let i = 0; i < testplacelists.length; i += 1) {
      testplacelists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await appService.createplacelist(testplacelists[i]);
    }
    let returnedLists = await appService.getAllplacelists();
    assert.equal(returnedLists.length, testplacelists.length);
    await appService.deleteAllplacelists();
    returnedLists = await appService.getAllplacelists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placelist", async () => {
    try {
      const response = await appService.deleteplacelist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placelist with this id", "Incorrect Response Message");
    }
  });
});
