import { EventEmitter } from "events";
import { assert } from "chai";
import { playtimeService } from "./playtime-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, mozart, testPlaylists } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Playlist API tests", () => {
  let user = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggieCredentials);
    mozart.userid = user._id;
  });

  teardown(async () => {});

  test("create playlist", async () => {
    const returnedPlaylist = await playtimeService.createPlaylist(mozart);
    assert.isNotNull(returnedPlaylist);
    assertSubset(mozart, returnedPlaylist);
  });

  test("delete a playlist", async () => {
    const playlist = await playtimeService.createPlaylist(mozart);
    const response = await playtimeService.deletePlaylist(playlist._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await playtimeService.getPlaylist(playlist.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });

  test("create multiple playlists", async () => {
    for (let i = 0; i < testPlaylists.length; i += 1) {
      testPlaylists[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await playtimeService.createPlaylist(testPlaylists[i]);
    }
    let returnedLists = await playtimeService.getAllPlaylists();
    assert.equal(returnedLists.length, testPlaylists.length);
    await playtimeService.deleteAllPlaylists();
    returnedLists = await playtimeService.getAllPlaylists();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant playlist", async () => {
    try {
      const response = await playtimeService.deletePlaylist("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Playlist with this id", "Incorrect Response Message");
    }
  });
});
