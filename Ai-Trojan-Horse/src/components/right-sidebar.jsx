import React from 'react';
import './right-sidebar.css';

const RightSidebar = () => {
  const defenseActions = [
    { name: "Quarantine File", icon: "🔒" },
    { name: "Delete Malware", icon: "🗑️" },
    { name: "Run Full Scan", icon: "🔍" },
    // { name: "Strengthen Firewall", icon: "🛡️" },
    // { name: "Block Sender", icon: "✋" },
    // { name: "Report Phishing", icon: "⚠️" },
    { name: "Reset System", icon: "🔄" },
    // { name: "Disable Macros", icon: "⚡" },
    { name: "Change Passwords", icon: "🔑" },
    { name: "Enable MFA", icon: "🔐" },
    // { name: "Disable Remote Access", icon: "🚫" },
    // { name: "Rollback Changes", icon: "⏮️" }
  ];
  
  const handleAction = (action) => {
    console.log(`Executing defense action: ${action}`);
    // Add action logic here
  };

  return (
    <div className="right-sidebar">
      <h2 className="action-panel">Trojan Defense Grid</h2>
      <div className="defense-actions">
        {defenseActions.map((action, index) => (
          <button
            key={index}
            className="defense-button"
            onClick={() => handleAction(action.name)}
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
