import React, { useState, useEffect } from 'react';
import { setSystemSymptoms, setHealthBar } from '../LiveThreat';
import './game-screen.css';

const GameScreen = ({ playerName }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [health, setHealth] = useState({
    system_health: 100,
    health_status: 'Secure'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const symptomsData = await setSystemSymptoms();
        const healthData = await setHealthBar();
        
        setSymptoms(symptomsData);
        setHealth(healthData);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchData();
    // Refresh data every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (status) => {
    switch (status.toLowerCase()) {
      case 'critical': return '#ff3b30';
      case 'compromised': return '#ff9500';
      case 'vulnerable': return '#ffcc00';
      case 'secure': return '#34c759';
      default: return '#34c759';
    }
  };

  return (
    <div className="game-screen">
      <div className="system-status">
        <h2>System Symptoms</h2>
        <div className="symptoms-list">
          {symptoms.map((symptom, index) => (
            <div key={index} className="symptom-item">
              {symptom}
            </div>
          ))}
        </div>
      </div>

      <div className="health-monitor">
        <div className="health-info">
          <span className="health-label">System Health</span>
          <span className="health-percentage">{health.system_health}%</span>
          <span 
            className="health-status"
            style={{ color: getHealthColor(health.health_status) }}
          >
            {health.health_status}
          </span>
        </div>
        <div className="health-bar-container">
          <div 
            className="health-bar"
            style={{ 
              width: `${health.system_health}%`,
              backgroundColor: getHealthColor(health.health_status)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
