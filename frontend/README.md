# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.











import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ fontFamily: "'Inter', Arial, sans-serif", margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #003366, #004080)', 
        color: 'white', 
        padding: '20px 0',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="#FF6B00"/>
              <path d="M3 11L12 16L21 11" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 15L12 20L21 15" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '700', margin: 0 }}>PricePilot</h1>
          </div>
          <nav>
            <ul style={{ 
              listStyle: 'none', 
              display: 'flex', 
              gap: '30px',
              alignItems: 'center',
              margin: 0,
              padding: 0
            }}>
              <li><a href="#features" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '5px 10px',
                borderRadius: '4px'
              }} onMouseEnter={(e) => e.target.style.color = '#FF6B00'} 
                 onMouseLeave={(e) => e.target.style.color = 'white'}>Features</a></li>
              <li><a href="#technology" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '5px 10px',
                borderRadius: '4px'
              }} onMouseEnter={(e) => e.target.style.color = '#FF6B00'} 
                 onMouseLeave={(e) => e.target.style.color = 'white'}>Technology</a></li>
              <li><a href="#pricing" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                padding: '5px 10px',
                borderRadius: '4px'
              }} onMouseEnter={(e) => e.target.style.color = '#FF6B00'} 
                 onMouseLeave={(e) => e.target.style.color = 'white'}>Pricing</a></li>
              <li>
                <a
                  href="#demo"
                  style={{
                    background: 'transparent',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: '600',
                    textDecoration: 'none',
                    border: '2px solid #FF6B00',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#FF6B00';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'white';
                  }}
                >
                  Request Demo
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #004080, #002244)',
          color: 'white',
          padding: '120px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '20px',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>Optimize Your Pricing Strategy with AI</h2>
          <p style={{ 
            fontSize: '1.4rem', 
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto',
            opacity: 0.9
          }}>PricePilot leverages machine learning algorithms to dynamically adjust prices in real-time, maximizing your revenue while staying competitive in the market.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <a
              href="#demo"
              style={{
                background: '#FF6B00',
                padding: '16px 32px',
                color: 'white',
                fontSize: '1.2rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#E05D00';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#FF6B00';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              Get Started
            </a>
            <a
              href="#technology"
              style={{
                background: 'transparent',
                padding: '16px 32px',
                color: 'white',
                fontSize: '1.2rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: '2px solid white'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Learn More
            </a>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          opacity: 0.15,
          zIndex: 1
        }}></div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        padding: '60px 20px',
        background: '#F8FAFC',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '40px'
        }}>
          {[
            ['15-30%', 'Average revenue increase for our clients'],
            ['99.9%', 'System uptime reliability'],
            ['24/7', 'Real-time price monitoring'],
            ['50ms', 'Average response time']
          ].map(([value, label]) => (
            <div key={label} style={{ minWidth: '200px' }}>
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#003366',
                marginBottom: '10px'
              }}>{value}</div>
              <div style={{ 
                fontSize: '1.1rem',
                color: '#4A5568',
                fontWeight: '500'
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ 
        padding: '100px 20px', 
        textAlign: 'center', 
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px', 
            color: '#003366',
            fontWeight: '700'
          }}>Advanced Dynamic Pricing Features</h3>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#4A5568',
            maxWidth: '700px',
            margin: '0 auto 60px',
            lineHeight: '1.6'
          }}>
            Our platform combines cutting-edge algorithms with market intelligence to deliver optimal pricing strategies.
          </p>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            textAlign: 'left'
          }}>
            {[
              {
                title: 'Machine Learning Models',
                description: 'Self-learning algorithms that continuously improve pricing recommendations based on new data.',
                icon: '🧠'
              },
              {
                title: 'Competitor Price Tracking',
                description: 'Monitor competitor pricing in real-time and adjust your strategy accordingly.',
                icon: '👀'
              },
              {
                title: 'Demand Forecasting',
                description: 'Predict future demand patterns to optimize inventory and pricing simultaneously.',
                icon: '📈'
              },
              {
                title: 'Price Elasticity Analysis',
                description: 'Understand how sensitive your customers are to price changes for different products.',
                icon: '⚖️'
              },
              {
                title: 'Automated Rule Engine',
                description: 'Set business rules and constraints that the system will automatically respect.',
                icon: '⚙️'
              },
              {
                title: 'A/B Testing Framework',
                description: 'Test different pricing strategies and measure their impact on conversion and revenue.',
                icon: '🔬'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: '#F8FAFC',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  borderLeft: '4px solid #FF6B00'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{ 
                  fontSize: '2rem',
                  marginBottom: '15px'
                }}>{feature.icon}</div>
                <h4 style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '15px', 
                  color: '#003366',
                  fontWeight: '600'
                }}>{feature.title}</h4>
                <p style={{ 
                  fontSize: '1rem', 
                  color: '#4A5568',
                  lineHeight: '1.6'
                }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" style={{ 
        padding: '100px 20px',
        background: 'linear-gradient(135deg, #003366, #002244)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>Our Proprietary Technology Stack</h3>
          <p style={{ 
            fontSize: '1.2rem', 
            maxWidth: '700px',
            margin: '0 auto 60px',
            lineHeight: '1.6',
            opacity: 0.9
          }}>
            Combining academic research with industry expertise to deliver state-of-the-art pricing solutions.
          </p>
          
          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {[
              {
                title: 'Reinforcement Learning',
                description: 'Our algorithms learn optimal pricing strategies through continuous interaction with market data.'
              },
              {
                title: 'Bayesian Optimization',
                description: 'Efficiently explore the pricing space to find optimal points while