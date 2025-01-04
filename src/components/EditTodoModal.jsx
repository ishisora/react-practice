import React from 'react';
import './Modal.css';

const EditTodoModal = ({
  isOpen,
  closeModal,
  saveTodo,
  editingTitle,
  setEditingTitle,
  editingStatus,
  setEditingStatus,
  editingPriority,
  setEditingPriority,
  editingDescription,
  setEditingDescription
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
        />
        <select
          value={editingStatus}
          onChange={(e) => setEditingStatus(e.target.value)}
        >
          <option value="todo">todo</option>
          <option value="done">done</option>
        </select>
        <select
          value={editingPriority}
          onChange={(e) => setEditingPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <textarea
          value={editingDescription}
          onChange={(e) => setEditingDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={saveTodo}>Save</button>
        <button onClick={closeModal} aria-label="Close Task Editing">Cancel</button>
      </div>
    </div>
  );
};

export default EditTodoModal;
