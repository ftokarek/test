'use client';
import React from 'react';
import HeaderSlider from '@/components/HeaderSlider';
import HomeProducts from '@/components/HomeProducts';
import Banner from '@/components/Banner';
import NewsLetter from '@/components/NewsLetter';
import FeaturedProduct from '@/components/FeaturedProduct';
import AILandingPage from '@/components/AILandingPage';
import Layout from '@/components/Layout';

const Home = () => {
  return (
    <Layout>
      <AILandingPage />
      <div className="px-6 md:px-16 lg:px-32 py-8 " id="second-section">
        
        <div className="py-20">
          <Banner />
        </div>
        
      </div>
    </Layout>
  );
};

export default Home;
