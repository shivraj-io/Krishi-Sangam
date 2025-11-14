import { useState } from 'react';
import Navbar from '../../components/Common/Navbar';
import './GovSchemes.css';

const GovSchemes = () => {
  const [filters, setFilters] = useState({
    state: '',
    cropType: '',
    category: '',
  });

  const schemes = [
    {
      id: 1,
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'Financial Support',
      description: 'Direct income support of ₹6000 per year to all farmer families in three equal installments.',
      eligibility: 'All landholding farmer families',
      benefits: '₹6,000 per year in 3 installments',
      applicationProcess: 'Online through PM-KISAN portal or CSC',
      link: 'https://pmkisan.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 2,
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Insurance',
      description: 'Comprehensive crop insurance scheme providing financial support to farmers in case of crop loss.',
      eligibility: 'All farmers growing notified crops',
      benefits: 'Up to 100% sum insured coverage',
      applicationProcess: 'Through banks, CSCs, or insurance portals',
      link: 'https://pmfby.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 3,
      name: 'Kisan Credit Card (KCC)',
      category: 'Credit & Loans',
      description: 'Provides adequate and timely credit support for farmers for comprehensive needs.',
      eligibility: 'All farmers including tenant farmers and sharecroppers',
      benefits: 'Credit up to ₹3 lakh at 4% interest',
      applicationProcess: 'Through banks with required documents',
      link: 'https://www.nabard.org/kcc.aspx',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 4,
      name: 'PM Kisan Maandhan Yojana',
      category: 'Pension',
      description: 'Old age pension scheme for small and marginal farmers.',
      eligibility: 'Farmers aged 18-40 years with landholding up to 2 hectares',
      benefits: '₹3,000 monthly pension after 60 years',
      applicationProcess: 'Through CSC or online portal',
      link: 'https://maandhan.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 5,
      name: 'Soil Health Card Scheme',
      category: 'Agricultural Support',
      description: 'Provides soil health cards to farmers with soil nutrient status and fertilizer recommendations.',
      eligibility: 'All farmers',
      benefits: 'Free soil testing and health card',
      applicationProcess: 'Through agricultural departments',
      link: 'https://soilhealth.dac.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 6,
      name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'Organic Farming',
      description: 'Promotes organic farming and helps farmers adopt eco-friendly practices.',
      eligibility: 'Groups of farmers willing to practice organic farming',
      benefits: '₹50,000 per hectare for 3 years',
      applicationProcess: 'Through state agriculture departments',
      link: 'https://pgsindia-ncof.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 7,
      name: 'National Agriculture Market (e-NAM)',
      category: 'Marketing',
      description: 'Online trading platform for agricultural commodities across India.',
      eligibility: 'All farmers and traders',
      benefits: 'Better price discovery and transparent transactions',
      applicationProcess: 'Registration through e-NAM portal',
      link: 'https://www.enam.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
    {
      id: 8,
      name: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
      category: 'Irrigation',
      description: 'Focuses on creating sources for assured irrigation and expanding cultivable land.',
      eligibility: 'All farmers',
      benefits: 'Subsidy on drip and sprinkler irrigation',
      applicationProcess: 'Through state irrigation departments',
      link: 'https://pmksy.gov.in/',
      status: 'Active',
      applicableStates: 'All India',
    },
  ];

  const categories = ['All', 'Financial Support', 'Insurance', 'Credit & Loans', 'Pension', 'Agricultural Support', 'Organic Farming', 'Marketing', 'Irrigation'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSchemes = schemes.filter(scheme => {
    if (selectedCategory === 'All') return true;
    return scheme.category === selectedCategory;
  });

  return (
    <>
      <Navbar />
      <div className="gov-schemes-container">
        <div className="schemes-header">
          <h1>🏛️ Government Schemes for Farmers</h1>
          <p>Explore various government schemes and subsidies available for farmers</p>
        </div>

      <div className="schemes-filters">
        <h3>Filter by Category</h3>
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="schemes-count">
        <p>Showing {filteredSchemes.length} scheme(s)</p>
      </div>

      <div className="schemes-grid">
        {filteredSchemes.map(scheme => (
          <div key={scheme.id} className="scheme-card">
            <div className="scheme-header">
              <div className="scheme-badge">{scheme.category}</div>
              <div className="scheme-status active">{scheme.status}</div>
            </div>

            <h3 className="scheme-name">{scheme.name}</h3>
            <p className="scheme-description">{scheme.description}</p>

            <div className="scheme-details">
              <div className="detail-row">
                <strong>✓ Eligibility:</strong>
                <p>{scheme.eligibility}</p>
              </div>

              <div className="detail-row">
                <strong>💰 Benefits:</strong>
                <p>{scheme.benefits}</p>
              </div>

              <div className="detail-row">
                <strong>📝 How to Apply:</strong>
                <p>{scheme.applicationProcess}</p>
              </div>

              <div className="detail-row">
                <strong>📍 Applicable:</strong>
                <p>{scheme.applicableStates}</p>
              </div>
            </div>

            <div className="scheme-actions">
              <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="btn-apply">
                Visit Official Portal →
              </a>
              <button className="btn-more-info">More Details</button>
            </div>
          </div>
        ))}
      </div>

      <div className="help-section">
        <div className="help-card">
          <h3>💡 Need Help?</h3>
          <p>Contact your nearest agricultural department or Krishi Vigyan Kendra (KVK) for assistance with scheme applications.</p>
          <div className="help-contacts">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Kisan Call Center</strong>
                <p>1800-180-1551 (Toll Free)</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🌐</span>
              <div>
                <strong>Agriculture Department</strong>
                <p>Visit your state agriculture website</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default GovSchemes;
