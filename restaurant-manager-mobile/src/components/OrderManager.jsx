import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft,
  Package,
  User,
  MapPin
} from 'lucide-react';

const OrderManager = ({ restaurant, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'preparing', 'ready', 'delivered'

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Simuler des données de commandes
      const mockOrders = [
        {
          id: 1001,
          customer_name: "Marie Dupont",
          customer_phone: "06 12 34 56 78",
          items: [
            { name: "Pizza Margherita", quantity: 2, price: 12.50 },
            { name: "Coca Cola", quantity: 2, price: 3.00 }
          ],
          total: 31.00,
          status: "pending",
          order_date: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
          delivery_address: "123 Rue de la Paix, Paris"
        },
        {
          id: 1002,
          customer_name: "Jean Martin",
          customer_phone: "06 98 76 54 32",
          items: [
            { name: "Burger Classique", quantity: 1, price: 15.00 },
            { name: "Frites", quantity: 1, price: 4.50 }
          ],
          total: 19.50,
          status: "preparing",
          order_date: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
          delivery_address: "456 Avenue des Champs, Paris"
        },
        {
          id: 1003,
          customer_name: "Sophie Leroy",
          customer_phone: "06 11 22 33 44",
          items: [
            { name: "Salade César", quantity: 1, price: 11.00 }
          ],
          total: 11.00,
          status: "ready",
          order_date: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
          delivery_address: "789 Boulevard Saint-Germain, Paris"
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'preparing': return 'En préparation';
      case 'ready': return 'Prêt';
      case 'delivered': return 'Livré';
      default: return status;
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'delivered';
      default: return null;
    }
  };

  const getNextStatusText = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'Commencer la préparation';
      case 'preparing': return 'Marquer comme prêt';
      case 'ready': return 'Marquer comme livré';
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60)); // différence en minutes
    if (diff < 60) {
      return `Il y a ${diff} min`;
    } else {
      const hours = Math.floor(diff / 60);
      return `Il y a ${hours}h${diff % 60}min`;
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
        <div className="text-center py-8">
          <p>Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </div>
        <h1 className="text-xl font-bold">Gestion des commandes</h1>
        <div className="w-16"></div> {/* Spacer for alignment */}
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'pending', label: 'En attente' },
          { key: 'preparing', label: 'En préparation' },
          { key: 'ready', label: 'Prêtes' },
          { key: 'delivered', label: 'Livrées' }
        ].map((filterOption) => (
          <Button
            key={filterOption.key}
            size="sm"
            variant={filter === filterOption.key ? 'default' : 'outline'}
            onClick={() => setFilter(filterOption.key)}
            className="whitespace-nowrap"
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">
                {filter === 'all' ? 'Aucune commande' : `Aucune commande ${getStatusText(filter).toLowerCase()}`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="border-l-4" style={{ borderLeftColor: getStatusColor(order.status).replace('bg-', '#') }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(order.order_date)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">{order.customer_name}</span>
                    <span className="text-gray-600">• {order.customer_phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm text-gray-600">{order.delivery_address}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="font-medium mb-2">Articles commandés :</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>{(item.quantity * item.price).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total :</span>
                      <span>{order.total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {getNextStatus(order.status) && (
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {getNextStatusText(order.status)}
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderManager;

