# 🏫 Projet La Manu — 🧠 Backend (API REST)

Bienvenue dans le dépôt du backend de l'application **La Manu**.  
Cette API REST permet de gérer les données du projet via des endpoints sécurisés et documentés.  
Elle est développée avec **Node.js**, **Express**, et **PostgreSQL**.

---

## 🚀 Stack technique

- ⬢ [Node.js](https://nodejs.org/) — environnement d'exécution JavaScript
- ⏩ [Express](https://expressjs.com/) — framework minimaliste pour créer des API REST
- 🐘 [PostgreSQL](https://www.postgresql.org/) — base de données relationnelle
- ✅ [Zod](https://zod.dev/) — validation des données côté serveur
- 📖 [Swagger](https://swagger.io/) — documentation interactive de l’API
- 🔎 [ESLint](https://eslint.org/) — outil d'analyse statique pour un code propre et homogène

## 🧰 Installation de l’environnement

### 1. 📥 Cloner le projet

git clone https://github.com/votre-utilisateur/projet-la-manu-backend.git
cd projet-la-manu-backend

2. 📦 Installer les dépendances
   npm install

3. ⚙️ Créer le fichier .env
   Créer un fichier .env à la racine du projet

🐳 Lancement avec Docker : commande : docker-compose up
Cela démarre :
le conteneur PostgreSQL

L’API est disponible par défaut sur http://localhost:3000.

📜 Documentation Swagger
La documentation interactive de l’API est accessible à l’adresse :
👉 http://localhost:3000/api-docs

✅ Validation des données avec Zod
Tous les endpoints valident les données entrantes (body, params, query) avec Zod afin de garantir la cohérence et la sécurité des entrées.

🧹 Linting & conventions
Pour vérifier la qualité du code et respecter les conventions définies

📦 Scripts disponibles
Commande Description
npm run dev Lance le serveur de développement
npm run lint Analyse le code avec ESLint
npm run lint:fix Corrige automatiquement les erreurs
npm run dockerdev Lance la base de données via Docker

🔐 Sécurité
Données sensibles stockées dans .env (non versionné)
Validation systématique des entrées avec Zod
Authentification par token JWT (facultatif selon vos endpoints)

🧭 Bonnes pratiques
Respecter la structure du projet
Créer une branche par fonctionnalité (feature/nom-de-feature)
Rédiger des messages de commit clairs
Tester les routes avec Postman ou Swagger
