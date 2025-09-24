# TODO

## Bugs
- Les filtres ne fonctionnent plus (dataGrid) 
- création de relation entre extracostCategory & extraCost

## Fonctionalités
### Priorité haute


-  création de modules

- envoi d'email (configurer nodemailer (au moins simulation)

- Voir pour lister les interventions validées (notamment du mois) (seulement possible si champs date pour la  validation)

- écrire tests
- ajouter création d'interventions(avec extracost) dans seeds
- ajouter plus de seeders "réalistes"

#### Vérifications
- revoir nomenclature (pluriels, répétitions de noms de modèles, majuscules) : controllers, services, helpers
- vérifier la validation des données dans le backed

- ajout de popup dans la liste d'intervention pour voir les extracosts associés

- vérifier l'interface des rôle



### Priorité moyenne
- page déclration du  contrat (à voir mais pas obligatoire)
- vérification UX/UI
- préparer déploiment docker
- mettre à jour le Swagger
- Fonction de modification de contrat 
- Fonction de suppression de contrat 
- converir "signed" et "verified" en champs date pour connaitre la date de signature et vérification


### Priorité basse
- filtrer les contrats terminés 
- validation des contrats par les admin 
- ajouter l'action pour déclarer un contrat
- export des interventions en excel
- simulation email
- gestion des modules de formation

## Fonctionnalités optionelles
- widget ??


## Nettoyage code
- nom des méthodes du backend 
- nom des helpers du frontend
- composants inutilisés
- console.log inutiles
- vérifier les schémas prisma (cohérence)