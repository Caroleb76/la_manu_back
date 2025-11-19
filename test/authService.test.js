import authService from "../src/services/authService.js";

test("loginSuccess", async () => {
  const loggedUser = await authService.login("admin@demo.com", "password");

  expect(loggedUser).toHaveProperty("token");
  expect(loggedUser.token).toBeDefined();
  expect(loggedUser.token.length).toBeGreaterThanOrEqual(8);
});

test("loginfailure", async () => {
  await expect(
    authService.login("admin@demo.com", "wrongpassword"),
  ).rejects.toThrow(); // on attend une erreur
});
