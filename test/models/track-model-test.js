import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testplacelists, testlocations, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("location Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.placelistStore.deleteAllplacelists();
    await db.locationStore.deleteAlllocations();
    beethovenList = await db.placelistStore.addplacelist(beethoven);
    for (let i = 0; i < testlocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testlocations[i] = await db.locationStore.addlocation(beethovenList._id, testlocations[i]);
    }
  });

  test("create single location", async () => {
    const mozartList = await db.placelistStore.addplacelist(mozart);
    const location = await db.locationStore.addlocation(mozartList._id, concerto)
    assert.isNotNull(location._id);
    assertSubset (concerto, location);
  });

  test("create multiple locationApi", async () => {
    const locations = await db.placelistStore.getplacelistById(beethovenList._id);
    assert.equal(testlocations.length, testlocations.length)
  });

  test("delete all locationApi", async () => {
    const locations = await db.locationStore.getAlllocations();
    assert.equal(testlocations.length, locations.length);
    await db.locationStore.deleteAlllocations();
    const newlocations = await db.locationStore.getAlllocations();
    assert.equal(0, newlocations.length);
  });

  test("get a location - success", async () => {
    const mozartList = await db.placelistStore.addplacelist(mozart);
    const location = await db.locationStore.addlocation(mozartList._id, concerto)
    const newlocation = await db.locationStore.getlocationById(location._id);
    assertSubset (concerto, newlocation);
  });

  test("delete One location - success", async () => {
    const id = testlocations[0]._id;
    await db.locationStore.deletelocation(id);
    const locations = await db.locationStore.getAlllocations();
    assert.equal(locations.length, testplacelists.length - 1);
    const deletedlocation = await db.locationStore.getlocationById(id);
    assert.isNull(deletedlocation);
  });

  test("get a placelist - bad params", async () => {
    assert.isNull(await db.locationStore.getlocationById(""));
    assert.isNull(await db.locationStore.getlocationById());
  });

  test("delete One User - fail", async () => {
    await db.locationStore.deletelocation("bad-id");
    const locations = await db.locationStore.getAlllocations();
    assert.equal(locations.length, testplacelists.length);
  });
});
