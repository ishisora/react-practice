import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Modal.css';

const AddTodoModal = ({
  isOpen,
  closeModal,
  addTodo,
  newTitle,
  setNewTitle,
  newPriority,
  setNewPriority,
  newDescription,
  setNewDescription,
  errorMessage
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Task</h2>
        {errorMessage && (
          <p className="error-message">
            <FaExclamationTriangle /> {errorMessage}
          </p>
        )}
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={closeModal} aria-label="Close Add New Task">Cancel</button>
      </div>
    </div>
  );
};

export default AddTodoModal;
