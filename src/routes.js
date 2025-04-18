import users from "./controllers/users/index.js";
import auth from "./controllers/auth/index.js";

export default (router) => {
  router.use("/users", users); // une route pour chaque répertoire ex users contrats ...
  router.use("/auth",auth ); 
  router.use("/files", files);
  router.use("/addresses", addresses);
  router.use("/roles", roles);
  router.use("/extraCosts", extraCosts);
  
};