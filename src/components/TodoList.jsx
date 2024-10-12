import React from 'react';

function TodoList({ todos, onMarkComplete }) {
  return (
    <div className="todo-list">
      <h3>Todos - User {todos[0]?.userId}</h3>
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Completed:</strong> {todo.completed ? 'True' : 'False'}</p>
          {!todo.completed && (
            <button onClick={() => onMarkComplete(todo.id)}>Mark Completed</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
