import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Chart } from "react-google-charts";
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import './Expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
// import Carousel from 'react-bootstrap/Carousel';
import toast from 'react-hot-toast';




export default function VisualChart() {
  const [isClick, setIsClick] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [totalSaving, setTotalSaving] = useState([])
  //for monthly report
  const [monthData, setMonthData] = useState([])



  //keeping track of the button that shows details about the expenditure
  const buttonClick = () => {
    setIsClick(true)
    setIsOpen((prevOpen) => !prevOpen);
    if (!isOpen) {
    }
    else {
      setIsOpen(false);
    }
  }
  //show the whole detail of saving and spending 
// 
  const [item, setItem] = useState([])
  useEffect(() => {

    axios.post("http://localhost:7000/addexpense/showexpense",
            { data: 1 },
            { headers: { accessToken: sessionStorage.getItem('accessToken') } }
        ).then((response) => {
            if (response.data.error) {
                console.log(response)

            }
            else {
                console.log(response)
                setItem(response.data)
              


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
      axios.post("http://localhost:7000/addsaving/showsaving",
      { data: 1 },
      { headers: { accessToken: sessionStorage.getItem('accessToken') } }
  ).then((response) => {
      if (response.data.error) {
          console.log(response)

      }
      else {
        setTotalSaving(response.data)
         
          
      }

  })
      .catch((error) => {
          if (error.response) {
              toast.error(error.response.status)
          }
      })

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
        

  }, [])

  const chartMonthlyData = [['Category', ...Object.keys(monthData)]];
    console.log("chartMonthlyData=", chartMonthlyData)

    // Get all unique categories and will ignore the duplicates 
    const allCategories = [...new Set(Object.values(monthData).flatMap(expenses => expenses.map(expense => expense.category)))];

    // Populate chart data 
    allCategories.forEach(category => {
        const row = [category];

        Object.keys(monthData).forEach(month => {
            const totalForCategory = monthData[month]
                .filter(expense => expense.category === category)
                .reduce((total, expense) => total + expense.price, 0);

            row.push(totalForCategory);
        });

        chartMonthlyData.push(row);

    });
    console.log("charDataFinal=", chartMonthlyData)
  const groupPrices = {};
  var overallTotal = 0;
  item.forEach(element => {
    if (!groupPrices[element.category]) {
      groupPrices[element.category] = {
        category: element.category,
        total: 0
      };

    }
    groupPrices[element.category].total += element.price
  });


  //fetching totalSavings
  let saving = 0;
  //{saving: 25},
  //{saving 525.25}
  //save will iterate through an object and will be poiniting at saving
  //totalSaving will save all the totals there
  totalSaving.forEach(save => {
    saving += save.saving

  })

  console.log("getSaving", saving)



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
    "#FAD633",
    "#6333FF",
    "#FF336E",
    "#33FFD6",
    "#336EFF",
    "#D633FF",]; 
    return colors[index % colors.length]; // Get color based on index (using modulus for cycling through colors)
  };


  const chartData = formattedExpenses.map((item, index) =>
    [item.category,
    item.total,
    getColorForCategory(item.category, index),
    ]);

  //data for pieChart
  const pieData = formattedExpenses.map(item =>
    [item.category,
    item.total
    ]);




  const TotalSaving = () => {
    const overallSaving = saving - overallTotal;
    return overallSaving;
  }

  const data = [
    ["Value", "Saving in $", "Expense in $", "NetSaving in $"],
    ["2021", saving, overallTotal, TotalSaving()]
  ]
  const options = {
    chart: {
      title: "Expenditure Data",
      subtitle: "Current Savings",
    },
  };

  return (
    <div>
      <Header />
      




      <div>
      <div className="div-center">
                <h1>Expenditure Representation in PieChart</h1>
              </div>
              <div className="d-flex align-items-center justify-content-center">
              <div className="chart-container">
                <Chart
                  chartType="PieChart"
                  data={[["Category", "Total"], ...pieData]}
                  options={options}
                  width={2000}
                  height={400}
                />
                </div>
              </div>



        <div>
          {/* <Carousel data-bs-theme="dark" slide={false}>
            <Carousel.Item slide={false}>
              <div className="div-center">
                <h1>Expenditure Representation in PieChart</h1>
              </div>
              <div className="d-flex align-items-center justify-content-center">
              <div className="chart-container">
                <Chart
                  chartType="PieChart"
                  data={[["Category", "Total"], ...pieData]}
                  options={options}
                  width={2000}
                  height={400}
                />
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item slide={false}>
            <div className="div-center">
                  <h1>Visual Expense of Bar-Chart</h1>
                </div>
              <div className="d-flex align-items-center justify-content-center">
                

                <div className="chart-container">
                  <Chart
                    chartType="ColumnChart"
                    data={[["Category", "Total in $", { role: "style" }], ...chartData]}
                    options={options}
                    width={200}
                    height={400}
                  />
                </div>
              </div>
            </Carousel.Item>
          </Carousel> */}
        </div>

        <div>
          <br></br>

          <div>
            <div className="d-grid gap-2">
              <Button variant="secondary" size="lg" onClick={buttonClick}>
                {isOpen
                  ? "Click here to hide Expenses Details"
                  : "Click Here to show Expenses Details"}
              </Button>
            </div>
            {isOpen && isClick ? (
              <>
                <Table striped bordered hover>
                  <thead>
                    {/* data obtained with the header value */}
                    <tr>
                      <th>Category</th>
                      <th>Total in $</th>
                    </tr>
                  </thead>
                  {/* maping the data we fetched from the db */}
                  <tbody>
                    {formattedExpenses.map((value, key) => {
                      return (
                        <tr>
                          <td>{value.category}</td>
                          <td>${value.total.toFixed(2)}</td>
                        </tr>
                      )


                    })}
                  </tbody>
                </Table>
                <br></br>
                <br></br>
                <Table striped bordered hover variant="dark">
                  <thead>
                    {/* data obtained with the header value */}
                    <tr>
                      <th className="text-center">

                        {/* Example heading <Badge bg="secondary">New</Badge>
                           */}
                        <>
                          {
                            TotalSaving() > 0 ? (
                              <>
                                <h2>
                                  Your Overall Saving is: <Badge bg="success">${TotalSaving().toFixed(2)}</Badge>
                                </h2>
                              </>
                            ) : (
                              <>
                                <h2>
                                  <Badge bg="danger">You are spending more than you are Saving!</Badge>
                                </h2>
                              </>
                            )
                          }
                        </>


                      </th>

                    </tr>
                  </thead>
                  {/* maping the data we fetched from the db */}
                  <tbody>

                    <tr>
                      <td className="text-center">
                        {
                          TotalSaving() > 0 ? (
                            <>
                              <h5>On average, you save ${TotalSaving().toFixed(2)} more than<br></br>
                                you spend. The total expenditure for all the categories that <br></br>
                                you provided is ${overallTotal}, while the amount you've saved is ${saving}.<br></br>
                                It's great to see you're maintaining positive savings. Keep up the good work by staying mindful of your expenses!</h5>

                            </>
                          ) : (
                            <>
                              <h5>On Average, you spend ${-1 * TotalSaving().toFixed(2)} more than<br></br>
                                you save. The total expenditure for all the categories that <br></br>
                                you provided is ${overallTotal} while the amount you save for this is ${saving}.<br></br>
                                Please make sure that you are keeping track of your expenses to be in a positive term.</h5>



                            </>
                          )

                        }

                      </td>
                      {/* <td>${value.total}</td> */}
                    </tr>



                  </tbody>
                </Table>
                <div className="div-center">
                  <h1>Visual Representation of Total Savings</h1>
                </div>
                <div className="chart-container">
                  <Chart
                    chartType="Bar"
                    width="55%"
                    height="400px"
                    data={data}
                    options={options}
                  />
                </div>


              </>
            ) : (
              <>
              </>
            )}
            <br></br>
            <br></br>
            <hr></hr>

          </div>

        </div>
      </div>
      <div className="div-center">
                  <h1>Visual Expense of Bar-Chart</h1>
                </div>
                <Chart
              chartType="ColumnChart"
              data={[["Category", "Total in $", { role: "style" }], ...chartData]}
              options={options}
              width={800}
              height={400}
            />
              

              
    </div>
  )
}
