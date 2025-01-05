import { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { Routes, Route, useParams } from 'react-router-dom';
import "./App.css";
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import EditTodoModal from './components/EditTodoModal';
import TaskDetailsModal from './components/TaskDetailsModal';
import TodoFilters from './components/TodoFilters';
import SearchBar from './components/SearchBar';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Tasks from './components/Lists';
import Calendar from './components/Calendar';
import Timer from './components/Timer';
import Settings from './components/Settings';

const App = () => {
  const [todos, setTodos] = useState({
    'todo-list1': [
      { id: 1, title: "test1", status: "todo", priority: "Low", description: "This is a test task 1" },
      { id: 2, title: "test2", status: "done", priority: "Medium", description: "This is a test task 2" },
      { id: 3, title: "test3", status: "todo", priority: "High", description: "This is a test task 3" },
      { id: 4, title: "test4", status: "done", priority: "Low", description: "This is a test task 4" }
    ],
    'todo-list2': [
      { id: 1, title: "test21", status: "todo", priority: "High", description: "This is a test task 21" },
      { id: 2, title: "test22", status: "done", priority: "Low", description: "This is a test task 22" },
      { id: 3, title: "test23", status: "done", priority: "Medium", description: "This is a test task 23" },
      { id: 4, title: "test24", status: "todo", priority: "Low", description: "This is a test task 24" }
    ]
  });
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

  const addTodo = (listId) => {
    if (newTitle.trim() === "") {
      setErrorMessage("Title is required");
      return;
    }
    const newTodoItem = {
      id: Date.now(),
      title: newTitle,
      status: "todo",
      priority: newPriority,
      description: newDescription
    }
    setTodos(prevTodos => ({
      ...prevTodos,
      [listId]: [...prevTodos[listId], newTodoItem]
    }));
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

  const saveTodo = (listId, id) => {
    setTodos(prevTodos => ({
      ...prevTodos,
      [listId]: prevTodos[listId].map(todo =>
        todo.id === id ? { ...todo, title: editingTitle, status: editingStatus, priority: editingPriority, description: editingDescription } : todo
      )
    }));
    setEditingTodo(null);
  };

  const deleteTodo = (listId, id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setTodos(prevTodos => ({
        ...prevTodos,
        [listId]: prevTodos[listId].filter(todo => todo.id !== id)
      }));
    }
  };

  const completeTodo = (listId, id) => {
    setTodos(prevTodos => ({
      ...prevTodos,
      [listId]: prevTodos[listId].map(todo =>
        todo.id === id ? { ...todo, status: "done" } : todo
      )
    }));
  }

  const cancelEditing = () => {
    if (window.confirm("Are you sure you want to cancel editing? Unsaved changes will be lost.")) {
      setEditingTodo(null);
    }
  };

  const filteredTodos = (listId) => {
    return todos[listId].filter(todo => {
      if (filter === "all") return true;
      return todo.status === filter;
    }).filter(todo => {
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const showDetails = (todo) => {
    setSelectedTodo(todo);
  };

  const closeDetails = () => {
    setSelectedTodo(null);
  };

  const TodoListPage = () => {
    const { listId } = useParams();
    return (
      <>
        <TodoFilters filter={filter} setFilter={setFilter} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button className="add-task-button" onClick={() => setIsAddModalOpen(true)}>
          <FaPlus />
        </button>
        <TodoList
          todos={filteredTodos(listId)}
          startEditing={startEditing}
          deleteTodo={(id) => deleteTodo(listId, id)}
          completeTodo={(id) => completeTodo(listId, id)}
          showDetails={showDetails}
        />
        <AddTodoModal
          isOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          addTodo={() => addTodo(listId)}
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
          saveTodo={() => saveTodo(listId, editingTodo)}
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
    );
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists/" element={<Tasks todos={todos} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/lists/:listId" element={<TodoListPage />} />
          <Route path="*" element={<div>Select a Todo List</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
