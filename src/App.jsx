import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "test1", status: "todo", priority: "low", description: "This is a test task 1" },
    { id: 2, title: "test2", status: "done", priority: "medium", description: "This is a test task 2" },
    { id: 3, title: "test3", status: "todo", priority: "high", description: "This is a test task 3" },
    { id: 4, title: "test4", status: "done", priority: "low", description: "This is a test task 4" }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingStatus, setEditingStatus] = useState("");
  const [editingPriority, setEditingPriority] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
      status: "todo",
      priority: newPriority,
      description: ""
    }
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
    setNewPriority("low");
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingTitle(todo.title);
    setEditingStatus(todo.status);
  };

  const saveTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: editingTitle, status: editingStatus } : todo
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
      closeDetails();
    }
  };

  return (
    <>
      <h1>todo app</h1>

      <div className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("todo")}>Todo</button>
        <button onClick={() => setFilter("done")}>Done</button>
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
                {editingTodo === item.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                ) : (
                  item.title
                )}
              </td>
              <td className={`status-${item.status}`}>
                {editingTodo === item.id ? (
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                  >
                    <option value="todo">todo</option>
                    <option value="done">done</option>
                  </select>
                ) : (
                  item.status
                )}
              </td>
              <td className={`priority-${item.priority}`}>
                {editingTodo === item.id ? (
                  <select
                    value={editingPriority}
                    onChange={(e) => setEditingPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                ) : (
                  item.priority
                )}
              </td>
              <td>
                {editingTodo === item.id ? (
                  <>
                    <button onClick={() => saveTodo(item.id)}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEditing(item)}>Edit</button>
                    <button onClick={() => deleteTodo(item.id)}>Delete</button>
                    <button onClick={() => completeTodo(item.id)}>Complete</button>
                    <button onClick={() => showDetails(item)}>Details</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table >

      {selectedTodo && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h2>Task Details</h2>
            <ul>
              <li><strong>Title:</strong> {selectedTodo.title}</li>
              <li><strong>Status:</strong> {selectedTodo.status}</li>
              <li><strong>Priority:</strong> {selectedTodo.priority}</li>
              <li><strong>Description:</strong> {selectedTodo.description} </li>
            </ul>
            <button onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
