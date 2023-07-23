import React from 'react';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Cook's Compass
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Navigating the Culinary World
        </span>
      </h1>
      <p className="desc text-center">
        Welcome to Cook's Compass! Navigate the culinary world with ease,
        creating your own recipes and discovering a treasure trove of delectable
        dishes shared by fellow food enthusiasts. Explore, create, and celebrate
        the joy of cooking together!
      </p>
    </section>
  );
};

export default Home;
