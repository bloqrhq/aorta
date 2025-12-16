import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    // Client-side only login
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find((u: any) => u.email === formData.email);
    if (!user) {
      setError('Invalid credentials');
      setLoading(false);
      return;
    }

    // Check password
    if (user.password !== formData.password) {
      setError('Invalid credentials');
      setLoading(false);
      return;
    }

    // Login successful
    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, username: user.username, email: user.email }));
    localStorage.setItem('token', `token_${user.id}`);
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div style={{color: error.includes('successful') ? 'green' : 'red'}}>{error}</div>}
      <div>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p><Link to="/register">Don't have an account? Register</Link></p>
    </form>
  );
};

export default Login;