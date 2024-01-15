import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import './Expense.css'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function AddExpense() {
  const [expenseName, setExpenseName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState(0)
  

  let data = {};
  const handleSubmit =(e) => {
    if (expenseName === "") {
      toast.error("Enter your userName")
      e.preventDefault();
    }
    else {
      console.log("Here")
    }
    if (category === "") {
      toast.error("Please provide one of the following category")
      e.preventDefault()
    }
    if (price <= 0) {
      toast.error("Please enter a valid price.")
      e.preventDefault()
    }
    if (expenseName !== "" && category !== "" && price !== 0) {
      e.preventDefault()
      data = {
        "expenseName": expenseName,
        "category": category,
        "price": price.toFixed(2),
      }
      console.log("data")

      
     axios.post("http://localhost:7000/addexpense",data,
     {headers: {accessToken: sessionStorage.getItem("accessToken")}
    },
     ).then((response)=>
      {
        if (response.data.error) {
          
          try {
            toast.error(response.data.error)
            console.log(response)
            console.log(sessionStorage.getItem("accessToken"))
          }

          catch {
          } 
        }
        else {
          toast.success("Data added successfully")
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
            toast.error("Error:", error.message);
        }
    })
     
    }
  }



  return (
    <div>
      <Header />
      <div className="div-center">
        <h1>Add Expense</h1>
      </div>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Expense Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Example:Walmart"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option value="Food">Food</option>
            <option value="Grocery">Grocery</option>
            <option value="Bills">Bills</option>
            <option value="Outdoor Expenses">Outdoor Expenses</option>
            <option value="Shopping">Shopping</option>
            <option value="Remitance">Remitance</option>
            <option value="Gas">Gas</option>
            <option value="Car-Maintainance">Car-Maintainance</option>
            <option value="Rent">Rent</option>
            <option value="Bills">Bills</option>
            <option value="Interest Charged">Interest Charged</option>
            <option value="Ride">Ride</option>
            <option value="Others">Others</option>

          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Expense Price:$</Form.Label>
          <Form.Control
            type="number"
            placeholder="Example:14"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <Toaster />

    </div>
  )
}

