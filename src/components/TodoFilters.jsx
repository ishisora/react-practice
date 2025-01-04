import React from 'react';
import './TodoFilters.css';

const TodoFilters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <div className={`tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
        All
      </div>
      <div className={`tab ${filter === "todo" ? "active" : ""}`} onClick={() => setFilter("todo")}>
        Todo
      </div>
      <div className={`tab ${filter === "done" ? "active" : ""}`} onClick={() => setFilter("done")}>
        Done
      </div>
    </div>
  );
};

export default TodoFilters;
