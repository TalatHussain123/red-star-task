import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.ts';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { email, password });
            alert('Account created successfully!'); // Show success alert
            navigate('/login');
        } catch (err) {
            setError('Error creating account');
            alert('Error creating account'); // Show error alert
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
            <p className="redirect-text">
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default Signup;
