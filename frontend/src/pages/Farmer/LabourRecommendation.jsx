import { useState, useEffect } from 'react';
import { jobAPI } from '../../services/api';
import './LabourRecommendation.css';

const LabourRecommendation = () => {
  const [requirements, setRequirements] = useState({
    jobType: '',
    skills: '',
    experience: '',
    location: '',
    duration: '',
    workersNeeded: 1,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const jobTypes = ['Plowing', 'Sowing', 'Harvesting', 'Irrigation', 'Weeding', 'General Labor', 'Pesticide Application', 'Others'];

  const handleChange = (e) => {
    setRequirements({
      ...requirements,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI recommendation
    setTimeout(() => {
      const mockLabourers = [
        {
          id: 1,
          name: 'Ramesh Kumar',
          skills: ['Harvesting', 'Irrigation', 'Plowing'],
          experience: 8,
          rating: 4.8,
          location: 'Punjab',
          availability: 'Available',
          matchScore: 95,
          completedJobs: 145,
          phoneVerified: true,
        },
        {
          id: 2,
          name: 'Suresh Singh',
          skills: ['Sowing', 'Weeding', 'General Labor'],
          experience: 5,
          rating: 4.5,
          location: 'Haryana',
          availability: 'Available',
          matchScore: 88,
          completedJobs: 89,
          phoneVerified: true,
        },
        {
          id: 3,
          name: 'Mahesh Yadav',
          skills: ['Plowing', 'Harvesting'],
          experience: 10,
          rating: 4.9,
          location: 'Uttar Pradesh',
          availability: 'Busy',
          matchScore: 82,
          completedJobs: 210,
          phoneVerified: true,
        },
        {
          id: 4,
          name: 'Rajesh Patel',
          skills: ['Irrigation', 'Pesticide Application'],
          experience: 6,
          rating: 4.6,
          location: 'Gujarat',
          availability: 'Available',
          matchScore: 78,
          completedJobs: 95,
          phoneVerified: true,
        },
      ];

      setRecommendations(mockLabourers);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setRequirements({
      jobType: '',
      skills: '',
      experience: '',
      location: '',
      duration: '',
      workersNeeded: 1,
    });
    setRecommendations([]);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return '#4caf50';
    if (score >= 75) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="labour-recommendation-container">
      <div className="recommendation-header">
        <h1>🤖 Smart Labour Recommendation System</h1>
        <p>AI-powered matching to find the perfect labourers for your farm work</p>
      </div>

      <div className="recommendation-form-card">
        <h2>Enter Your Requirements</h2>
        <form onSubmit={handleSearch} className="recommendation-form">
          <div className="form-row">
            <div className="form-group">
              <label>Job Type *</label>
              <select name="jobType" value={requirements.jobType} onChange={handleChange} required>
                <option value="">Select job type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Required Skills</label>
              <input
                type="text"
                name="skills"
                value={requirements.skills}
                onChange={handleChange}
                placeholder="e.g., Plowing, Harvesting"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Minimum Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={requirements.experience}
                onChange={handleChange}
                min="0"
                placeholder="e.g., 3"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={requirements.location}
                onChange={handleChange}
                placeholder="e.g., Punjab"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={requirements.duration}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 7"
              />
            </div>

            <div className="form-group">
              <label>Workers Needed</label>
              <input
                type="number"
                name="workersNeeded"
                value={requirements.workersNeeded}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleReset} className="btn-reset">
              Reset
            </button>
            <button type="submit" className="btn-search" disabled={loading}>
              {loading ? 'Searching...' : 'Find Labourers'}
            </button>
          </div>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <div className="section-header">
            <h2>Recommended Labourers</h2>
            <p>Showing {recommendations.length} matches based on your requirements</p>
          </div>

          <div className="recommendations-grid">
            {recommendations.map((labour) => (
              <div key={labour.id} className="labour-card">
                <div className="labour-header">
                  <div className="labour-avatar">
                    <span>{labour.name.charAt(0)}</span>
                  </div>
                  <div className="labour-info">
                    <h3>{labour.name}</h3>
                    <div className="labour-rating">
                      <span className="stars">⭐ {labour.rating}</span>
                      <span className="reviews">({labour.completedJobs} jobs)</span>
                    </div>
                  </div>
                  <div 
                    className="match-badge" 
                    style={{ backgroundColor: getMatchColor(labour.matchScore) }}
                  >
                    {labour.matchScore}% Match
                  </div>
                </div>

                <div className="labour-details">
                  <div className="detail-item">
                    <span className="detail-icon">🎯</span>
                    <div>
                      <strong>Skills:</strong>
                      <div className="skills-tags">
                        {labour.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">💼</span>
                    <span><strong>Experience:</strong> {labour.experience} years</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span><strong>Location:</strong> {labour.location}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">✅</span>
                    <span><strong>Completed Jobs:</strong> {labour.completedJobs}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">📱</span>
                    <span>
                      <strong>Phone:</strong> 
                      {labour.phoneVerified && <span className="verified"> Verified ✓</span>}
                    </span>
                  </div>

                  <div className="availability-status">
                    <span className={`status-badge ${labour.availability.toLowerCase()}`}>
                      {labour.availability}
                    </span>
                  </div>
                </div>

                <div className="labour-actions">
                  <button className="btn-view-profile">View Profile</button>
                  <button className="btn-contact">Contact Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourRecommendation;
