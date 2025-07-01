import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, // <-- MODIFICATION ICI
  UtensilsCrossed, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Eye
} from 'lucide-react';

const Dashboard = ({ restaurant, onNavigate }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayRevenue: 0,
    activeDishes: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // Simuler des données de statistiques
    setStats({
      totalOrders: 127,
      todayRevenue: 2450.50,
      activeDishes: 24,
      pendingOrders: 8
    });
  }, []);

  const quickActions = [
    {
      title: 'Gérer les plats',
      description: 'Ajouter, modifier ou supprimer des plats',
      icon: <UtensilsCrossed className="h-6 w-6" />,
      action: () => onNavigate('dishes'),
      color: 'bg-blue-500'
    },
    {
      title: 'Voir les commandes',
      description: 'Gérer les commandes en cours',
      icon: <Eye className="h-6 w-6" />,
      action: () => onNavigate('orders'),
      color: 'bg-green-500'
    },
    {
      title: 'Horaires d\'ouverture',
      description: 'Modifier les horaires du restaurant',
      icon: <Clock className="h-6 w-6" />,
      action: () => onNavigate('schedule'),
      color: 'bg-orange-500'
    },
    {
      title: 'Profil restaurant',
      description: 'Modifier les informations du restaurant',
      icon: <Store className="h-6 w-6" />, // <-- MODIFICATION ICI
      action: () => onNavigate('profile'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {restaurant?.name || 'Mon Restaurant'}
        </h1>
        <p className="text-gray-600 mt-1">Tableau de bord</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Commandes totales</p>
                <p className="text-xl font-bold">{stats.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenus aujourd'hui</p>
                <p className="text-xl font-bold">{stats.todayRevenue.toFixed(2)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UtensilsCrossed className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Plats actifs</p>
                <p className="text-xl font-bold">{stats.activeDishes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <Clock className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Commandes en attente</p>
                <p className="text-xl font-bold">{stats.pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={action.action}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders Preview */}
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
                  <Badge variant="outline" className="text-xs">
                    En préparation
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => onNavigate('orders')}
          >
            Voir toutes les commandes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
