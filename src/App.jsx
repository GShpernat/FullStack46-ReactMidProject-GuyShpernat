import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import './App.css';
import { fetchUsers, fetchTodos, fetchPosts } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false); // State for adding a new todo
  const [isAddingPost, setIsAddingPost] = useState(false); // State for adding a new post
  const [isAddingUser, setIsAddingUser] = useState(false); // State for adding a new user

  useEffect(() => {
    async function fetchData() {
      const usersData = await fetchUsers();
      const todosData = await fetchTodos();
      const postsData = await fetchPosts();

      const usersWithTodos = usersData.map(user => ({
        ...user,
        todos: todosData.filter(todo => todo.userId === user.id),
        posts: postsData.filter(post => post.userId === user.id),
      }));

      setUsers(usersWithTodos);
      setTodos(todosData);
      setPosts(postsData);
    }
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSelectUser = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);
    setIsAddingUser(false); // Deselect adding user if selected
  };

  const handleMarkTodoComplete = (todoId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: true } : todo
    );
    setTodos(updatedTodos);

    const updatedUsers = users.map(user => ({
      ...user,
      todos: updatedTodos.filter(todo => todo.userId === user.id),
    }));

    setUsers(updatedUsers);
  };

  const handleAddTodoClick = () => {
    setIsAddingTodo(true);
  };

  const handleCancelAddTodo = () => {
    setIsAddingTodo(false);
  };

  const handleAddTodo = (title) => {
    if (selectedUser) {
      const newTodo = {
        userId: selectedUser.id,
        id: todos.length + 1,
        title,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setUsers(users.map(user => user.id === selectedUser.id ? {
        ...user,
        todos: [...user.todos, newTodo]
      } : user));
      setIsAddingTodo(false);
    }
  };

  const handleAddPostClick = () => {
    setIsAddingPost(true);
  };

  const handleCancelAddPost = () => {
    setIsAddingPost(false);
  };

  const handleAddPost = (title, body) => {
    if (selectedUser) {
      const newPost = {
        userId: selectedUser.id,
        id: posts.length + 1,
        title,
        body
      };
      setPosts([...posts, newPost]);
      setUsers(users.map(user => user.id === selectedUser.id ? {
        ...user,
        posts: [...user.posts, newPost]
      } : user));
      setIsAddingPost(false);
    }
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
    setSelectedUser(null);
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
  };

  const handleAddUser = (name, email) => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      todos: [],
      posts: []
    };
    setUsers([...users, newUser]);
    setIsAddingUser(false);
  };

  return (
    <div className="app-container">
      <SearchBar onAddClick={() => setIsAddingUser(true)} />
      <div className="main-content" style={{ display: 'flex' }}>
        <div className="user-list-section" style={{ flex: 1 }}>
          <h3>Users</h3>
          <UserList 
            users={users} 
            searchQuery={searchQuery} 
            onUpdateUser={handleUpdateUser} 
            onDeleteUser={handleDeleteUser} 
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
          />
        </div>
        <div className="details-container" style={{ flex: 1 }}>
          {isAddingUser ? (
            <div className="add-user-form">
              <h3>Add New User</h3>
              <label>
                Name:
                <input type="text" id="new-user-name" />
              </label>
              <label>
                Email:
                <input type="email" id="new-user-email" />
              </label>
              <button onClick={() => handleAddUser(document.getElementById('new-user-name').value, document.getElementById('new-user-email').value)} className="add-button">Add</button>
              <button onClick={handleCancelAddUser} className="cancel-button">Cancel</button>
            </div>
          ) : (
            <>
              {selectedUser && (
                <>
                  <div className="todo-list-section">
                    <div className="todo-header">
                      <h3>Todos - User {selectedUser.id}</h3>
                      <button onClick={handleAddTodoClick} className="add-button">Add</button>
                    </div>
                    {isAddingTodo ? (
                      <div className="add-todo-form">
                        <label>
                          Title:
                          <input type="text" id="new-todo-title" />
                        </label>
                        <button onClick={() => handleAddTodo(document.getElementById('new-todo-title').value)} className="add-button">Add</button>
                        <button onClick={handleCancelAddTodo} className="cancel-button">Cancel</button>
                      </div>
                    ) : (
                      <TodoList 
                        todos={todos.filter(todo => todo.userId === selectedUser.id)} 
                        onMarkComplete={handleMarkTodoComplete} 
                      />
                    )}
                  </div>
                  <div className="post-list-section">
                    <div className="post-header">
                      <h3>Posts - User {selectedUser.id}</h3>
                      <button onClick={handleAddPostClick} className="add-button">Add</button>
                    </div>
                    {isAddingPost ? (
                      <div className="add-post-form">
                        <label>
                          Title:
                          <input type="text" id="new-post-title" />
                        </label>
                        <label>
                          Body:
                          <textarea id="new-post-body"></textarea>
                        </label>
                        <button onClick={() => handleAddPost(document.getElementById('new-post-title').value, document.getElementById('new-post-body').value)} className="add-button">Add</button>
                        <button onClick={handleCancelAddPost} className="cancel-button">Cancel</button>
                      </div>
                    ) : (
                      <PostList posts={posts.filter(post => post.userId === selectedUser.id)} />
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;