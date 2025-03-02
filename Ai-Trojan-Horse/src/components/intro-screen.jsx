import React, { useState } from 'react';
import './intro-screen.css';

const IntroScreen = ({ onStartGame }) => {
  const [formData, setFormData] = useState({
    Name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Name.trim()) {
      onStartGame(formData);
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-form-container">
        <form onSubmit={handleSubmit} className="intro-form">
          <div className="form-header">
            <h2>Please Enter Your Name</h2>
            <p>Join Athena's elite cybersecurity force</p>
          </div>
          
          <div className="form-fields">
            <div className="input-group">
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="First Name"
                required
                className="cyber-input"
              />
              <div className="input-line"></div>
            </div>
          </div>

          <button 
            type="submit" 
            className="cyber-button"
            disabled={!formData.Name.trim()}
          >
            <span className="button-text">⚡Defend Olympus ⚡</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntroScreen;
