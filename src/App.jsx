function App() {
  return (
    <>
      <h1>todo app</h1>
      <ul>
        {todo.map((item) => (
          <li key={item.id}>{item.title}{item.status}</li>
        ))}
      </ul>
    </>
  )
}

const todo = [
  { id: 1, title: "test1", status: "todo" },
  { id: 2, title: "test2", status: "done" }
];

export default App
