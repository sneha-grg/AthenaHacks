import React, { useState, useEffect } from 'react';
import './left-sidebar.css';
import { setLiveThreats } from '../LiveThreat';

const LeftSidebar = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const data = await setLiveThreats();
        setThreats(data.active_threats || []);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    };

    fetchThreats();
    const interval = setInterval(fetchThreats, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="left-sidebar">
      <div className="glow-effect"></div>
      
      <h2 className="threat-title">Live Threats Feed</h2>
      
      <div className="threats-container">
        {threats.map((threat) => (
          <div key={threat.file_name} className="threat-card">
            <div className="threat-header">
              <div className="threat-name">{threat.file_name}</div>
              <div className={`threat-level ${threat.threat_level.toLowerCase()}`}>
                {threat.threat_level}
              </div>
            </div>
            
            <div className="threat-details">
              <div className="detail-row">
                <span className="label">Size:</span>
                <span className="value">{threat.size}</span>
              </div>
              <div className="detail-row">
                <span className="label">Malware:</span>
                <span className="value">{threat.detected_malware}</span>
              </div>
              <div className="detail-row">
                <span className="label">Execution:</span>
                <span className="value">{threat.execution}</span>
              </div>
            </div>

            <div className="threat-capabilities">
              <div className="capabilities-title">Capabilities:</div>
              <div className="capabilities-list">
                {threat.capabilities.map((capability, index) => (
                  <div key={index} className="capability-tag">{capability}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
