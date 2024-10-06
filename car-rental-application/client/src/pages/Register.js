import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // reset error
        setError('');

        // Form submission logic here
        if (password !== confirmPassword) {
            setError('Password');
            return;
        } else {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/users/register`,
                    { username, email, password }
                );
                alert(response.data.message);
                console.log(response.data.message);
                navigate('/login');
            } catch (err) {
                console.log(err.response);
                if (err.response && err.response.data) {
                    if (err.response.data.code === 'Username')
                        setError('Username');
                    else if (err.response.data.code === 'Email')
                        setError('Email');
                    else setError('An error occured during registration');
                } else {
                    setError('An error occured during registration');
                }
            }
        }
    };

    return (
        <div>
            <DefaultLayout>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h3 className="text-center">Register</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                    />
                                    {error === 'Username' && (
                                        <p style={{ color: 'red' }}>
                                            Username is Taken
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    {error === 'Email' && (
                                        <p style={{ color: 'red' }}>
                                            Email is Taken
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {error === 'Password' && (
                                        <p style={{ color: 'red' }}>
                                            Password Mismatch!!
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Register
                                </button>
                                <div>
                                    <Link to="/login">Click here to Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
};
