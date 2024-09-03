
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { BookingCar } from './pages/BookingCar';
import { BookingSuccess } from './pages/BookingSuccess';
import { BookingHistory } from './pages/BookingHistory';

import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/bookingsuccess" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
          <Route path="/booking/:carid" exact element={<ProtectedRoute><BookingCar /></ProtectedRoute>}/>
          <Route path="/bookinghistory" element={<ProtectedRoute><BookingHistory/></ProtectedRoute>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;


export function ProtectedRoute({children})
{
  const user = useSelector(state => state.users)
  if(user.isAuthenticated){
    return children;
  }
  else{

    return <Navigate to="/login"/>
  }
}