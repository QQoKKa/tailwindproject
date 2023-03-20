import './App.css';
import Sidebar from './components/sidebar';
import MainPanel from './components/mainpanel';
import Finances from './components/finances';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPanel />} />
        <Route path="/finances" element={<Finances />} />
        {/* <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<Tasks />} /> */}
      </Routes>
      <MainPanel />
      </div>
  );
}

export default App;
