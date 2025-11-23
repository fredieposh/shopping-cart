import { Outlet } from 'react-router';
import Navbar from './components/Navbar.jsx';
import Content from './components/Content.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Content>
        <Outlet />    
      </Content>
    </>
  );
};

export default App
