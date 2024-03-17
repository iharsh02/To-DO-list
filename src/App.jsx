import "./elements.css"
import "./show.css"
import React, { useState } from "react";
import Navbar from "./NavBar.jsx";
import { v4 as uuidv4 } from 'uuid'; 

function App() {
  const [todos, setTodos] = useState([{ id: uuidv4(), text: "sample task", completed: false }]);
  const [newTodo, setNewTodo] = useState("");

  const addNewTask = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <>
      <Navbar />
      <form onSubmit={addNewTask} className="d-flex col-4 offset-4 mt-4" role="search">
        <input
          className="form-control me-2 bg-body-tertiary"
          placeholder="To-Do List"
          aria-label="Search"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="col-6 offset-3 mt-4 show">
        {todos.map((todo) => (
          <div key={todo.id} className="elements mt-2 mb-2 ms-auto">
            <div className="form-check">
              <input
                className="form-check-input check-box"
                type="checkbox"
                value=""
                id={`checkbox-${todo.id}`}
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
              />
            </div>
            <div className="para" style={{ textDecorationLine: todo.completed ? "line-through" : "none" }}>
              <p>{todo.text}</p>
            </div>
            <div>
              <i className="fa-solid fa-xmark cross" onClick={() => deleteTask(todo.id)}></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
