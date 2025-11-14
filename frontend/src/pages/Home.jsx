import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Landing Page Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-logo">
            <img src="/logo.png" alt="Krishi Sangam Logo" className="landing-logo-icon" />
            <span className="landing-logo-text">Krishi Sangam</span>
          </div>
          <ul className="landing-menu">
            <li><button onClick={() => scrollToSection('home')} className="landing-link">Home</button></li>
            <li><button onClick={() => scrollToSection('features')} className="landing-link">Features</button></li>
            <li><button onClick={() => scrollToSection('about')} className="landing-link">About</button></li>
            <li><button onClick={() => scrollToSection('contact')} className="landing-link">Contact</button></li>
            <li className="landing-dropdown">
              <span className="landing-link">Register/Login</span>
              <div className="landing-dropdown-content">
                <Link to="/farmer/register">👨‍🌾 Farmer Register</Link>
                <Link to="/farmer/login">👨‍🌾 Farmer Login</Link>
                <Link to="/labour/register">👷 Labour Register</Link>
                <Link to="/labour/login">👷 Labour Login</Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
          preload="auto"
        >
          <source src="/video%203.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Krishi Sangam</h1>
          <p className="hero-subtitle">Jahaan Khet, Kaam aur Gyaan milte hain</p>
          <p className="hero-tagline">जहाँ खेत, काम और ज्ञान मिलते हैं</p>
          <p className="hero-description">
            A comprehensive platform connecting farmers with skilled agricultural workers,
            providing smart tools, weather updates, and government schemes for modern farming.
          </p>
          <div className="hero-buttons">
            <Link to="/farmer/register" className="btn btn-primary">Register as Farmer</Link>
            <Link to="/labour/register" className="btn btn-secondary">Register as Labour</Link>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍🌾</div>
            <h3>For Farmers</h3>
            <ul>
              <li>Post job requirements</li>
              <li>Check weather forecasts</li>
              <li>Crop prediction tools</li>
              <li>Manage applications</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👷</div>
            <h3>For Labourers</h3>
            <ul>
              <li>Browse available jobs</li>
              <li>Apply for positions</li>
              <li>Track applications</li>
              <li>Direct contact with farmers</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌤️</div>
            <h3>Today's Weather</h3>
            <ul>
              <li>Real-time weather data</li>
              <li>Temperature & humidity</li>
              <li>7-day forecasts</li>
              <li>Location-based updates</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Crop Prediction</h3>
            <ul>
              <li>AI-powered predictions</li>
              <li>Soil analysis</li>
              <li>Best crop suggestions</li>
              <li>Seasonal recommendations</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Yield Prediction</h3>
            <ul>
              <li>Accurate yield forecasts</li>
              <li>Historical data analysis</li>
              <li>Weather impact assessment</li>
              <li>Crop-specific predictions</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Smart Labour Recommendation</h3>
            <ul>
              <li>AI-based matching</li>
              <li>Skill-based filtering</li>
              <li>Experience verification</li>
              <li>Rating & reviews</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏛️</div>
            <h3>Government Schemes</h3>
            <ul>
              <li>Latest schemes info</li>
              <li>Eligibility checker</li>
              <li>Application guidance</li>
              <li>Subsidy calculator</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Sign up as a farmer or labourer</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Post/Browse Jobs</h3>
            <p>Farmers post jobs, labourers browse opportunities</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Connect</h3>
            <p>Apply for jobs and connect directly</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Work Together</h3>
            <p>Build successful agricultural partnerships</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2>About Krishi Sangam</h2>
          <div className="about-content">
            <div className="about-card">
              <div className="about-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                Empowering farmers and agricultural workers through technology, connecting them
                seamlessly while providing intelligent tools for better farming decisions.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">👥</div>
              <h3>For Farmers</h3>
              <p>
                Create job posts, get crop and yield predictions, check weather forecasts,
                and connect with skilled agricultural workers efficiently.
              </p>
            </div>
            <div className="about-card">
              <div className="about-icon">💼</div>
              <h3>For Labour</h3>
              <p>
                Browse available jobs, apply for positions, track applications, send requests,
                and manage payments - all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@krishisangam.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 1800-XXX-XXXX</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <h4>Address</h4>
                  <p>Agricultural Innovation Center<br/>New Delhi, India</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a message</h3>
              <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
