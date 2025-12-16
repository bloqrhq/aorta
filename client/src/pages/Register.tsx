import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side only registration
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === formData.email);
    if (existingUser) {
      setError('User already exists');
      setLoading(false);
      return;
    }

    // Validate password
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Save new user
    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, username: newUser.username, email: newUser.email }));
    localStorage.setItem('token', `token_${newUser.id}`);
    
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div style={{color: error.includes('successful') ? 'green' : 'red'}}>{error}</div>}
      <div>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p><Link to="/login">Already have an account? Login</Link></p>
    </form>
  );
};

export default Register;