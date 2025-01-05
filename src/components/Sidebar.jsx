import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaCalendar, FaClock, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">
            <FaHome className="sidebar-icon" /> ホーム
          </Link>
        </li>
        <li>
          <Link to="/lists">
            <FaList className="sidebar-icon" /> Todoリスト
          </Link>
        </li>
        <li>
          <Link to="/calendar">
            <FaCalendar className="sidebar-icon" /> カレンダー
          </Link>
        </li>
        <li>
          <Link to="/timer">
            <FaClock className="sidebar-icon" /> タイマー
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog className="sidebar-icon" /> 設定
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
