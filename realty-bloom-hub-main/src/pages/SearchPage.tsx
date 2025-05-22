
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || '';
  const state = searchParams.get('state') || '';
  const city = searchParams.get('city') || '';
  const locality = searchParams.get('locality') || '';

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p>Searching for properties to {searchType} in {locality}, {city}, {state}</p>
      </div>
      
      {/* Property listings would go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p>No properties found. This is a placeholder.</p>
      </div>
    </div>
  );
};

export default SearchPage;
