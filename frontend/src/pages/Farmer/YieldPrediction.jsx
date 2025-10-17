import { useState } from 'react';
import './YieldPrediction.css';

const YieldPrediction = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    area: '',
    soilType: '',
    season: '',
    rainfall: '',
    temperature: '',
    fertilizer: '',
    pesticide: '',
    irrigation: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const cropTypes = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Pulses', 'Vegetables', 'Fruits'];
  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain'];
  const seasons = ['Kharif', 'Rabi', 'Zaid'];
  const irrigationTypes = ['Drip', 'Sprinkler', 'Flood', 'Rain-fed'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const baseYield = Math.random() * 5 + 3; // 3-8 tons per hectare
      setPrediction({
        estimatedYield: baseYield.toFixed(2),
        confidence: Math.floor(Math.random() * 15 + 80),
        recommendations: [
          'Ensure proper irrigation during flowering stage',
          'Apply recommended fertilizers at the right time',
          'Monitor for pest infestations regularly',
          'Maintain optimal soil moisture levels',
        ],
      });
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      cropType: '',
      area: '',
      soilType: '',
      season: '',
      rainfall: '',
      temperature: '',
      fertilizer: '',
      pesticide: '',
      irrigation: '',
    });
    setPrediction(null);
  };

  return (
    <div className="yield-prediction-container">
      <div className="prediction-header">
        <h1>📊 Yield Prediction</h1>
        <p>Estimate your crop yield based on various agricultural parameters</p>
      </div>

      <div className="prediction-content">
        <div className="prediction-form-section">
          <h2>Enter Crop Details</h2>
          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-row">
              <div className="form-group">
                <label>Crop Type *</label>
                <select name="cropType" value={formData.cropType} onChange={handleChange} required>
                  <option value="">Select crop</option>
                  {cropTypes.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Area (in hectares) *</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  min="0.1"
                  step="0.1"
                  placeholder="e.g., 2.5"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Soil Type *</label>
                <select name="soilType" value={formData.soilType} onChange={handleChange} required>
                  <option value="">Select soil type</option>
                  {soilTypes.map(soil => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Season *</label>
                <select name="season" value={formData.season} onChange={handleChange} required>
                  <option value="">Select season</option>
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expected Rainfall (mm)</label>
                <input
                  type="number"
                  name="rainfall"
                  value={formData.rainfall}
                  onChange={handleChange}
                  placeholder="e.g., 800"
                />
              </div>

              <div className="form-group">
                <label>Avg Temperature (°C)</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="e.g., 28"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fertilizer Usage (kg/ha)</label>
                <input
                  type="number"
                  name="fertilizer"
                  value={formData.fertilizer}
                  onChange={handleChange}
                  placeholder="e.g., 150"
                />
              </div>

              <div className="form-group">
                <label>Irrigation Type</label>
                <select name="irrigation" value={formData.irrigation} onChange={handleChange}>
                  <option value="">Select irrigation</option>
                  {irrigationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleReset} className="btn-reset">
                Reset
              </button>
              <button type="submit" className="btn-predict" disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Yield'}
              </button>
            </div>
          </form>
        </div>

        {prediction && (
          <div className="prediction-result">
            <h2>Yield Prediction Results</h2>
            
            <div className="result-card">
              <div className="result-main">
                <div className="result-icon">🌾</div>
                <div className="result-value">
                  <h3>{prediction.estimatedYield} tons/hectare</h3>
                  <p>Estimated Yield</p>
                </div>
              </div>
              
              <div className="confidence-meter">
                <div className="confidence-label">
                  <span>Confidence Level</span>
                  <span className="confidence-value">{prediction.confidence}%</span>
                </div>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="total-production">
              <h3>Total Expected Production</h3>
              <p className="production-value">
                {(prediction.estimatedYield * formData.area).toFixed(2)} tons
              </p>
              <p className="production-note">Based on {formData.area} hectares</p>
            </div>

            <div className="recommendations">
              <h3>💡 Recommendations</h3>
              <ul>
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YieldPrediction;
