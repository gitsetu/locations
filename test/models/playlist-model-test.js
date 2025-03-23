import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testplacelists, mozart } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placelist Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.placelistStore.deleteAllplacelists();
    for (let i = 0; i < testplacelists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testplacelists[i] = await db.placelistStore.addplacelist(testplacelists[i]);
    }
  });

  test("create a placelist", async () => {
    const placelist = await db.placelistStore.addplacelist(mozart);
    assertSubset(mozart, placelist);
    assert.isDefined(placelist._id);
  });

  test("delete all placelists", async () => {
    let returnedplacelists = await db.placelistStore.getAllplacelists();
    assert.equal(returnedplacelists.length, 3);
    await db.placelistStore.deleteAllplacelists();
    returnedplacelists = await db.placelistStore.getAllplacelists();
    assert.equal(returnedplacelists.length, 0);
  });

  test("get a placelist - success", async () => {
    const placelist = await db.placelistStore.addplacelist(mozart);
    const returnedplacelist = await db.placelistStore.getplacelistById(placelist._id);
    assertSubset(mozart, placelist);
  });

  test("delete One Playist - success", async () => {
    const id = testplacelists[0]._id;
    await db.placelistStore.deleteplacelistById(id);
    const returnedplacelists = await db.placelistStore.getAllplacelists();
    assert.equal(returnedplacelists.length, testplacelists.length - 1);
    const deletedplacelist = await db.placelistStore.getplacelistById(id);
    assert.isNull(deletedplacelist);
  });

  test("get a placelist - bad params", async () => {
    assert.isNull(await db.placelistStore.getplacelistById(""));
    assert.isNull(await db.placelistStore.getplacelistById());
  });

  test("delete One Placelist - fail", async () => {
    await db.placelistStore.deleteplacelistById("bad-id");
    const allplacelists = await db.placelistStore.getAllplacelists();
    assert.equal(testplacelists.length, allplacelists.length);
  });
});
