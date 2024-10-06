import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/userService';

const UserForm = ({ currentUser, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        ...currentUser,
        username: `USER-${currentUser.name.toLowerCase().split(' ').join('-')}`, // Non-editable
      });
    }
  }, [currentUser]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and must be at least 3 characters long.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required (10 digits).';
    }
    if (!formData.address.street || !formData.address.city) {
      newErrors.address = 'Street and City are required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (currentUser) {
      await updateUser(currentUser.id, formData);
    } else {
      await createUser(formData);
    }
    onSave(); // Close modal after save
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <label>Username:</label>
        <input type="text" name="username" value={formData.username} readOnly />
        
        <label>Street:</label>
        <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
        
        <label>City:</label>
        <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
        {errors.address && <span className="error">{errors.address}</span>}

        <label>Company Name (optional):</label>
        <input type="text" name="company.name" value={formData.company.name} onChange={handleChange} />

        <button type="submit">{currentUser ? 'Update User' : 'Create User'}</button>
      </form>
    </div>
  );
};

export default UserForm;
