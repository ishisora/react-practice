import { useState } from "react";
import "./App.css";
import { FaCheck, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "test1", status: "todo", priority: "Low", description: "This is a test task 1" },
    { id: 2, title: "test2", status: "done", priority: "Medium", description: "This is a test task 2" },
    { id: 3, title: "test3", status: "todo", priority: "High", description: "This is a test task 3" },
    { id: 4, title: "test4", status: "done", priority: "Low", description: "This is a test task 4" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPriority, setNewPriority] = useState("Low");
  const [newDescription, setNewDescription] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingStatus, setEditingStatus] = useState("");
  const [editingPriority, setEditingPriority] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  const addTodo = () => {
    if (newTitle.trim() === "") return;
    const newTodoItem = {
      id: todos.length + 1,
      title: newTitle,
      status: "todo",
      priority: newPriority,
      description: newDescription
    }
    setTodos([...todos, newTodoItem]);
    setNewTitle("");
    setNewPriority("Low");
    setNewDescription("");
    setIsAddModalOpen(false);
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingTitle(todo.title);
    setEditingStatus(todo.status);
    setEditingPriority(todo.priority);
    setEditingDescription(todo.description);
  };

  const saveTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: editingTitle, status: editingStatus, priority: editingPriority, description: editingDescription } : todo
    ));
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: "done" } : todo
    ));
  }

  const cancelEditing = () => {
    if (window.confirm("Are you sure you want to cancel editing? Unsaved changes will be lost.")) {
      setEditingTodo(null);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "all") return true;
    return todo.status === filter;
  }).filter(todo => {
    return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const showDetails = (todo) => {
    setSelectedTodo(todo);
  };

  const closeDetails = () => {
    setSelectedTodo(null);
  };

  const handleModalClick = (e) => {
    if (e.target.className === "modal") {
      setSelectedTodo(null);
      setIsAddModalOpen(false);
    }
  };

  return (
    <>
      <h1>todo app</h1>

      <button className="add-task-button" onClick={() => setIsAddModalOpen(true)}>Add New Task</button>

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

      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos by title"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>status</th>
            <th>priority</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((item) => (
            <tr key={item.id}>
              <td className={item.status === "done" ? "completed" : ""}>
                {item.title}
              </td>
              <td className={`status-${item.status}`}>
                {item.status}
              </td>
              <td className={`priority-${item.priority}`}>
                {item.priority}
              </td>
              <td>
                <button onClick={() => startEditing(item)}><FaEdit /></button>
                <button onClick={() => deleteTodo(item.id)}><FaTrash /></button>
                <button onClick={() => completeTodo(item.id)}><FaCheck /></button>
                <button onClick={() => showDetails(item)}><FaInfoCircle /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table >

      {isAddModalOpen && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Task</h2>
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
            <button onClick={() => setIsAddModalOpen(false)} aria-label="Close Add New Task">Cancel</button>
          </div>
        </div>
      )}

      {selectedTodo && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {selectedTodo.title}</p>
            <p><strong>Status:</strong> {selectedTodo.status}</p>
            <p><strong>Priority:</strong> {selectedTodo.priority}</p>
            <p><strong>Description:</strong> {selectedTodo.description} </p>
            <button onClick={closeDetails} aria-label="Close Task Details">Close</button>
          </div>
        </div>
      )}

      {editingTodo && (
        <div className="modal" onClick={handleModalClick}>
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
            <button onClick={() => saveTodo(editingTodo)}>Save</button>
            <button onClick={cancelEditing} aria-label="Close Task Editing">Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
