import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null); 

  const handleEdit = (user) => {
    setCurrentUser(user); 
  };

  const handleSave = () => {
    setCurrentUser(null); 
  };

  return (
    <div className="app-container">
      <h1>User Management CRUD Application</h1>
      <Routes>
        <Route path="/" element={<UserList onEdit={handleEdit} />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
      {currentUser && (
        <div className="modal">
          <UserForm currentUser={currentUser} onSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default App;
