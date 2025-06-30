# 🍕 Plateforme de Livraison de Nourriture

Une solution complète de livraison de nourriture avec système d'abonnement, développée avec React, Flask et Stripe.

## 🚀 Aperçu Rapide

Cette plateforme comprend :
- **Application Web Client** - Interface utilisateur moderne pour commander
- **Application Mobile Restaurateur** - Gestion complète pour les restaurants
- **API Backend** - Serveur Flask avec PostgreSQL et intégration Stripe
- **Système d'Abonnement** - Plans multiples avec paiements récurrents

## 📱 Démonstration

### Application Web Client
- URL locale : http://localhost:5173
- Fonctionnalités : Navigation restaurants, abonnements, authentification

### Application Mobile Restaurateur
- URL locale : http://localhost:5174
- Connexion démo : `demo` / `demo`
- Fonctionnalités : Tableau de bord, gestion plats, commandes, horaires

## 🛠️ Installation Rapide

### Prérequis
- Python 3.11+
- Node.js 20+
- PostgreSQL
- Compte Stripe

### Démarrage
```bash
# 1. Backend
cd backend
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run

# 2. Frontend Client
cd food-delivery-client
pnpm install
pnpm run dev

# 3. Frontend Mobile
cd restaurant-manager-mobile
pnpm install
pnpm run dev --port 5174
```

## 💰 Coût de Déploiement

**Render.com (Recommandé)**
- Backend : Gratuit (750h/mois)
- Frontend : Gratuit
- Base de données : Gratuit 90 jours, puis 7$/mois
- **Total : 7$/mois après 90 jours**

## 📁 Structure du Projet

```
food-delivery-platform/
├── backend/                 # API Flask
│   ├── app.py              # Application principale
│   ├── requirements.txt    # Dépendances Python
│   └── .env               # Variables d'environnement
├── food-delivery-client/   # Application Web React
│   ├── src/               # Code source
│   ├── package.json       # Dépendances Node.js
│   └── dist/             # Build de production
├── restaurant-manager-mobile/ # Application Mobile React
│   ├── src/               # Code source
│   ├── package.json       # Dépendances Node.js
│   └── dist/             # Build de production
├── documentation.md        # Documentation complète
├── documentation.pdf       # Documentation PDF
├── deploy.sh              # Script de déploiement
└── README.md              # Ce fichier
```

## 🔧 Technologies Utilisées

### Backend
- **Flask** - Framework web Python
- **PostgreSQL** - Base de données relationnelle
- **SQLAlchemy** - ORM Python
- **Stripe** - Paiements et abonnements
- **Gunicorn** - Serveur WSGI

### Frontend
- **React 19** - Framework JavaScript
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI
- **Axios** - Client HTTP

## 🎯 Fonctionnalités Principales

### Pour les Clients
- ✅ Navigation et recherche de restaurants
- ✅ Consultation des menus
- ✅ Système d'abonnement (Basic/Premium/Enterprise)
- ✅ Interface responsive
- ✅ Authentification sécurisée

### Pour les Restaurateurs
- ✅ Tableau de bord avec statistiques
- ✅ Gestion des plats (CRUD complet)
- ✅ Suivi des commandes en temps réel
- ✅ Gestion des horaires d'ouverture
- ✅ Interface optimisée mobile

### Backend
- ✅ API RESTful complète
- ✅ Authentification JWT
- ✅ Intégration Stripe (webhooks inclus)
- ✅ Migrations de base de données
- ✅ Support CORS

## 🚀 Déploiement

### Déploiement Automatique
```bash
# Vérifier les prérequis
./deploy.sh

# Suivre les instructions affichées
```

### Déploiement Manuel sur Render
1. **Backend** : Web Service avec `gunicorn app:app`
2. **Frontend Client** : Static Site avec build Vite
3. **Frontend Mobile** : Static Site avec build Vite
4. **Base de données** : PostgreSQL Database

Voir `documentation.md` pour les détails complets.

## 🔐 Configuration Stripe

1. Créer un compte sur [stripe.com](https://stripe.com)
2. Récupérer les clés API (test/production)
3. Créer les produits d'abonnement
4. Configurer les webhooks
5. Ajouter les variables d'environnement

## 📖 Documentation

- **Documentation complète** : `documentation.md` ou `documentation.pdf`
- **API Documentation** : Incluse dans la documentation
- **Guide d'installation** : Section dédiée dans la documentation
- **Guide de déploiement** : Instructions détaillées

## 🧪 Tests

### Tests Locaux
```bash
# Tester l'application web
curl http://localhost:5173

# Tester l'API
curl http://localhost:5000/restaurants

# Tester l'application mobile
curl http://localhost:5174
```

### Tests de Production
- Vérifier l'accès aux applications
- Tester l'inscription/connexion
- Tester le processus d'abonnement Stripe
- Vérifier les webhooks

## 🔄 Évolutions Futures

### Court Terme
- Notifications push
- Système de notation
- Programme de fidélité
- Chat intégré

### Moyen Terme
- Application mobile native
- Géolocalisation
- Intégration livraison
- Analytics avancés

### Long Terme
- IA pour recommandations
- Système de franchise
- API publique
- Expansion internationale

## 🆘 Support

### Problèmes Courants
- **Erreur de connexion** : Vérifier les identifiants
- **Problème Stripe** : Contrôler les webhooks
- **Performance** : Vérifier les métriques

### Contact
- Documentation : `documentation.md`
- Issues : Repository GitHub
- Support : Équipe de développement

## 📄 Licence

Ce projet est développé pour démonstration et usage commercial.

## 🙏 Remerciements

Développé avec ❤️ par l'équipe Manus

---

**Version** : 1.0  
**Date** : 30 juin 2025  
**Statut** : Production Ready ✅

