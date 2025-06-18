# Commandes Prisma

`npx prisma init`  - Initialise Prisma dans votre projet. Crée un dossier `prisma/` avec `schema.prisma` et un fichier `.env`.
`npx prisma generate` - Génére le client Prisma (`@prisma/client`) à partir du fichier `schema.prisma`. À exécuter après chaque modification du schéma
`npx prisma db push` - Synchronise le schéma Prisma avec la base de données **sans migration**. Utile pour le prototypage rapide. 
`npx prisma migrate dev` - Applique des migrations à la base de données et les génère automatiquement si besoin. Idéal pour le développement.
`npx prisma migrate reset` - Supprime toutes les données de la base, applique les migrations depuis zéro, et recharge les seeders. Très utile pour un reset complet.
`npx prisma migrate deploy`- Applique les migrations déjà générées dans un environnement de production (sans les créer). 
`npx prisma studio` - Lance Prisma Studio, une interface web pour explorer/modifier vos données facilement.
`npx prisma db seed` - Exécute le script de seed défini pour remplir la base avec des données de test. 
`npx prisma format`- Formate automatiquement le fichier `schema.prisma` (indentation, etc.).
`npx prisma validate` - Vérifie que le fichier `schema.prisma` est valide (pas d’erreurs de syntaxe ou de logique).         
`npx prisma introspect` - Analyse une base de données existante et génère un schéma Prisma à partir de celle-ci. Utile pour partir d’une base déjà créée.
