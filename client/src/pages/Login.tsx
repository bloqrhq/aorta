import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setError('Login successful! Welcome ' + data.user.username);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
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