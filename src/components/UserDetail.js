import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../services/userService';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  
  const fetchUser = useCallback(async () => {
    try {
      const response = await getUser(id);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-detail">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
    </div>
  );
};

export default UserDetail;
