import React, { useState, useEffect } from 'react';
import { setLiveThreats, removeThreat } from '../LiveThreat';
import './right-sidebar.css';

const RightSidebar = () => {
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [actionHistory, setActionHistory] = useState([]);
  const [actionStatus, setActionStatus] = useState('');

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await setLiveThreats();
        setThreats(response.active_threats);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    };
    fetchThreats();
  }, []);

  const defenseActions = [
    { name: "Run Full Scan", icon: "🔍" },
    { name: "Quarantine File", icon: "🔒" },
    { name: "Strengthen Firewall", icon: "🛡" },
    { name: "Isolate infected system", icon: "🔐" },
    { name: "Create data backups", icon: "📁" },
    { name: "Contact authorities", icon: "📞" },
    { name: "Do not click suspicious links", icon: "⛔" },
    { name: "Report suspicious email", icon: "✉" },
    { name: "Use strong passwords", icon: "🔑" }
  ];
  
  const handleThreatSelect = (threat) => {
    setSelectedThreat(threat);
    setActionHistory([]);
    setActionStatus('');
  };

  const handleAction = async (action) => {
    if (!selectedThreat) {
      setActionStatus('Please select a threat first!');
      return;
    }

    const newHistory = [...actionHistory, action];
    setActionHistory(newHistory);
    
    if (!selectedThreat.correct_response.includes(action)) {
      setActionStatus(`${action} was not effective against ${selectedThreat.file_name}!`);
      setActionHistory([]);
      return;
    }

    const correctActions = selectedThreat.correct_response;
    const currentIndex = actionHistory.length;
    
    if (action !== correctActions[currentIndex]) {
      // setActionStatus(`Wrong sequence! The correct order for ${selectedThreat.file_name} is: ${correctActions.join(' → ')}`);
      setActionHistory([]);
      return;
    }

    if (newHistory.length === correctActions.length) {
      setActionStatus(`Successfully neutralized ${selectedThreat.file_name}!`);
      try {
        await removeThreat(selectedThreat.file_name);
        setThreats(threats.filter(t => t.file_name !== selectedThreat.file_name));
        setSelectedThreat(null);
        setActionHistory([]);
      } catch (error) {
        console.error('Error removing threat:', error);
        setActionStatus('Error removing threat. Please try again.');
      }
    } else {
      setActionStatus(`Good choice! Keep going...`);
    }
  };

  return (
    <div className="right-sidebar">
      <h2 className="action-panel">Trojan Defense Grid</h2>
      
      <div className="threat-boxes">
        {threats.map((threat) => (
          <div 
            key={threat.file_name}
            className={`threat-box ${selectedThreat?.file_name === threat.file_name ? 'selected' : ''}`}
            onClick={() => handleThreatSelect(threat)}
            style={{
              padding: '2px',
              margin: '5px',
              border: '1px solid rgba(28, 229, 135, 0.3)',
              borderRadius: '8px',
              backgroundColor: selectedThreat?.file_name === threat.file_name ? 'rgba(28, 229, 135, 0.2)' : 'transparent',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            {threat.file_name}
          </div>
        ))}
      </div>

      {actionStatus && (
        <div style={{
          padding: '10px',
          margin: '10px 0',
          borderRadius: '8px',
          backgroundColor: actionStatus.includes('not effective') || actionStatus.includes('Wrong') ? 'rgba(255, 59, 48, 0.1)' : 'rgba(28, 229, 135, 0.1)',
          border: actionStatus.includes('not effective') || actionStatus.includes('Wrong') ? '1px solid rgba(255, 59, 48, 0.3)' : '1px solid rgba(28, 229, 135, 0.3)',
          color: actionStatus.includes('not effective') || actionStatus.includes('Wrong') ? '#ff3b30' : '#1ce587'
        }}>
          {actionStatus}
        </div>
      )}

      <div className="defense-actions">
        {defenseActions.map((action) => (
          <button
            key={action.name}
            className={`defense-button ${actionHistory.includes(action.name) ? 'used' : ''}`}
            onClick={() => handleAction(action.name)}
            disabled={actionHistory.includes(action.name)}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-name">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
