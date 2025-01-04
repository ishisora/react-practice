import { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import "./App.css";
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import EditTodoModal from './components/EditTodoModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import TodoFilters from './components/TodoFilters';
import SearchBar from './components/SearchBar';

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
  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = () => {
    if (newTitle.trim() === "") {
      setErrorMessage("Title is required");
      return;
    }
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
    setErrorMessage("");
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

  return (
    <>
      <TodoFilters filter={filter} setFilter={setFilter} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <button className="add-task-button" onClick={() => setIsAddModalOpen(true)}>
        <FaPlus />
      </button>

      <TodoList
        todos={filteredTodos}
        startEditing={startEditing}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        showDetails={showDetails}
      />

      <AddTodoModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        addTodo={addTodo}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        errorMessage={errorMessage}
      />

      <EditTodoModal
        isOpen={!!editingTodo}
        closeModal={cancelEditing}
        saveTodo={() => saveTodo(editingTodo)}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        editingStatus={editingStatus}
        setEditingStatus={setEditingStatus}
        editingPriority={editingPriority}
        setEditingPriority={setEditingPriority}
        editingDescription={editingDescription}
        setEditingDescription={setEditingDescription}
      />

      <TaskDetailsModal
        isOpen={!!selectedTodo}
        closeModal={closeDetails}
        selectedTodo={selectedTodo}
      />
    </>
  )
}

export default App
