import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantList from './components/RestaurantList';
import SubscriptionPlans from './components/SubscriptionPlans';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    setAuthModal({ isOpen: true, mode: 'login' });
  };

  const handleRegister = () => {
    setAuthModal({ isOpen: true, mode: 'register' });
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleAuthClose = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    // Ici, vous pourriez naviguer vers une page de détails du restaurant
    console.log('Restaurant sélectionné:', restaurant);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItems={cartItems}
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
        user={user}
        onLogout={handleLogout}
      />
      
      <main>
        <Hero />
        <RestaurantList onRestaurantSelect={handleRestaurantSelect} />
        <SubscriptionPlans onSubscribe={() => {}} user={user} />
        
        {/* Section À propos */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Pourquoi choisir FoodDelivery ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
                  <p className="text-gray-600">Vos plats préférés livrés en moins de 30 minutes</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Qualité garantie</h3>
                  <p className="text-gray-600">Restaurants sélectionnés pour leur excellence</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
                  <p className="text-gray-600">Transactions protégées et abonnements flexibles</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">FoodDelivery</h3>
            <p className="text-gray-400">
              Votre plateforme de livraison de nourriture préférée
            </p>
            <div className="mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Conditions d'utilisation</a>
              <a href="#" className="text-gray-400 hover:text-white">Politique de confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={handleAuthClose}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;

