import { useState } from 'react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    identity_number: '',
    email: '',
    date_of_birth: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      alert('User successfully submitted!');

      setFormData({
        name: '',
        identity_number: '',
        email: '',
        date_of_birth: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    }
  }

  function validateForm(formData) {
    const errors = {};

    const numbersOnlyRegex = /^\d+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Email is in invalid format';
    }

    if (!formData.identity_number.trim()) {
      errors.identity_number = 'Identity number is required';
    }

    if (!numbersOnlyRegex.test(formData.identity_number)) {
      errors.identity_number = 'Identity number can only contains numbers';
    }

    return errors;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <label htmlFor="identity_number">Identity Number</label>
        <input
          id="identity_number"
          name="identity_number"
          value={formData.identity_number}
          onChange={handleFormChange}
        />
        {errors.identity_number && (
          <span className="error-message">{errors.identity_number}</span>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleFormChange}
        />
        {errors.date_of_birth && (
          <span className="error-message">{errors.date_of_birth}</span>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
