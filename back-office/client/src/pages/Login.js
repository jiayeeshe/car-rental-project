import React, { useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/state/User/userSlice'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
  const user = useSelector(state => state.users)


  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
    const resultAction = await dispatch(loginUser({username,password}));
    // Check the result of the dispatched action
    if (loginUser.fulfilled.match(resultAction)) {
      // Navigate if the login is successful
      if (resultAction.payload.success) {
        navigate('/');
      }
    } else if (loginUser.rejected.match(resultAction)) {
      console.log("Login failed", resultAction.payload);
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
                <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={user.isLoading}>
                  {user.isLoading ? "Loading..." : "login"}
                </button>
                <p className='text-danger text-center'>{user.error && user.error.message}</p>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  )
}
