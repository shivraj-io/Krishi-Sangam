import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, userType, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#8BC34A" opacity="0.2"/>
              <path d="M30 45 Q50 20 70 45" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2"/>
              <circle cx="40" cy="40" r="3" fill="#2E7D32"/>
              <circle cx="50" cy="35" r="3" fill="#2E7D32"/>
              <circle cx="60" cy="40" r="3" fill="#2E7D32"/>
              <path d="M35 55 L40 65 L35 75 M45 55 L50 65 L45 75 M55 55 L60 65 L55 75" 
                    stroke="#FF9800" strokeWidth="3" fill="none"/>
            </svg>
            <span className="logo-text">Krishi Sangam</span>
          </div>
        </Link>

        <ul className="navbar-menu">
          {!isAuthenticated ? (
            <>
              <li className="navbar-item">
                <Link to="/" className="navbar-link">Home</Link>
              </li>
              <li className="navbar-item dropdown">
                <span className="navbar-link">Farmer</span>
                <div className="dropdown-content">
                  <Link to="/farmer/register">Register</Link>
                  <Link to="/farmer/login">Login</Link>
                </div>
              </li>
              <li className="navbar-item dropdown">
                <span className="navbar-link">Labour</span>
                <div className="dropdown-content">
                  <Link to="/labour/register">Register</Link>
                  <Link to="/labour/login">Login</Link>
                </div>
              </li>
            </>
          ) : userType === 'farmer' ? (
            <>
              <li className="navbar-item">
                <Link to="/farmer/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              <li className="navbar-item">
                <Link to="/farmer/create-job" className="navbar-link">Create Job</Link>
              </li>
              <li className="navbar-item dropdown">
                <span className="navbar-link">Features</span>
                <div className="dropdown-content">
                  <Link to="/farmer/weather">🌤️ Today's Weather</Link>
                  <Link to="/farmer/crop-prediction">🌾 Crop Prediction</Link>
                  <Link to="/farmer/yield-prediction">📊 Yield Prediction</Link>
                  <Link to="/farmer/labour-recommendation">🤖 Smart Labour</Link>
                  <Link to="/farmer/gov-schemes">🏛️ Govt Schemes</Link>
                </div>
              </li>
              <li className="navbar-item">
                <span className="navbar-link user-info">👤 {user?.name}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/labour/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              <li className="navbar-item">
                <Link to="/labour/jobs" className="navbar-link">All Jobs</Link>
              </li>
              <li className="navbar-item">
                <Link to="/labour/my-applications" className="navbar-link">My Applications</Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-link user-info">👤 {user?.name}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
