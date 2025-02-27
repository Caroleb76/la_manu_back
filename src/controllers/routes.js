import users from "./users/index.js";
export default (router) => {
  router.use("/users", users);
};
