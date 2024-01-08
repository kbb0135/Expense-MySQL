import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowExpense from './ShowExpense';
import Home from './Home';
import AddExpense from './AddExpense';
import Chart from './Chart';
import AddSaving from './AddSaving';
import Login from './Login';
import Registration from './Registration';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/showexpense" element={<ShowExpense />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/addexpense" element={<AddExpense />} />
        </Routes>
        <Routes>
          <Route path="/visualizeexpense" element={<Chart />} />
        </Routes>
        <Routes>
          <Route path="/addsaving" element={<AddSaving />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Registration />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
