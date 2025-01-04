import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {paths.map((path, index) => {
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        return (
          <span key={to}>
            {'/'}
            <Link to={to}>{path}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
