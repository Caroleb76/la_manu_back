import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";

//récupération du routeur pour lui associer les différentes routes
export default (router) => {
    // liste de toutes les routes pour le dossier
    //get = récupérer les infos
    router.get("/", getAll);
    // delete = supprimer les infos
    router.delete("/:id", deleteUser);
    // post = envoyer les infos dans un formulaire
    router.post("/", create);
    // put = remplacer tous les champs et patch = modifier un seul champ
    return router;
};
