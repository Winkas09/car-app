import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './PageHeader.module.css';

const PageHeader = () => {
  return (
    <div>
      <nav>
        <ul className='nav'>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cars" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cities" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Cities
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/todo" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              To-Do
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/project" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Project
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/students" 
              className={({ isActive }) => isActive ? styles.active : undefined}
            >
              Students
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageHeader;