import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../redux/state/Admin/adminSlice';
export const Login = () => {
    const admin = useSelector((state) => state.admins);

    const dispatch = useDispatch();
    const [adminID, setAdminID] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form submission logic here
        const resultAction = await dispatch(loginAdmin({ adminID, password }));
        // Check the result of the dispatched action
        if (loginAdmin.fulfilled.match(resultAction)) {
            // Navigate if the login is successful
            if (resultAction.payload.success) {
                navigate('/');
            }
        } else if (loginAdmin.rejected.match(resultAction)) {
            console.log('Login failed', resultAction.payload);
        }
    };

    return (
        <div>
            <DefaultLayout>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h3 className="text-center">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Admin
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter Admin ID"
                                        value={adminID}
                                        onChange={(e) =>
                                            setAdminID(e.target.value)
                                        }
                                        required
                                    />
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
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={admin.isLoading}
                                >
                                    {admin.isLoading ? 'Loading...' : 'login'}
                                </button>
                                <p className="text-danger text-center">
                                    {admin.error && admin.error.message}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    );
};
