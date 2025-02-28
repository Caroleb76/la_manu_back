import users from "./users/index.js";
export default (router) => {
  router.use("/users", users(router)); // une route pour chaque répertoire ex users contrats ...
};
