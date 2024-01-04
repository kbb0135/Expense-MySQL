import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import './Expense.css'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


export default function AddSaving() {
    const [price, setPrice] = useState(0)

    let data = {};
    const handleSubmit = (e) => {
        if (price <= 0) {
            toast.error("Please enter a valid price.")
            e.preventDefault()
        }
        if (price !== 0) {
            e.preventDefault()
            data = {
                "saving": price.toFixed(2),
            }

            axios.post("http://localhost:7000/addsaving", data).then((response) => {
                try {
                    toast.success("Successfully inserted data")
                }
                catch {
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
                    <Form.Label className="form-head">Saving</Form.Label>
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
