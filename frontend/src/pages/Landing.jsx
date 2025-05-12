
// LandingPage.js
import React from 'react';
import { Link } from 'react-scroll';
import '../App.css';

const LandingPage = () => {
  // Handle form submissions
  const handleFreeTrial = (e) => {
    e.preventDefault();
    // Open signup page
    window.open('/signup', '_blank');
  };

  const handleGetStarted = (e) => {
    e.preventDefault();
    // Open signup page
    window.open('/signup', '_blank');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Message sent successfully!');
  };

  // Features data
  const features = [
    {
      title: "Real-time Pricing Engine",
      description: "Market Trend Analysis with dynamic adjustments based on real-time demand"
    },
    {
      title: "Consumer Behavior Integration",
      description: "Behavioral analytics that refine pricing using buying and return trends"
    },
    {
      title: "Automated A/B Testing",
      description: "Refine pricing strategies with data-driven testing and consumer behavior insights"
    },
    {
      title: "Revenue Optimization",
      description: "Comprehensive reports with predictive modeling for accurate demand forecasting"
    },
    {
      title: "AI Negotiation Bots",
      description: "Advanced AI-powered tools for transparent pricing negotiations"
    },
    {
      title: "Real-Time Adaptability",
      description: "Market-responsive pricing that syncs inventory for immediate updates"
    }
  ];

  // How it works steps
  const steps = [
    {
      number: "1",
      title: "Input Pricing Data",
      description: "Connect your existing pricing data and inventory systems"
    },
    {
      number: "2",
      title: "Apply Bayesian Optimization",
      description: "Our AI analyzes market trends and consumer behavior"
    },
    {
      number: "3",
      title: "Generate Strategic Insights",
      description: "Receive actionable pricing recommendations"
    },
    {
      number: "4",
      title: "Monitor & Optimize Continuously",
      description: "Real-time adjustments keep you ahead of the competition"
    }
  ];

  // Pricing plans (updated with $0 for free trial)
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "/month",
      description: "Perfect for small businesses to try our platform",
      features: [
        "Real-time Pricing Engine",
        "Basic Market Trend Analysis",
        "Standard Reports",
        "Email Support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Ideal for growing businesses ready to optimize their pricing strategy",
      features: [
        "Everything in Free Trial",
        "Automated A/B Testing",
        "Revenue Optimization Reports",
        "Behavioral Analytics",
        "Priority Support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Full-featured solution for large businesses with complex pricing needs",
      features: [
        "Everything in Professional",
        "Advanced Bayesian Optimization",
        "AI Negotiation Bots",
        "Custom Integration",
        "Dedicated Account Manager"
      ],
      cta: "Contact Us",
      popular: false
    }
  ];

  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header>
        <div className="container">
          <nav>
            <div className="logo">Profit Optic</div>
            <div className="nav-links">
              <Link to="features" smooth={true} duration={500} className="nav-link">Features</Link>
              <Link to="how-it-works" smooth={true} duration={500} className="nav-link">How It Works</Link>
              <Link to="pricing" smooth={true} duration={500} className="nav-link">Pricing</Link>
              <Link to="contact" smooth={true} duration={500} className="nav-link">Contact</Link>
            </div>
            <button onClick={handleFreeTrial} className="cta-button">Start Free Trial</button>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="hero" id="home" style={{ padding: '150px 0' }}>
          <div className="container">
            <h1>Smarter Pricing Starts Here</h1>
            <h2>Leverage Bayesian Optimization to stay ahead of market trends</h2>
            <p>Profit Optic combines AI-powered pricing optimization with real-time market analysis to maximize your revenue and streamline your inventory management.</p>
            <div className="hero-buttons">
              <button onClick={handleFreeTrial} className="cta-button">Try Profit Optic Free</button>
              <Link to="how-it-works" smooth={true} duration={500} className="secondary-button">Learn More</Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section" id="features" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="section-title">
              <h2>Powerful Features</h2>
              <p>Our comprehensive suite of tools helps you optimize pricing strategies and boost revenue</p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" id="how-it-works" style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <div className="section-title">
              <h2>How It Works</h2>
              <p>Simple steps to transform your pricing strategy with AI optimization</p>
            </div>
            <div className="steps">
              {steps.map((step, index) => (
                <div className="step" key={index}>
                  <div className="step-number">{step.number}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="section" id="pricing" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="section-title">
              <h2>Pricing Plans</h2>
              <p>Choose the perfect plan to optimize your pricing strategy and boost revenue</p>
            </div>
            <div className="pricing-grid">
              {plans.map((plan, index) => (
                <div className="pricing-card" key={index}>
                  {plan.popular && <div className="popular-tag">Most Popular</div>}
                  <h3>{plan.name}</h3>
                  <div className="price">{plan.price} <span>{plan.period}</span></div>
                  <p>{plan.description}</p>
                  <ul className="pricing-features">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  {plan.cta === "Contact Us" ? (
                    <Link to="contact" smooth={true} duration={500} className="cta-button" style={{ display: 'block', textAlign: 'center' }}>
                      {plan.cta}
                    </Link>
                  ) : (
                    <button onClick={plan.cta === "Start Free Trial" ? handleFreeTrial : handleGetStarted} 
                            className="cta-button" 
                            style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                      {plan.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section" id="contact" style={{ backgroundColor: '#f8fafc', padding: '80px 0' }}>
          <div className="container">
            <div className="section-title">
              <h2>Contact Us</h2>
              <p>Ready to boost your revenue with intelligent pricing? Contact us today to learn how Profit Optic can transform your business.</p>
            </div>
            <div className="contact-form">
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" placeholder="Your company" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Your message" required></textarea>
                </div>
                <button type="submit" className="cta-button" style={{ border: 'none', cursor: 'pointer', width: '100%' }}>Send Message</button>
              </form>
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p>Or reach us directly:</p>
              <p style={{ marginTop: '10px' }}>Email: info@profitoptic.com<br />Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>Profit Optic</h3>
              <p style={{ color: 'var(--gray)' }}>AI-powered pricing optimization for modern businesses</p>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><Link to="features" smooth={true} duration={500}>Features</Link></li>
                <li><Link to="how-it-works" smooth={true} duration={500}>How It Works</Link></li>
                <li><Link to="pricing" smooth={true} duration={500}>Pricing</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#api-status">API Status</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Profit Optic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;



// const LandingPage = () => {
//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
//       {/* Header */}
//       <header style={{ background: 'linear-gradient(135deg, #004080, #0073e6)', color: 'white', padding: '20px 0' }}>
//         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>PricePilot</h1>
//           <nav>
//             <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
//               <li><a href="#features" style={{ color: '#f0f8ff', textDecoration: 'none', fontSize: '1.2rem' }}>Features</a></li>
//               <li><a href="#about" style={{ color: '#f0f8ff', textDecoration: 'none', fontSize: '1.2rem' }}>About</a></li>
//               <li><a href="#contact" style={{ color: '#f0f8ff', textDecoration: 'none', fontSize: '1.2rem' }}>Contact</a></li>
//               <li>
//                 <Link
//                   to="/signup"
//                   style={{
//                     background: '#ff6600',
//                     padding: '10px 20px',
//                     borderRadius: '5px',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     textDecoration: 'none',
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section
//         style={{
//           background: 'linear-gradient(135deg, #0073e6, #0059b3)',
//           color: 'white',
//           padding: '100px 0',
//           textAlign: 'center',
//         }}
//       >
//         <div>
//           <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Welcome to PricePilot</h2>
//           <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Your dynamic pricing solution for smarter sales</p>
//           <Link
//             to="/signup"
//             style={{
//               background: '#ff6600',
//               padding: '15px 30px',
//               color: 'white',
//               fontSize: '1.2rem',
//               borderRadius: '5px',
//               textDecoration: 'none',
//             }}
//           >
//             Get Started
//           </Link>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#f9fafb' }}>
//         <h3 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#333' }}>Features</h3>
//         <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
//           {[
//             ['Real-Time Pricing', 'Adjust prices based on real-time data.'],
//             ['Data Insights', 'Get valuable insights for your business.'],
//             ['Advanced Analytics', 'Make informed decisions with advanced analytics.']
//           ].map(([title, desc]) => (
//             <div
//               key={title}
//               style={{
//                 background: '#ffffff',
//                 padding: '30px',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                 flex: '1',
//                 minWidth: '250px',
//               }}
//             >
//               <h4 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#003366' }}>{title}</h4>
//               <p style={{ fontSize: '1rem', color: '#555' }}>{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" style={{ background: '#e6f0fa', padding: '80px 20px', textAlign: 'center' }}>
//         <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#003366' }}>About Us</h3>
//         <p style={{ fontSize: '1.2rem', color: '#333' }}>
//           We provide AI-powered solutions to help you set the perfect prices. With our dynamic pricing tool, maximize your revenue with minimal effort.
//         </p>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" style={{ padding: '80px 20px', background: '#ffffff', textAlign: 'center' }}>
//         <h3 style={{ fontSize: '2.5rem', marginBottom: '40px', color: '#003366' }}>Contact Us</h3>
//         <form action="#" style={{ maxWidth: '600px', margin: '0 auto' }}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             required
//             style={{
//               width: '100%',
//               padding: '15px',
//               marginBottom: '15px',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//             }}
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             required
//             style={{
//               width: '100%',
//               padding: '15px',
//               marginBottom: '15px',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//             }}
//           />
//           <textarea
//             placeholder="Your Message"
//             required
//             style={{
//               width: '100%',
//               padding: '15px',
//               marginBottom: '15px',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               background: '#ff6600',
//               color: 'white',
//               padding: '15px 30px',
//               borderRadius: '5px',
//               fontSize: '1.2rem',
//               border: 'none',
//               cursor: 'pointer',
//             }}
//           >
//             Send Message
//           </button>
//         </form>
//       </section>

//       {/* Footer */}
//       <footer style={{ background: '#1a1a1a', color: 'white', padding: '20px 0', textAlign: 'center' }}>
//         <p style={{ fontSize: '1rem' }}>&copy; 2025 PricePilot. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
