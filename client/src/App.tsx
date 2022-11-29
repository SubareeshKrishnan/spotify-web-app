import './App.css';
import { Login } from './components/Login';
import { Route, Routes } from "react-router-dom";
import { Dashboard } from './components/Dashboard';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='*' element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
