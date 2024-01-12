import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import {Chart} from 'react-google-charts'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CategorizeMonth() {
    const [monthData, setMonthData] = useState([])
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")

    useEffect(()=> {
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
    },[])

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

    



  return (
    <div>
        <div>
            <Header />
        </div>
        <div>
        <div className="div-center">
                  <h1>Visual Chart of Monthly-Expense</h1>
                </div>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart...</div>}
                data={ chartMonthlyData}
                options={{
                    title: 'Monthly Expenses by Category',
                    chartArea: { width: '50%' },
                    hAxis: { title: 'Total Expenses', minValue: 0 },
                    vAxis: { title: 'Category' },
                }}
            />
            <hr></hr>
        </div>
        <div className="div-center">
                  <h1>Visual Chart of Monthly-Expense</h1>
                </div>
                <div>
                <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3 w-25 p-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="form-head">Category 1</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={category1}
              onChange={(e) => setCategory1(e.target.value)}
            >
              <option>Select Category1</option>
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

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3 w-25 p-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="form-head">Category 2</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
            >
              <option>Select Category2</option>
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
        <Button onClick={"() => showData(category)"}>Submit</Button>
                </div>
    </div>
  )
}
