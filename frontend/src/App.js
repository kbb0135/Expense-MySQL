import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowExpense from './ShowExpense';
import Test from './Test';
import AddExpense from './AddExpense';
import Chart from './Chart';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowExpense />} />
        </Routes>
        <Routes>
          <Route path="/test" element={<Test />} />
        </Routes>
        <Routes>
          <Route path="/addexpense" element={<AddExpense />} />
        </Routes>
        <Routes>
          <Route path="/visualizeexpense" element={<Chart />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
