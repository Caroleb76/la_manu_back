import users from "./controllers/users/index.js";
import auth from "./controllers/auth/index.js";
import contract from "./controllers/contract/index.js";
import intervention from "./controllers/intervention/index.js";
import interventionCategory from "./controllers/interventionCategory/index.js";
import sessionFormation from "./controllers/sessionFormation/index.js";
import files from "./controllers/files/index.js";
import addresses from "./controllers/addresses/index.js";
import roles from "./controllers/roles/index.js";
import extraCosts from "./controllers/extraCosts/index.js";

import formation from "./controllers/formation/index.js";
import notification from "./controllers/notification/index.js";
import moduleFormation from "./controllers/moduleFormation/index.js";

export default (router) => {
  router.use("/users", users); // une route pour chaque répertoire ex users contrats ...
  router.use("/auth", auth);
  router.use("/contracts", contract);
  router.use("/interventions", intervention);
  router.use("/interventionCategories", interventionCategory);
  router.use("/sessionFormations", sessionFormation);
  router.use("/files", files);
  router.use("/addresses", addresses);
  router.use("/roles", roles);
  router.use("/extraCosts", extraCosts);
  router.use("/formation", formation);
  router.use("/notification", notification);
  router.use("/moduleFormation", moduleFormation);
};
