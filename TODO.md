# TODO

## Bugs
- Les filtres ne fonctionnent plus (dataGrid) 
- ajout de justificatif : problème de type pour "val" (était un string, maintenant INT)


## Fonctionalités
### Priorité haute
- pourvoir consulter les extracost et fichiers justif depuis la liste des interventions (admin)


- Voir pour lister les interventions validées (notamment du mois) (seulement possible si champs date pour la  validation)

- écrire tests
- ajouter création d'interventions(avec extracost) dans seeds
- ajouter plus de seeders "réalistes"

#### Vérifications
- revoir nomenclature (pluriels, répétitions de noms de modèles, majuscules) : controllers, services, helpers
- vérifier la validation des données dans le backed
- mettre à jour le Swagger
- ajout de popup dans la liste d'intervention pour voir les extracosts associés

- vérifier l'interface des rôle



### Priorité moyenne
- edition de modules

- préparer déploiment docker
- Fonction de modification de contrat 
- Fonction de suppression de contrat 
- converir "signed" et "verified" en champs date pour connaitre la date de signature et vérification
- superadmin peuvent choisir le rôle des utilisateurs, pas les admin. Idem pour le mot de passe (peut être défini manuellement par le superadmin pas par l'admin)


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