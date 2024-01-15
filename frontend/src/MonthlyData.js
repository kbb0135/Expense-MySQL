import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Chart from 'react-google-charts';
import Table from 'react-bootstrap/Table'
import './Expense.css'
import toast, { Toaster } from 'react-hot-toast'
export default function MonthlyData() {
  const [monthData, setMonthData] = useState([null])
  const [category, setCategory] = useState("")
  const [pieChartData, setPieChartData] = useState([])
  const [BarData, setBarData] = useState([])
  const options = {
    chart: {
      title: "Expenditure Data",
      subtitle: "Current Savings",
    },
  };

  const showData = () => {
    const groupPrices = {};
    var overallTotal = 0;
      
    
    monthData[category].forEach(element => {
      if (!groupPrices[element.category]) {
        groupPrices[element.category] = {
          category: element.category,
          total: 0
        };

      }
      groupPrices[element.category].total += element.price
    });
    const formattedExpenses = Object.values(groupPrices);
    //calculating overall total 
    formattedExpenses.forEach(totalValue => {
      overallTotal += totalValue.total

    })
    const getColorForCategory = (category, index) => {
      // You can define your logic to assign colors here based on category name or index
      // For example, generating random colors based on index:
      const colors = ["#FF5733",
        "#33FF57",
        "#5733FF",
        "#FF3370",
        "#70FF33",
        "#3357FF",
        "#FFD633",
        "#6333FF",
        "#FF336E",
        "#33FFD6",
        "#336EFF",
        "#D633FF",];
      return colors[index % colors.length]; // Get color based on index (using modulus for cycling through colors)
    };

    const BarValue = formattedExpenses.map((item, index) =>
      [item.category,
      item.total,
      getColorForCategory(item.category, index),
      ]);
    setBarData(BarValue)
    console.log(BarValue)




    const pieData = formattedExpenses.map(item =>
      [item.category,
      item.total
      ]);
    setPieChartData(pieData)

  }


  useEffect(() => {
    axios.get("http://localhost:7000/addexpense",
      { headers: { accessToken: sessionStorage.getItem('accessToken') } }
    ).then(async (response) => {
      if (response.data.error) {
        console.log(response.data.error)

      }
      else {
        console.log(response.data)
        setMonthData(response.data)
      }
    })
    .catch((error) => {
      if (error.response) {
          toast.error(error.response.data.error)
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with status code:", error.response.status);
          console.error("Error data:", error.response.data.error);
      } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received:", error.request);
      } else {
          // Something happened in setting up the request that triggered the error
          console.error("Error:", error.message);
      }
  })
  }, [])

  //for bar 
  return (
    <div><Header />
      <div>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="form-head">Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>


            </Form.Select>
          </Form.Group>
        </Form>
        <Button onClick={() => showData(category)}>Submit</Button>
      </div>
      {pieChartData.length > 0 ? (
        <>
          <div className="div-center">
            <h1>Expenditure Representation in PieChart for {category}</h1>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="chart-container">
              <Chart
                chartType="PieChart"
                data={[["Category", "Total"], ...pieChartData]}
                options={options}
                width={2000}
                height={400}
              />
            </div>
          </div>
          <br></br>
          <br></br>
          <hr></hr>
        </>
      ) : (
        <>
          <p></p>
        </>
      )}

      <div>

        {BarData.length > 0 ? (
          <>


            <div className="div-center">
              <h1>Expenditure Representation in BarGraph for {category}</h1>
            </div>
            <Chart
              chartType="ColumnChart"
              data={[["Category", "Total in $", { role: "style" }], ...BarData]}
              options={options}
              width={800}
              height={400}
            />
            <br></br>
            <hr></hr>
          </>
        ) : (
          <>
            <p>Select the month Category to display Data</p>
          </>
        )}

      </div>
      <div>
        <div>
        
          {
            
            monthData !== null && pieChartData.length > 0 ? (
              <>
                <Table striped bordered hover>
                  <thead>
                    {/* data obtained with the header value */}
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Expense Name</th>
                      <th>Category</th>
                      <th>Price($)</th>
                      <th>Creation Date</th>

                    </tr>
                  </thead>
                  {/* maping the data we fetched from the db */}
                  <tbody>
                    

                    {monthData[category].map((value, key) => {
                      return (
                        <tr key={key}>
                          {/* <td>{value.id}</td> */}
                          <td>{value.expenseName}</td>
                          <td>{value.category}</td>
                          <td>${value.price}</td>
                          <td>{value.createdAt}</td>
                        </tr>
                      )


                    })}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                
              </>
            )
          }

        </div>
      </div>
    </div>
  )
}
