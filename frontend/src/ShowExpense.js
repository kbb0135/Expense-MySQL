import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import Table from 'react-bootstrap/Table'
import './Expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header';

export default function ShowExpense() {
    const [data, setData] = useState([])
    const [saving, setSaving] = useState([])
    useEffect(() => {

        axios.get("http://localhost:7000/add").then((response) => {
            toast.success("succesfully fetched Data")
            setData(response.data)

        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.status)
                }
            })

        axios.get("http://localhost:7000/addsaving").then((response) => {

            setSaving(response.data)
            console.log(response.data)
        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.status)
                }
            })

    }, [])
    return (
        <div>
            <Header />
            <div className="div-center">
                <h1>Expense</h1>
                {/* <div>
                    {data.map((value, key) => {
                        return <div>{value.price}</div>
                    })
                    }
                </div> */}
                <div>
                    <Table striped bordered hover>
                        <thead>
                            {/* data obtained with the header value */}
                            <tr>
                                <th>ID</th>
                                <th>Expense Name</th>
                                <th>Category</th>
                                <th>Price($)</th>
                                <th>Email</th>
                                <th>Creation Date</th>
                                <th bg="danger">Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        {/* maping the data we fetched from the db */}
                        <tbody>
                            {data.map((value, key) => {
                                return (
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>{value.expenseName}</td>
                                        <td>{value.category}</td>
                                        <td>${value.price}</td>
                                        <td>{value.email}</td>
                                        <td>{value.createdAt}</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                )


                            })}
                        </tbody>
                    </Table>
                </div>
                <br></br>
                <br></br>
                <hr></hr>
                <div>
                    <div className="div-center">
                        <h1>Total Saving</h1>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            {/* data obtained with the header value */}
                            <tr>
                                <th>ID</th>
                                <th>Amount Saved</th>
                                <th>Creation Date</th>
                                <th bg="danger">Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {/* maping the data we fetched from the db */}
                        <tbody>
                            {saving.map((value, key) => {
                                return (
                                    <tr>
                                        <td>{value.id}</td>
                                        <td>${value.saving}</td>
                                        <td>{value.createdAt}</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                )


                            })}
                        </tbody>
                    </Table>

                </div>
            </div>

        </div>
    )
}
