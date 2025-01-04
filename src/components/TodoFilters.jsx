import React from 'react';

const TodoFilters = ({ filter, setFilter }) => {
  return (
    <div className="filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "todo" ? "active" : ""}
        onClick={() => setFilter("todo")}
      >
        Todo
      </button>
      <button
        className={filter === "done" ? "active" : ""}
        onClick={() => setFilter("done")}
      >
        Done
      </button>
    </div>
  );
};

export default TodoFilters;
