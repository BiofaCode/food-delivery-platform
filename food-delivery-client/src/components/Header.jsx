import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

const Header = ({ cartItems = [], onLoginClick, onRegisterClick, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-orange-600">FoodDelivery</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Accueil
            </a>
            <a href="#restaurants" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              Restaurants
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
              À propos
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>

            {/* User actions */}
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{user.username}</span>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onLoginClick}>
                  Connexion
                </Button>
                <Button size="sm" onClick={onRegisterClick}>
                  Inscription
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                Accueil
              </a>
              <a href="#restaurants" className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                Restaurants
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 block px-3 py-2 text-base font-medium">
                À propos
              </a>
              <div className="flex space-x-2 px-3 py-2">
                {user ? (
                  <span className="text-sm">{user.username}</span>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={onLoginClick}>
                      Connexion
                    </Button>
                    <Button size="sm" onClick={onRegisterClick}>
                      Inscription
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

