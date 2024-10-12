import React from 'react';
import UserCard from './UserCard';

function UserList({ users, searchQuery, onUpdateUser, onDeleteUser, onSelectUser, selectedUser }) {
  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list" style={{ width: '100%', display: 'flex'}}>
      {filteredUsers.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={onUpdateUser}
          onDelete={onDeleteUser}
          onSelect={onSelectUser}
          isSelected={selectedUser?.id === user.id}
        />
      ))}
    </div>
  );
}

export default UserList;
