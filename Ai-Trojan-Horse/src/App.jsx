import React from 'react'
import LeftSidebar from './components/left-sidebar'
import RightSidebar from './components/right-sidebar'
import DisplayMain from './components/display-main'

function App() {
  return (
    <div className="app-container">
      <LeftSidebar />
      <DisplayMain />
      <RightSidebar />
    </div>
  )
}

export default App
