import users from "./controllers/users/index.js";
import auth from "./controllers/auth/index.js";
import contract from "./controllers/contract/index.js";
import intervention from "./controllers/intervention/index.js";
import interventionCategory from "./controllers/interventionCategory/index.js";
import sessionFormation from "./controllers/sessionFormation/index.js";

export default (router) => {
  router.use("/users", users); // une route pour chaque répertoire ex users contrats ...
  router.use("/auth", auth);
  router.use("/contracts", contract);
  router.use("/interventions", intervention);
  router.use("/interventionCategories", interventionCategory);
  router.use("/sessionFormations", sessionFormation);
};