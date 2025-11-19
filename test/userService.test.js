import userService from "../src/services/userService.js";

test("getUserById", async () => {
  const data = await userService.getUserById(
    "18cf884e-4313-441a-b0a9-961c417e6d20",
  );
  expect(data.email).toBe("admin3@demo.com");
});

test("addOneUser", async () => {
  //on récupère le nombre d'utilisateur
  const initialUsers = await userService.getUsers();
  // on ajoute un nouvel utilisateur
  const testUser = {
    firstName: "Louis",
    lastName: "Dupont",
    email: "louis.dupont@demo.com",
    password: "password",
  };
  const newUser = await userService.createUser(testUser);
  // on verifie que le nombre d'utilisateur a augmenté de 1
  const finalUsers = await userService.getUsers();
  expect(finalUsers.users.length).toBe(initialUsers.users.length + 1);
});

test("removeOneUser", async () => {
  //on récupère le nombre d'utilisateur
  const initialUsers = await userService.getUsers();
  // on supprime un nouvel utilisateur

  const newUser = await userService.deleteByEmail("louis.dupont@demo.com");
  // on verifie que le nombre d'utilisateur a augmenté de 1
  const finalUsers = await userService.getUsers();
  expect(finalUsers.users.length).toBe(initialUsers.users.length - 1);
});
