import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaInfoCircle } from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ item, startEditing, deleteTodo, completeTodo, showDetails }) => {
  const { id, title, status, priority } = item;

  return (
    <tr>
      <td className={status === "done" ? "completed" : ""}>
        {title}
      </td>
      <td className={`status-${status}`}>
        {status}
      </td>
      <td className={`priority-${priority}`}>
        {priority}
      </td>
      <td>
        <button onClick={() => startEditing(item)}><FaEdit /></button>
        <button onClick={() => deleteTodo(id)}><FaTrash /></button>
        <button onClick={() => completeTodo(id)}><FaCheck /></button>
        <button onClick={() => showDetails(item)}><FaInfoCircle /></button>
      </td>
    </tr>
  );
};

export default TodoItem;
