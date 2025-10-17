import { useState, useEffect } from 'react';
import { jobAPI } from '../../services/api';
import './AllJobs.css';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getAllJobs();
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    if (filters.search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApply = async (jobId) => {
    if (window.confirm('Are you sure you want to apply for this job?')) {
      try {
        await jobAPI.applyForJob(jobId);
        alert('Application submitted successfully!');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to apply. You may have already applied.');
      }
    }
  };

  const jobTypes = ['Plowing', 'Sowing', 'Harvesting', 'Irrigation', 'Weeding', 'General Labor', 'Others'];

  return (
    <div className="all-jobs-container">
      <div className="jobs-header">
        <h1>Available Job Opportunities</h1>
        <p>Find and apply for agricultural jobs</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            name="search"
            placeholder="Search jobs..."
            value={filters.search}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
        <div className="filter-group">
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Job Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <input
            type="text"
            name="location"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>
      </div>

      <div className="jobs-count">
        <p>Showing {filteredJobs.length} of {jobs.length} jobs</p>
      </div>

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your filters or check back later</p>
        </div>
      ) : (
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-item">
              <div className="job-main">
                <div className="job-title-section">
                  <h3>{job.title}</h3>
                  <span className="job-type-badge">{job.type}</span>
                </div>
                <p className="job-desc">{job.description}</p>
                
                <div className="job-info-grid">
                  <div className="info-item">
                    <span className="info-icon">📍</span>
                    <div className="info-content">
                      <div className="info-label">Location</div>
                      <div className="info-value">{job.location}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-icon">⏰</span>
                    <div className="info-content">
                      <div className="info-label">Duration</div>
                      <div className="info-value">{job.duration} days</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-icon">💰</span>
                    <div className="info-content">
                      <div className="info-label">Daily Wage</div>
                      <div className="info-value">₹{job.wage}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-icon">👥</span>
                    <div className="info-content">
                      <div className="info-label">Workers Needed</div>
                      <div className="info-value">{job.workersNeeded}</div>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-icon">📅</span>
                    <div className="info-content">
                      <div className="info-label">Start Date</div>
                      <div className="info-value">
                        {new Date(job.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {job.cropType && (
                    <div className="info-item">
                      <span className="info-icon">🌾</span>
                      <div className="info-content">
                        <div className="info-label">Crop Type</div>
                        <div className="info-value">{job.cropType}</div>
                      </div>
                    </div>
                  )}
                </div>

                {job.requirements && (
                  <div className="job-requirements">
                    <strong>Requirements:</strong> {job.requirements}
                  </div>
                )}
              </div>
              
              <div className="job-actions">
                <button
                  className="apply-button"
                  onClick={() => handleApply(job._id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
