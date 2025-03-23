import { assert } from "chai";
import { appService } from "./app-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    appService.clearAuth();
    await appService.createUser(maggie);
    await appService.authenticate(maggieCredentials);
    await appService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await appService.createUser(maggie);
    const response = await appService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await appService.createUser(maggie);
    const response = await appService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    appService.clearAuth();
    try {
      await appService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
