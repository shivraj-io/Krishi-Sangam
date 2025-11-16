import { useState, useEffect } from 'react';
import { jobAPI } from '../../services/api';
import Navbar from '../../components/Common/Navbar';
import './MyApplications.css';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchApplications();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await jobAPI.getMyApplications();
      setApplications(response.data);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('❌ Fetch Applications Error:', err);
      
      if (err.response?.status === 403) {
        setError('Access Denied: ' + (err.response?.data?.message || 'You must be logged in as a Labour user to view applications. Please log out and log in with your Labour account.'));
      } else if (err.response?.status === 401) {
        setError('Session Expired: Please log in again');
      } else {
        setError('Failed to fetch applications. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchApplications();
  };

  const checkAuth = async () => {
    try {
      const response = await jobAPI.getMyApplications();
      console.log('✅ Auth check passed:', response.data);
    } catch (err) {
      console.error('❌ Auth check failed:', err.response?.data);
      if (err.response?.status === 403) {
        alert('Authentication Error: ' + (err.response?.data?.message || 'You need to log in as a Labour user to view applications. Please log out and log in again with your Labour account.'));
      }
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    accepted: applications.filter(app => app.status === 'accepted').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  return (
    <>
      <Navbar />
      <div className="my-applications-container">
        <div className="applications-header">
          <div>
            <h1>My Job Applications</h1>
            <p>Track the status of your job applications</p>
          </div>
          <button onClick={handleRefresh} className="refresh-button" title="Refresh applications">
            🔄 Refresh
          </button>
        </div>

      <div className="application-stats">
        <div className="stat-box" onClick={() => setFilter('all')}>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-box pending" onClick={() => setFilter('pending')}>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-box accepted" onClick={() => setFilter('accepted')}>
          <div className="stat-value">{stats.accepted}</div>
          <div className="stat-label">Accepted</div>
        </div>
        <div className="stat-box rejected" onClick={() => setFilter('rejected')}>
          <div className="stat-value">{stats.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={`tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button
          className={`tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`tab ${filter === 'accepted' ? 'active' : ''}`}
          onClick={() => setFilter('accepted')}
        >
          Accepted ({stats.accepted})
        </button>
        <button
          className={`tab ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({stats.rejected})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading applications...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredApplications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No applications found</h3>
          <p>{filter === 'all' 
            ? 'You haven\'t applied for any jobs yet' 
            : `You have no ${filter} applications`}
          </p>
        </div>
      ) : (
        <div className="applications-list">
          {filteredApplications.map((application) => (
            <div key={application._id} className="application-card">
              <div className="application-header">
                <div className="application-title">
                  <h3>{application.job?.title || 'Job Title'}</h3>
                  <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                    {application.status.toUpperCase()}
                  </span>
                </div>
                <div className="application-date">
                  Applied on: {new Date(application.appliedAt).toLocaleDateString()}
                </div>
              </div>

              <p className="application-description">
                {application.job?.description || 'No description available'}
              </p>

              <div className="application-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span><strong>Location:</strong> {
                      typeof application.job?.location === 'object' 
                        ? `${application.job.location.village}, ${application.job.location.district}`
                        : application.job?.location
                    }</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">💰</span>
                    <span><strong>Wage:</strong> ₹{application.job?.wage}/day</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-icon">⏰</span>
                    <span><strong>Duration:</strong> {application.job?.duration} days</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span><strong>Start Date:</strong> {new Date(application.job?.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {application.status === 'accepted' && (
                <div className="acceptance-message">
                  🎉 Congratulations! Your application has been accepted. 
                  The farmer will contact you soon.
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="rejection-message">
                  Sorry, your application was not successful this time. 
                  Keep looking for other opportunities!
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default MyApplications;
