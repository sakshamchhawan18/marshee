tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome to the Marshee Family
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          We are happy to have you with us, our app is made to connect you to the best services for your dog
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default HeroSection;