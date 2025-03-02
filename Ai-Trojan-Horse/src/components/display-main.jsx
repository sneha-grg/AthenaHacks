import React, { useState, useEffect, useRef } from 'react'
import './display-main.css'
import IntroScreen from './intro-screen'

const DisplayMain = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const starsRef = useRef(null)

  useEffect(() => {
    const createStars = () => {
      const starsContainer = starsRef.current
      if (!starsContainer) return

      starsContainer.innerHTML = '' // clears previous stars so it can be randomized

      const numStars = 50
      for (let i = 0; i < numStars; i++) {
        // a div element created for each star
        const star = document.createElement('div')
        star.className = 'star'
        
        // randomly setting the position of the star
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        
        // randomly sizing the stars between 2px and 4px
        const size = 2 + Math.random() * 2
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        
        star.style.animationDelay = `${Math.random() * 2}s`
        
        // newly created div appended to starsContainer
        starsContainer.appendChild(star)
      }
    }

    createStars()
  }, [])

  const handleStartGame = (formData) => {
    setPlayerData(formData);
    setGameStarted(true);
  };

  return (
    <div className="display-main">
      <div ref={starsRef} className="stars"></div>
      
      {!gameStarted ? (
        <>
          <h1 className="brand-white brand-mono-bold">
            AI Trojan Horse<span className="brand-dot">.</span>
          </h1>
          <div className="subtitle">Welcome to greek-mythology inspired cyber realm</div>
          <IntroScreen onStartGame={handleStartGame} />
        </>
      ) : (
        <div className="game-content">
          <h2>Welcome, {playerData.Name}!</h2>
        </div>
      )}
    </div>
  )
}

export default DisplayMain
