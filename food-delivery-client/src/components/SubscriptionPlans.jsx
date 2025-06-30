import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, Zap } from 'lucide-react';

const SubscriptionPlans = ({ onSubscribe, user }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basique',
      price: '9.99',
      period: 'mois',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'Livraison gratuite sur commandes > 25€',
        'Accès aux restaurants partenaires',
        'Support client standard',
        'Historique des commandes'
      ],
      popular: false,
      stripePrice: 'price_basic_monthly' // À remplacer par l'ID réel de Stripe
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '19.99',
      period: 'mois',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Livraison gratuite sur toutes les commandes',
        'Accès prioritaire aux nouveaux restaurants',
        'Support client prioritaire 24/7',
        'Réductions exclusives jusqu\'à 20%',
        'Accès aux événements culinaires',
        'Programme de fidélité avancé'
      ],
      popular: true,
      stripePrice: 'price_premium_monthly' // À remplacer par l'ID réel de Stripe
    },
    {
      id: 'family',
      name: 'Famille',
      price: '29.99',
      period: 'mois',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Tous les avantages Premium',
        'Jusqu\'à 4 comptes familiaux',
        'Commandes groupées',
        'Contrôle parental',
        'Réductions familiales spéciales',
        'Menu enfant gratuit chaque semaine'
      ],
      popular: false,
      stripePrice: 'price_family_monthly' // À remplacer par l'ID réel de Stripe
    }
  ];

  const handleSubscribe = async (plan) => {
    if (!user) {
      alert('Veuillez vous connecter pour souscrire à un abonnement');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          price_id: plan.stripePrice
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erreur lors de la création de la session de paiement');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Erreur lors de la création de la session de paiement');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choisissez votre abonnement</h2>
          <p className="text-gray-600 text-lg">
            Profitez d'avantages exclusifs et de livraisons gratuites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-orange-500 border-2 shadow-xl' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan)}
                >
                  Choisir ce plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Tous les abonnements peuvent être annulés à tout moment. 
            <br />
            Aucun engagement, aucune pénalité.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;

