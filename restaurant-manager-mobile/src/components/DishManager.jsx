import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  UtensilsCrossed,
  ArrowLeft
} from 'lucide-react';
import axios from 'axios';

const DishManager = ({ restaurant, onBack }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDish, setEditingDish] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      if (restaurant?.id) {
        const response = await axios.get(`http://localhost:5000/restaurants/${restaurant.id}/dishes`);
        setDishes(response.data.dishes || []);
      } else {
        // Données de démonstration
        setDishes([
          {
            id: 1,
            name: "Pizza Margherita",
            description: "Tomate, mozzarella, basilic frais",
            price: 12.50,
            image_url: null
          },
          {
            id: 2,
            name: "Burger Classique",
            description: "Steak haché, salade, tomate, oignon",
            price: 15.00,
            image_url: null
          },
          {
            id: 3,
            name: "Salade César",
            description: "Salade romaine, parmesan, croûtons, sauce césar",
            price: 11.00,
            image_url: null
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des plats:', error);
      // Utiliser des données de démonstration en cas d'erreur
      setDishes([
        {
          id: 1,
          name: "Pizza Margherita",
          description: "Tomate, mozzarella, basilic frais",
          price: 12.50,
          image_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const dishData = {
        ...formData,
        price: parseFloat(formData.price),
        restaurant_id: restaurant?.id || 1
      };

      const response = await axios.post('http://localhost:5000/dishes', dishData);
      
      // Ajouter le nouveau plat à la liste
      setDishes([...dishes, { ...dishData, id: response.data.id || Date.now() }]);
      setFormData({ name: '', description: '', price: '', image_url: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plat:', error);
      // Ajouter localement pour la démonstration
      const newDish = {
        ...formData,
        price: parseFloat(formData.price),
        id: Date.now()
      };
      setDishes([...dishes, newDish]);
      setFormData({ name: '', description: '', price: '', image_url: '' });
      setShowAddForm(false);
    }
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish.id);
    setFormData({
      name: dish.name,
      description: dish.description,
      price: dish.price.toString(),
      image_url: dish.image_url || ''
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedDish = {
        ...formData,
        price: parseFloat(formData.price),
        id: editingDish
      };

      // Mettre à jour localement
      setDishes(dishes.map(dish => 
        dish.id === editingDish ? updatedDish : dish
      ));
      
      setEditingDish(null);
      setFormData({ name: '', description: '', price: '', image_url: '' });
    } catch (error) {
      console.error('Erreur lors de la modification du plat:', error);
    }
  };

  const handleDeleteDish = (dishId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      setDishes(dishes.filter(dish => dish.id !== dishId));
    }
  };

  const cancelEdit = () => {
    setEditingDish(null);
    setFormData({ name: '', description: '', price: '', image_url: '' });
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
          <p>Chargement des plats...</p>
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
        <h1 className="text-xl font-bold">Gestion des plats</h1>
        <Button 
          size="sm"
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      {/* Add Dish Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Ajouter un nouveau plat</span>
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddDish} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du plat</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Dishes List */}
      <div className="space-y-4">
        {dishes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Aucun plat disponible</p>
              <Button 
                className="mt-4"
                onClick={() => setShowAddForm(true)}
              >
                Ajouter votre premier plat
              </Button>
            </CardContent>
          </Card>
        ) : (
          dishes.map((dish) => (
            <Card key={dish.id}>
              <CardContent className="p-4">
                {editingDish === dish.id ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`edit-name-${dish.id}`}>Nom du plat</Label>
                      <Input
                        id={`edit-name-${dish.id}`}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`edit-description-${dish.id}`}>Description</Label>
                      <Input
                        id={`edit-description-${dish.id}`}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`edit-price-${dish.id}`}>Prix (€)</Label>
                      <Input
                        id={`edit-price-${dish.id}`}
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{dish.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                      <Badge variant="secondary">{dish.price.toFixed(2)}€</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditDish(dish)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteDish(dish.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DishManager;

