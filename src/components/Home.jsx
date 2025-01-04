import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ todos }) => {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="todo-lists">
        {Object.keys(todos).map((listId) => (
          <div key={listId} className="todo-list">
            <h2>
              <Link to={`/${listId}`}>{listId}</Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
