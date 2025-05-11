import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import About from '../components/About';
import Pricing from '../components/Pricing';
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';
import '../App.css';

const LandingPage = () => {
  return (
    <div className="font-sans scroll-smooth">
      {/* NAVBAR + HERO */}
      <div className="bg-gradient-to-b from-[#002b80] to-[#0073e6] text-white">
        <Header />
        <Hero />
      </div>

      {/* FEATURES SECTION */}
      <section className="bg-white py-20 px-5">
        <Features />
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-blue-50 py-20 px-5">
        <HowItWorks />
      </section>

      {/* ABOUT US – now more visible */}
      <section className="bg-[#f0f8ff] py-20 px-5">
        <About />
      </section>

      {/* PRICING */}
      <section className="bg-white py-20 px-5">
        <Pricing />
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-blue-50 py-20 px-5">
        <Testimonial />
      </section>

      {/* CONTACT */}
      <section className="bg-white py-20 px-5">
        <Contact />
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a1a] text-white py-5 text-center">
        <p className="text-sm">&copy; 2025 PricePilot. All rights reserved.</p>
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
