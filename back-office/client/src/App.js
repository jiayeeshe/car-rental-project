import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import { Login } from './pages/Login';
import { useSelector } from 'react-redux';
import { Home } from './pages/Home';
import { Update } from './pages/Update';
import { Insert } from './pages/Insert';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path='/update' exact element={<ProtectedRoute><Update/></ProtectedRoute>}/>
          <Route path='/insert' exact element={<ProtectedRoute><Insert/></ProtectedRoute>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute({children})
{
  const admin = useSelector(state => state.admins)
  if(admin.isAuthenticated){
    return children;
  }
  else{

    return <Navigate to="/login"/>
  }
}