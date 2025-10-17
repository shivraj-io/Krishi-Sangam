import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🌾 Krishi Sangam</h3>
          <p>Connecting Farmers and Labourers for a Better Future</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 info@krishisangam.com</p>
          <p>📱 +91 1234567890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Krishi Sangam. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
