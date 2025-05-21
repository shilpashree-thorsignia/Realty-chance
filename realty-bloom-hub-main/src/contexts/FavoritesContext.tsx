
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteProperty {
  id: string;
  title: string;
  location: string;
  image: string;
}

interface FavoritesContextType {
  favorites: FavoriteProperty[];
  isFavorite: (id: string) => boolean;
  addToFavorites: (property: FavoriteProperty) => void;
  removeFromFavorites: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => {
    return favorites.some(property => property.id === id);
  };

  const addToFavorites = (property: FavoriteProperty) => {
    if (!isFavorite(property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      isFavorite, 
      addToFavorites, 
      removeFromFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
