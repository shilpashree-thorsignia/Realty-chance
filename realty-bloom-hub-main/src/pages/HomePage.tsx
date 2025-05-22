import React from 'react';
import Layout from '../components/layout/Layout';
import SearchHero from '../components/home/SearchHero';
import FeaturedCategories from '../components/home/FeaturedCategories';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <SearchHero />
      <FeaturedCategories />
      {/* Add more home page components here as needed */}
    </Layout>
  );
};

export default HomePage;