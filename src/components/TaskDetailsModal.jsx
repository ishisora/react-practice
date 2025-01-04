import React from 'react';
import './Modal.css';

const TaskDetailsModal = ({ isOpen, closeModal, selectedTodo }) => {
  if (!isOpen || !selectedTodo) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {selectedTodo.title}</p>
        <p><strong>Status:</strong> {selectedTodo.status}</p>
        <p><strong>Priority:</strong> {selectedTodo.priority}</p>
        <p><strong>Description:</strong> {selectedTodo.description}</p>
        <button onClick={closeModal} aria-label="Close Task Details">Close</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
