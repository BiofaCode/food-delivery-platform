# Tâches à faire

## Phase 1: Analyser les besoins et définir l'architecture technique
- [x] Confirmer la stack technique (Python/Flask, PostgreSQL, React, React Native, Render).
- [x] Définir les entités de la base de données (Utilisateurs, Restaurants, Plats, Abonnements, Commandes, etc.).
- [x] Établir les endpoints API nécessaires pour le backend.

## Phase 2: Créer la structure backend avec API et base de données
- [x] Initialiser le projet Flask.
- [x] Configurer la connexion à la base de données PostgreSQL.
- [x] Définir les modèles de données SQLAlchemy pour les entités.
- [x] Créer les migrations de base de données.
- [x] Implémenter les endpoints API de base (authentification, CRUD pour restaurants et plats).

## Phase 3: Implémenter l'intégration Stripe pour les abonnements
- [x] Configurer les clés API Stripe.
- [x] Créer les produits et plans d'abonnement dans Stripe.
- [x] Implémenter la logique de création de session Checkout Stripe.
- [x] Gérer les webhooks Stripe pour la mise à jour des statuts d'abonnement.
- [x] Mettre à jour les modèles de données pour inclure les informations d'abonnement.

## Phase 4: Développer l'application web frontend pour les clients
- [x] Initialiser le projet React.
- [x] Créer les pages principales (accueil, liste des restaurants, détails du restaurant, panier, profil utilisateur).
- [x] Implémenter l'authentification utilisateur.
- [x] Intégrer l'API backend pour récupérer et afficher les données.
- [x] Intégrer Stripe Checkout pour le processus d'abonnement.

## Phase 5: Créer l'application mobile pour les restaurateurs
- [x] Initialiser le projet React Native.
- [x] Créer les écrans principaux (tableau de bord, gestion des plats, gestion des commandes, gestion des horaires).
- [x] Implémenter l'authentification du restaurateur.
- [x] Intégrer l'API backend pour la gestion des données du restaurant.

## Phase 6: Configurer le déploiement et tester l'ensemble
- [x] Configurer le déploiement du backend Flask sur Render.
- [x] Configurer le déploiement du frontend React sur Render.
- [x] Tester l'intégration Stripe de bout en bout.
- [x] Tester les fonctionnalités de l'application web client.
- [x] Tester les fonctionnalités de l'application mobile restaurateur.

## Phase 7: Livrer la documentation et les fichiers finaux
- [x] Fournir la documentation complète du projet (architecture, installation, utilisation).
- [x] Fournir les fichiers de code source complets.




### Entités de la base de données:
- **Utilisateur**: id, nom, email, mot_de_passe_hash, role (client/restaurateur), stripe_customer_id
- **Restaurant**: id, nom, adresse, telephone, email, description, horaires_ouverture, image_url, utilisateur_id (clé étrangère vers Utilisateur)
- **Plat**: id, nom, description, prix, image_url, restaurant_id (clé étrangère vers Restaurant)
- **Abonnement**: id, utilisateur_id (clé étrangère vers Utilisateur), stripe_subscription_id, statut, date_debut, date_fin, plan_id
- **Commande**: id, utilisateur_id (clé étrangère vers Utilisateur), restaurant_id (clé étrangère vers Restaurant), date_commande, statut, total
- **LigneCommande**: id, commande_id (clé étrangère vers Commande), plat_id (clé étrangère vers Plat), quantite, prix_unitaire




### Endpoints API:
- **Authentification**: /api/register, /api/login, /api/logout
- **Utilisateurs**: /api/users/<id>
- **Restaurants**: /api/restaurants, /api/restaurants/<id>, /api/restaurants/<id>/dishes
- **Plats**: /api/dishes, /api/dishes/<id>
- **Abonnements**: /api/subscriptions, /api/subscriptions/create-checkout-session, /api/stripe-webhook
- **Commandes**: /api/orders, /api/orders/<id>
- **Gestion Restaurateur**: /api/restaurant/dishes, /api/restaurant/orders, /api/restaurant/schedule

