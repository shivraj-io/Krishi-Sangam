import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
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

      <section className="features">
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
    </div>
  );
};

export default Home;
