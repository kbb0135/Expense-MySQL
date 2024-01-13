import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowExpense from './ShowExpense';
import Home from './Home';
import AddExpense from './AddExpense';
import Chart from './Chart';
import AddSaving from './AddSaving';
import Login from './Login';
import Registration from './Registration';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Unauthorized from './Unauthorized';
import CategorizeMonth from './CategorizeMonth';
import MonthlyData from './MonthlyData';


function App() {
  const [isValidToken, setIsValidToken] = useState(null)
  useEffect(() => {
    axios.post("http://localhost:7000/auth/authTokenValidation",
      { data: 1 },
      { headers: { accessToken: sessionStorage.getItem('accessToken') } }
    ).then(async(response) => {
      if (response.data.error) {
        
        setIsValidToken(response.data.isValid)
      }
      else {
       await  setIsValidToken(response.data.isValid)
      }
    })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          console.error(error.response.data.error)

          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with status code:", error.response.status);
          console.error("Error data:", error.response.data.error);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered the error
          console.error("Error:", error.message);
        }
      })
  }, [isValidToken])

  

 
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          {/* <Routes>
          <Route path="*" element={<Home />} />
        </Routes> */}
          {isValidToken ? (
            <>

              <Route path="/showexpense" element={<ShowExpense />} />
              <Route path="/addexpense" element={<AddExpense />} />
              <Route path="/visualizeexpense" element={<Chart />} />
              <Route path="/addsaving" element={<AddSaving />} />
              <Route path="/monthdata" element={<MonthlyData />} />
          <Route path="/categorizebymonths" element={<CategorizeMonth />} />
            </>
          ) : (
            <>

              <Route path="/showexpense" element={<Navigate to ="/unauthorized" />} />
              <Route path="/addexpense" element={<Navigate to ="/unauthorized" />} />
              <Route path="/visualizeexpense"  element={<Navigate to ="/unauthorized" />} />
              <Route path="/addsaving"  element={<Navigate to ="/unauthorized" />} />
            </>
          )}
          <Route path="/unauthorized"
           element={<Unauthorized />}
            />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
