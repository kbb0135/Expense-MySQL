import React from 'react'
import Form from 'react-bootstrap/Form';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import './Expense.css'

export default function AddExpense() {
  return (
    <div>
      <Header />
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Expense Name</Form.Label>
          <Form.Control type="email" placeholder="Example:Walmart" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className="form-head">Category</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select Category</option>
          <option value="1">Food</option>
          <option value="2">Grocery</option>
          <option value="3">Bills</option>
          <option value="4">Outdoor Expenses</option>
          <option value="5">Shopping</option>
          <option value="6">Remitance</option>
          <option value="7">Gas</option>
          <option value="8">Car Maintainance</option>
          <option value="9">Rent</option>
          <option value="10">Bills</option>
          <option value="11">Interest Charged</option>
          <option value="12">Others</option>
          
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Expense Price:$</Form.Label>
          <Form.Control type="number" placeholder="Example:14" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="form-head">Email</Form.Label>
          <Form.Control type="email" placeholder="Example:Walmart" />
        </Form.Group>
      </Form>
      <Button>Submit</Button>
    </div>
  )
}

