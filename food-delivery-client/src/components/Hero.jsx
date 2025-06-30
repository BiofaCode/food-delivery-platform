import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Votre nourriture préférée
          <br />
          <span className="text-yellow-300">livrée en 30 minutes</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Découvrez les meilleurs restaurants de votre ville et commandez en quelques clics
        </p>
        
        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un restaurant ou un plat..."
              className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
            Commander maintenant
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
            Découvrir les restaurants
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

