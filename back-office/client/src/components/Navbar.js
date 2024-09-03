import React from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/state/Admin/adminSlice';

const Navbar = () => {
    const admin = useSelector(state => state.admins);
    const dispatch = useDispatch();
  return (
    <div className=" bg-dark shadow-lg" >
        <div className="container shadow">
                    <nav className="navbar navbar-expand-md navbar-dark row">
                        <div className="container-fluid ">
                            <Link to="/" class="navbar-brand">Back Office</Link>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mb-md-0">
                                <li className="nav-item">
                                <Link to="/" className="nav-link active d-flex justify-content-center">HOME</Link>
                                </li>
                                {!admin.isAuthenticated &&
                                <li className="nav-item">
                                <Link to="/login" className="nav-link active d-flex justify-content-center">LOGIN</Link>
                                </li>
                                }
                                {admin.isAuthenticated &&
                                <li className="nav-item">
                                <Link to="/insert" className="nav-link active d-flex justify-content-center">INSERT</Link>
                                </li>
                                }      
                                {admin.isAuthenticated &&
                                <li className="nav-item">
                                <Link to="/update" className="nav-link active d-flex justify-content-center">UPDATE</Link>
                                </li>
                                }                                
                                {admin.isAuthenticated &&
                                <li className="nav-item">
                                <Link to="/delete" className="nav-link active d-flex justify-content-center">DELETE</Link>
                                </li>
                                }                            
                            </ul>
                                {admin.isAuthenticated &&
                            <div className='d-lg-flex d-md-flex justify-content-lg-end justify-content-md-center'>
                            <div className='d-flex justify-content-evenly align-items-center me-auto mb-2 mb-md-0 mb-lg-0' style={{ fontFamily: 'Arial, sans-serif', height: '5vh', padding:"1vh" }}>
                                {admin.isAuthenticated?<span className='text-bg-success '>Welcome {admin.admin.adminName}</span>: <div>Please Login</div>}
                            </div>
                            <div className='d-flex justify-content-evenly align-items-center me-auto mb-2 mb-lg-0' style={{ fontFamily: 'Arial, sans-serif', height: '5vh', padding:"1vh" }}>
                                {admin.isAuthenticated&&<button onClick={()=>dispatch(logout())}>Logout</button>} 
                            </div>
                            </div>
                            }
                            </div>
                        </div>
                    </nav>

        </div>
    </div>
        
          
)
}

export default Navbar