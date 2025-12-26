import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserManager from './pages/UserManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<UserManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
