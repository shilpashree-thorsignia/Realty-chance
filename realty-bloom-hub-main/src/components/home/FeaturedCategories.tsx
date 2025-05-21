
import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
}

const categories: Category[] = [
  {
    id: "apartments",
    name: "Apartments",
    count: 240,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "houses",
    name: "Houses",
    count: 112,
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "villas",
    name: "Luxury Villas",
    count: 86,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "commercial",
    name: "Commercial",
    count: 67,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="container py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
        <p className="text-muted-foreground">
          Explore our wide range of properties by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            to={`/properties?category=${category.id}`}
            key={category.id}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-[4/3]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-sm opacity-80">{category.count} Properties</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
