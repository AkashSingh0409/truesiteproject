import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setSiteInfo(null);

    try {
      const response = await fetch(`http://localhost:5000/api/site-info?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSiteInfo(data);
      } else {
        setError(data.error || 'Failed to fetch site information');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>TrueSite</h1>
          <p className="subtitle">Discover detailed information about any website</p>
        </div>
      </header>

      <main className="container">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., google.com)"
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && (
          <div className="loader">
            <div className="loader-spinner"></div>
            <p>Analyzing website...</p>
          </div>
        )}

        {siteInfo && (
          <div className="result-card">
            <div className="site-header">
              <div className="site-icon">
                {siteInfo.name.charAt(0)}
              </div>
              <div className="site-title">
                <h2>{siteInfo.name}</h2>
                <p className="site-url">{url}</p>
              </div>
            </div>

            <div className="safety-section">
              <h3>Safety Status</h3>
              <div className="badges">
                <span className={`badge badge-${siteInfo.safety}`}>
                  {siteInfo.safety === 'safe' ? 'Safe' : 'Warning'}
                </span>
              </div>
            </div>

            <div className="info-section">
              <h3>Website Information</h3>
              <div className="info-content">
                <p>{siteInfo.description}</p>
                {siteInfo.founded && <p><strong>Founded:</strong> {siteInfo.founded}</p>}
                {siteInfo.founders && <p><strong>Founders:</strong> {siteInfo.founders}</p>}
                {siteInfo.headquarters && <p><strong>Headquarters:</strong> {siteInfo.headquarters}</p>}
              </div>
            </div>

            <div className="tech-section">
              <h3>Technical Details</h3>
              <div className="tech-content">
                <p><strong>Server:</strong> {siteInfo.server}</p>
                <p><strong>IP Address:</strong> {siteInfo.ip}</p>
                <p><strong>Technologies:</strong> {siteInfo.technologies.join(', ')}</p>
                <p><strong>Performance:</strong> {siteInfo.performance}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>TrueSite - Your trusted source for website information</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
