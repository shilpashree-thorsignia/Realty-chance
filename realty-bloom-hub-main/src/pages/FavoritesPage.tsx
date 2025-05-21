
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Heart, Bell, BellOff, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites, wishlistAlerts, toggleWishlistAlerts } = useFavorites();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Your Favorite Properties</h1>
        <p className="text-muted-foreground mb-8">
          Properties you've saved to revisit later
        </p>

        <div className="mb-8 flex items-center justify-between bg-muted/30 rounded-lg p-4">
          <div className="flex items-center">
            <div className={`${wishlistAlerts ? 'text-primary' : 'text-muted-foreground'} mr-3`}>
              {wishlistAlerts ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-medium">Price Alerts</h3>
              <p className="text-sm text-muted-foreground">
                {wishlistAlerts 
                  ? "You'll be notified about price changes for your favorite properties." 
                  : "Price alerts are currently disabled."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{wishlistAlerts ? 'On' : 'Off'}</span>
            <Switch checked={wishlistAlerts} onCheckedChange={toggleWishlistAlerts} />
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <Link to={`/properties/${property.id}`}>
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <button 
                    onClick={() => removeFromFavorites(property.id)}
                    className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-white transition-colors"
                  >
                    <Heart className="h-5 w-5" fill="currentColor" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1">
                    <Link to={`/properties/${property.id}`} className="hover:text-primary transition-colors">
                      {property.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/properties/${property.id}`}>
                      <Button size="sm">View Property</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFromFavorites(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-lg">
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding properties to your favorites by clicking the heart icon on any property.
            </p>
            <Link to="/properties">
              <Button size="lg">Browse Properties</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;
