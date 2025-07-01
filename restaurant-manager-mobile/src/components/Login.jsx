import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Store, User, Lock } from 'lucide-react'; // <-- MODIFICATION ICI
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', formData );
      
      if (response.data.role === 'restaurateur') {
        // Récupérer les informations du restaurant
        const userData = {
          id: response.data.user_id,
          username: formData.username,
          role: response.data.role
        };
        
        // Simuler les données du restaurant
        const restaurantData = {
          id: 1,
          name: "Mon Restaurant",
          address: "123 Rue de la Gastronomie",
          phone: "01 23 45 67 89",
          email: "contact@monrestaurant.fr"
        };
        
        onLogin(userData, restaurantData);
      } else {
        setError('Cette application est réservée aux restaurateurs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
      
      // Mode démonstration - permettre la connexion avec des identifiants de test
      if (formData.username === 'demo' && formData.password === 'demo') {
        const userData = {
          id: 1,
          username: 'demo',
          role: 'restaurateur'
        };
        
        const restaurantData = {
          id: 1,
          name: "Restaurant Démo",
          address: "123 Rue de la Démonstration",
          phone: "01 23 45 67 89",
          email: "demo@restaurant.fr"
        };
        
        onLogin(userData, restaurantData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-orange-600" /> {/* <-- MODIFICATION ICI */}
          </div>
          <CardTitle className="text-2xl font-bold">Restaurant Manager</CardTitle>
          <p className="text-gray-600">Connectez-vous pour gérer votre restaurant</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Votre nom d'utilisateur"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Votre mot de passe"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700" 
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Mode démonstration</h4>
            <p className="text-sm text-blue-700 mb-2">
              Utilisez ces identifiants pour tester l'application :
            </p>
            <div className="text-sm text-blue-600">
              <p><strong>Nom d'utilisateur :</strong> demo</p>
              <p><strong>Mot de passe :</strong> demo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
