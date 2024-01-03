import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Chart } from "react-google-charts";
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import './Expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


const options = {
  title: "Expenses",
};
export default function VisualChart() {
  const [isClick, setIsClick] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isData, setIsData] = useState(false);
  const dummySaving = 200;
  const p = 500;
  const l = 200;
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
  const expenseDetail = () => {
    setIsExpenseOpen(true)
    setIsData((prevOpen) => !prevOpen);
    if (!isData) {

    }
    else {
      setIsData(false)
    }
  }

  const [item, setItem] = useState([])
  useEffect(() => {

    axios.get("http://localhost:7000/add").then((response) => {
      setItem(response.data)
      // console.log(response.data)
    })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status)
        }
      })

  }, [])
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
  const formattedExpenses = Object.values(groupPrices);
  //calculating overall total 
  formattedExpenses.forEach(totalValue => {
    overallTotal += totalValue.total
  })


  const chartData = formattedExpenses.map(item => [item.category, item.total]);

  const TotalSaving = () => {
    const overallSaving = l- overallTotal;
    return overallSaving;
  }

  return (
    <div>
      <Header />
      <div>
        <Chart
          chartType="PieChart"
          data={[["Category", "Total"], ...chartData]}
          options={options}
          width={"100%"}
          height={"400px"}
        />
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
                          <td>${value.total}</td>
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
                                  Your Overall Saving is: <Badge bg="success">${TotalSaving()}</Badge>
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
                              <h5>On average, you save ${TotalSaving()} more than<br></br>
                                you spend. The total expenditure for all the categories that <br></br>
                                you provided is ${overallTotal}, while the amount you've saved is ${dummySaving}.<br></br>
                                It's great to see you're maintaining positive savings. Keep up the good work by staying mindful of your expenses!</h5>

                            </>
                          ) : (
                            <>
                              <h5>On Average, you spend ${-1 * TotalSaving()} more than<br></br>
                                you save. The total expenditure for all the categories that <br></br>
                                you provided is ${overallTotal} while the amount you save for this is ${dummySaving}.<br></br>
                                Please make sure that you are keeping track of your expenses to be in a positive term.</h5>



                            </>
                          )

                        }

                      </td>
                      {/* <td>${value.total}</td> */}
                    </tr>



                  </tbody>
                </Table>



              </>
            ) : (
              <>
              </>
            )}

          </div>
          <Chart
            chartType="BarChart"
            data={[["Category", "Total"], ...chartData]}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
    </div>
  )
}
