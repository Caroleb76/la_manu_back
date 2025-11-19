import utils from "../src/utils/utils.js";

test("hashAndVerifyPassword", async () => {
  const clearPassword = "password";
  const hashedPassword = await utils.hashPassword(clearPassword);
  const verified = await utils.verifyPassword("password", hashedPassword);

  expect(verified).toBeTruthy();
});
