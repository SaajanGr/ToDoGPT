// Import necessary packages and styles
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Define state variables for todos and input field
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Function to add a new todo
  const addTodo = () => {
    // Add a new todo object to the todos array, and reset the input field
    setTodos([...todos, { task: input, id: Date.now(), actionSteps: '' }]);
    setInput('');
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    // Remove the selected todo from the todos array
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to generate action steps for a todo
  const generateActionSteps = async (id) => {
    // Find the selected todo
    const todo = todos.find((todo) => todo.id === id);
    // Send a post request to the server to generate action steps
    const res = await axios.post('http://localhost:5000/action-steps', { todo: todo.task });
    // Update the selected todo with the generated action steps
    const newTodos = todos.map((todo) => todo.id === id ? { ...todo, actionSteps: res.data.actionSteps } : todo);
    setTodos(newTodos);
  };

  // Render the application
  return (
    <div className="App">
      <h1>Todo List</h1>
      {/* Bind the input field to the input state variable, and update it on user input */}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      {/* Add a new todo on button click */}
      <button onClick={addTodo}>Add Todo</button>
      <div>
        {/* Map over todos and render each one */}
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div>
              {/* Render the todo's task */}
              <h2>{todo.task}</h2>
              {/* If the todo has action steps, render them */}
              {todo.actionSteps && <p>Action Steps: {todo.actionSteps}</p>}
            </div>
            <div>
              {/* Delete the todo on button click */}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              {/* Generate action steps for the todo on button click */}
              <button onClick={() => generateActionSteps(todo.id)}>Generate Action Steps</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

