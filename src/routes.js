import users from "./controllers/users/index.js";
import auth from "./controllers/auth/index.js";
import formation from "./controllers/formation/index.js";
import notification from "./controllers/notification/index.js";
import moduleFormation from "./controllers/moduleFormation/index.js";

export default (router) => {
  router.use("/users", users); // une route pour chaque répertoire ex users contrats ...
  router.use("/auth", auth);
  router.use("/formation", formation);
  router.use("/notification", notification);
  router.use("/moduleFormation", moduleFormation);
};
