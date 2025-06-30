#!/bin/bash

# Script de déploiement pour la plateforme de livraison de nourriture

echo "🚀 Déploiement de la plateforme de livraison de nourriture"
echo "=============================================="

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

# Backend
if [ ! -f "backend/requirements.txt" ]; then
    echo "❌ Fichier requirements.txt manquant dans le backend"
    exit 1
fi

if [ ! -f "backend/Procfile" ]; then
    echo "❌ Fichier Procfile manquant dans le backend"
    exit 1
fi

# Frontend client
if [ ! -f "food-delivery-client/package.json" ]; then
    echo "❌ Fichier package.json manquant dans le frontend client"
    exit 1
fi

# Frontend mobile
if [ ! -f "restaurant-manager-mobile/package.json" ]; then
    echo "❌ Fichier package.json manquant dans le frontend mobile"
    exit 1
fi

echo "✅ Tous les fichiers nécessaires sont présents"

echo ""
echo "📝 Instructions de déploiement:"
echo ""
echo "1. BACKEND (API Flask):"
echo "   - Connectez-vous à Render.com"
echo "   - Créez un nouveau Web Service"
echo "   - Connectez votre repository Git"
echo "   - Définissez le répertoire racine: backend"
echo "   - Commande de build: pip install -r requirements.txt"
echo "   - Commande de démarrage: gunicorn app:app"
echo "   - Variables d'environnement à configurer:"
echo "     * DATABASE_URL (fournie automatiquement par Render)"
echo "     * STRIPE_SECRET_KEY (votre clé secrète Stripe)"
echo "     * STRIPE_WEBHOOK_SECRET (votre secret webhook Stripe)"
echo ""
echo "2. FRONTEND CLIENT (Application Web):"
echo "   - Créez un nouveau Static Site sur Render"
echo "   - Connectez votre repository Git"
echo "   - Définissez le répertoire racine: food-delivery-client"
echo "   - Commande de build: pnpm install && pnpm run build"
echo "   - Répertoire de publication: dist"
echo ""
echo "3. FRONTEND MOBILE (Application Restaurateur):"
echo "   - Créez un nouveau Static Site sur Render"
echo "   - Connectez votre repository Git"
echo "   - Définissez le répertoire racine: restaurant-manager-mobile"
echo "   - Commande de build: pnpm install && pnpm run build"
echo "   - Répertoire de publication: dist"
echo ""
echo "4. BASE DE DONNÉES:"
echo "   - Créez une base de données PostgreSQL sur Render"
echo "   - L'URL sera automatiquement fournie au backend"
echo ""
echo "🎉 Une fois déployé, votre plateforme sera accessible publiquement !"
echo ""
echo "💡 Coût estimé sur Render (niveau gratuit):"
echo "   - Backend: Gratuit (750h/mois)"
echo "   - Frontend Client: Gratuit"
echo "   - Frontend Mobile: Gratuit"
echo "   - Base de données: Gratuit (90 jours, puis 7$/mois)"
echo ""
echo "Total: Gratuit pendant 90 jours, puis 7$/mois"

