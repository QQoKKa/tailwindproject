import './App.css';
import Sidebar from './components/sidebar';
import MainPanel from './components/mainpanel';
import Finances from './components/finances';
import Employees from './components/employees';
import Tasks from './components/tasks';
import Test from './components/test';
import Formaddemp from './components/formaddemp';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<MainPanel />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path='/test' element={<Test />}></Route>
      </Routes>
      </div>
  );
}

export default App;
