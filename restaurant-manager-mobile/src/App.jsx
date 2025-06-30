import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Store, User, Lock, LogOut, UtensilsCrossed, Clock, Eye, Plus } from 'lucide-react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ username: 'demo', role: 'restaurateur' });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Store className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Restaurant Manager</CardTitle>
            <p className="text-gray-600">Connectez-vous pour gérer votre restaurant</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    className="pl-10"
                    placeholder="demo"
                    defaultValue="demo"
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
                    className="pl-10"
                    placeholder="demo"
                    defaultValue="demo"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Se connecter
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-bold text-orange-600">Restaurant Manager</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{user.username}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Démo</h1>
          <p className="text-gray-600 mt-1">Tableau de bord</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">127</p>
                <p className="text-sm text-gray-600">Commandes totales</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">2450.50€</p>
                <p className="text-sm text-gray-600">Revenus aujourd'hui</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">24</p>
                <p className="text-sm text-gray-600">Plats actifs</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">8</p>
                <p className="text-sm text-gray-600">Commandes en attente</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 gap-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-500 text-white">
                    <UtensilsCrossed className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Gérer les plats</h3>
                    <p className="text-sm text-gray-600">Ajouter, modifier ou supprimer des plats</p>
                  </div>
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-500 text-white">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Voir les commandes</h3>
                    <p className="text-sm text-gray-600">Gérer les commandes en cours</p>
                  </div>
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-orange-500 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Horaires d'ouverture</h3>
                    <p className="text-sm text-gray-600">Modifier les horaires du restaurant</p>
                  </div>
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Commande #{1000 + order}</p>
                    <p className="text-sm text-gray-600">Il y a {order * 5} minutes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{(25.50 * order).toFixed(2)}€</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      En préparation
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default App;

