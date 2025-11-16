import { useState } from 'react';
import { cropAPI } from '../../services/api';
import { SOIL_TYPES, SEASONS } from '../../utils/constants';
import Navbar from '../../components/Common/Navbar';
import './CropPrediction.css';

const CropPrediction = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
    soilType: '',
    season: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Transform field names to match backend expectations
      const requestData = {
        N: parseFloat(formData.nitrogen),
        P: parseFloat(formData.phosphorus),
        K: parseFloat(formData.potassium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      };
      
      const response = await cropAPI.predictCrop(requestData);
      setPrediction(response.data);
    } catch (err) {
      console.error('Crop Prediction Error:', err);
      setError(err.response?.data?.message || 'Failed to get prediction. Please try again.');
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: '',
      soilType: '',
      season: '',
    });
    setPrediction(null);
    setError('');
  };

  return (
    <>
      <Navbar />
      <div className="crop-prediction-container">
        <div className="prediction-header">
          <h1>🌾 Crop Prediction</h1>
          <p>Get AI-powered crop recommendations based on your soil and environmental conditions</p>
        </div>

      <div className="prediction-content">
        <div className="prediction-form-section">
          <h2>Enter Your Parameters</h2>
          
          {/* Soil Health Test Info Banner */}
          <div className="soil-health-info">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <strong>Don't know your soil's N, P, K values?</strong>
              <p>Get your soil tested for free! Book a Soil Health Card test.</p>
              <a 
                href="https://soilhealth.dac.gov.in/home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="soil-health-link"
              >
                📋 Book Soil Health Test →
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-section">
              <h3>Soil Nutrients (kg/ha)</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nitrogen (N) *</label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleChange}
                    required
                    placeholder="0-140 (e.g., 90)"
                    min="0"
                    max="140"
                  />
                </div>
                <div className="form-group">
                  <label>Phosphorus (P) *</label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleChange}
                    required
                    placeholder="5-145 (e.g., 42)"
                    min="0"
                    max="145"
                  />
                </div>
                <div className="form-group">
                  <label>Potassium (K) *</label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleChange}
                    required
                    placeholder="5-205 (e.g., 43)"
                    min="0"
                    max="205"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Environmental Conditions</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Temperature (°C) *</label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                    placeholder="8-45 (e.g., 25)"
                    step="0.1"
                  />
                </div>
                <div className="form-group">
                  <label>Humidity (%) *</label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    required
                    placeholder="10-100 (e.g., 80)"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>pH Value *</label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    required
                    placeholder="3.5-9.5 (e.g., 6.5)"
                    step="0.1"
                    min="0"
                    max="14"
                  />
                </div>
                <div className="form-group">
                  <label>Rainfall (mm) *</label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                    placeholder="20-300 (e.g., 200)"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Soil Type</label>
                  <select
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                  >
                    <option value="">Select soil type</option>
                    {SOIL_TYPES.map(soil => (
                      <option key={soil} value={soil}>{soil}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Season</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                  >
                    <option value="">Select season</option>
                    {SEASONS.map(season => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="button" onClick={handleReset} className="btn-reset">
                Reset
              </button>
              <button type="submit" className="btn-predict" disabled={loading}>
                {loading ? 'Predicting...' : 'Get Prediction'}
              </button>
            </div>
          </form>
        </div>

        {prediction && (
          <div className="prediction-result">
            <h2>Recommended Crops</h2>
            <div className="recommended-crops">
              {prediction.all_predictions ? (
                // Show top 3 crops with confidence scores
                Object.entries(prediction.all_predictions)
                  .sort((a, b) => b[1] - a[1]) // Sort by confidence descending
                  .slice(0, 3) // Take top 3
                  .map(([cropName, confidence], index) => (
                    <div key={index} className={`crop-card ${index === 0 ? 'top-pick' : ''}`}>
                      <div className="crop-rank">#{index + 1}</div>
                      <div className="crop-name">{cropName.charAt(0).toUpperCase() + cropName.slice(1)}</div>
                      <div className="crop-confidence">
                        {index === 0 && '⭐ '}Confidence: {(confidence * 100).toFixed(1)}%
                      </div>
                      <div className="crop-details">
                        <p>{index === 0 ? '🏆 Best match for your conditions!' : 'Also suitable for cultivation'}</p>
                      </div>
                    </div>
                  ))
              ) : prediction.recommended_crop ? (
                <div className="single-prediction">
                  <div className="prediction-icon">🌾</div>
                  <h3>{prediction.recommended_crop.charAt(0).toUpperCase() + prediction.recommended_crop.slice(1)}</h3>
                  <p>Confidence: {(prediction.confidence * 100).toFixed(1)}%</p>
                  <p>Based on your soil and environmental parameters, this crop is most suitable for cultivation.</p>
                </div>
              ) : (
                <div className="single-prediction">
                  <div className="prediction-icon">🌾</div>
                  <h3>{prediction.crop || 'Rice'}</h3>
                  <p>Based on your soil and environmental parameters, this crop is most suitable for cultivation.</p>
                </div>
              )}
            </div>

            <div className="prediction-tips">
              <h3>💡 Cultivation Tips</h3>
              <ul>
                <li>Ensure proper soil preparation before sowing</li>
                <li>Monitor nutrient levels regularly</li>
                <li>Use appropriate irrigation methods</li>
                <li>Follow recommended planting seasons</li>
                <li>Implement pest management strategies</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default CropPrediction;
