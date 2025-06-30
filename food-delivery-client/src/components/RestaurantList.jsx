import { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import axios from 'axios';

const RestaurantList = ({ onRestaurantSelect }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/restaurants');
      setRestaurants(response.data.restaurants || []);
    } catch (err) {
      setError('Erreur lors du chargement des restaurants');
      console.error('Error fetching restaurants:', err);
      // Données de démonstration en cas d'erreur
      setRestaurants([
        {
          id: 1,
          name: "Pizza Palace",
          address: "123 Rue de la Pizza",
          description: "Les meilleures pizzas artisanales de la ville",
          image_url: null
        },
        {
          id: 2,
          name: "Burger House",
          address: "456 Avenue des Burgers",
          description: "Burgers gourmets et frites maison",
          image_url: null
        },
        {
          id: 3,
          name: "Sushi Zen",
          address: "789 Boulevard du Japon",
          description: "Sushi frais et cuisine japonaise authentique",
          image_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="restaurants" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Restaurants populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg h-80 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-8 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="restaurants" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Restaurants populaires</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Voici quelques restaurants de démonstration :</p>
        </div>
      </section>
    );
  }

  return (
    <section id="restaurants" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Restaurants populaires</h2>
        
        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucun restaurant disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onViewMenu={onRestaurantSelect}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;

