import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2><FaBars />Menu</h2>
      <ul>
        <li><Link to="/lists">Todoリスト</Link></li>
        <li><Link to="/calendar">カレンダー</Link></li>
        <li><Link to="/timer">タイマー</Link></li>
        <li><Link to="/settings">設定</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
