import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="hero-title">
            Smarter Pricing<br />Starts Here
          </h1>
          <p className="hero-subtitle">
            Leverage Bayesian Optimization to stay ahead of market trends.
          </p>
          <a 
            href="#features" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
            }}
            className="cta-btn"
          >
            Try Profit Optic Free
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
