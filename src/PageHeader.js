import React from 'react'
import { NavLink } from 'react-router-dom'

const PageHeader = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/cars">Cars</NavLink></li>
            <li><NavLink to="/cities">Cities</NavLink></li>
            <li><NavLink to="/todo">To-Do</NavLink></li>
            <li><NavLink to="/project">Project</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default PageHeader
