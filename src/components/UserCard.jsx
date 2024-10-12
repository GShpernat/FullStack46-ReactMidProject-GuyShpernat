import React, { useState, useEffect } from 'react';

function UserCard({ user, onUpdate, onDelete, onSelect, isSelected }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showOtherData, setShowOtherData] = useState(false);
  const [incompleteTodos, setIncompleteTodos] = useState(user.todos.filter(todo => !todo.completed).length);

  useEffect(() => {
    setIncompleteTodos(user.todos.filter(todo => !todo.completed).length);
  }, [user.todos]);

  const handleUpdate = () => {
    if (name.trim() && email.trim()) {
      onUpdate({ ...user, name, email });
      setIsEditing(false);
    } else {
      alert("Name and Email cannot be empty.");
    }
  };

  const toggleOtherData = () => {
    setShowOtherData(prevShowOtherData => !prevShowOtherData);
  };

  return (
    <div
      className={`user-card ${isSelected ? 'selected' : ''} ${incompleteTodos === 0 ? 'green-border' : 'red-border'}`}
    >
      <p onClick={() => onSelect(user.id)}><strong>ID :</strong> {user.id}</p>
      <p><strong>Name :</strong> 
        {isEditing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : name}
      </p>
      <p><strong>Email :</strong> 
        {isEditing ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> : email}
      </p>
      <button
        onMouseEnter={() => setShowOtherData(true)}
        onClick={toggleOtherData}
        className="other-data-button"
      >
        Other Data
      </button>

      {showOtherData && (
        <div className="other-data">
          <p><strong>Street:</strong> {user.address?.street || 'N/A'}</p>
          <p><strong>City:</strong> {user.address?.city || 'N/A'}</p>
          <p><strong>Zip Code:</strong> {user.address?.zipcode || 'N/A'}</p>
        </div>
      )}

      {isEditing ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

export default UserCard;
