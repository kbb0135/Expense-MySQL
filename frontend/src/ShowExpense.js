import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import Table from 'react-bootstrap/Table'
import './Expense.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ShowExpense = ({ item }) => {
    //State variables to manages expenses
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [data, setData] = useState([])
    const [saving, setSaving] = useState([])
    const [expenseName, setExpenseName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [saveExpense, setSaveExpense] = useState([])
    const [uid, setUid] = useState(0)
    //------------------------------------------------------------------------------
    const [editModal, setEditModal] = useState(false);
    const [selectedSaving, setSelectedSaving] = useState(null);
    const [saveData, setSaveData] = useState([])
    const [savingAmount, setSavingAmount] = useState([])
    const [amount, setAmount] = useState(0)
    const [savingUID, setSavingUID] = useState(0)

    //Function to do handle edit when the edit butto is clicked

    const handleEdit = (expense) => {
        setUid(expense.id)
        setSelectedExpense(expense)
        setShowEditModal(true)
        setExpenseName(expense.expenseName);
        setCategory(expense.category);
        setPrice(parseFloat(expense.price));

    }

    const handleEditSave = (val) => {
        setSavingUID(val.id)
        setSelectedSaving(val)
        setEditModal(true)
        setAmount(parseFloat(val.saving))
        console.log(val)
    }

    const handleSaveAmountChange = async () => {
        if (!selectedSaving) return;
        const updatedSaving = {
            ...selectedSaving,
            saving: amount.toFixed(2)
        }
        const updatedSavingData = saving.map((saveAmount) =>
            saveAmount.id === selectedSaving.id ? updatedSaving : saveAmount
        )

        setSaving(updatedSavingData)

        var id = savingUID;
        setEditModal(false);
        setSelectedSaving(null)
        console.log("TEST@@@==", updatedSaving.saving)

        var updatedSavingValue = {
            id: id,
            saving: updatedSaving.saving
        }
        console.log("Test=", updatedSavingValue)

        try {
            axios.post("http://localhost:7000/updatesaving", updatedSavingValue).then((res) => {
                toast.success("Successfully updated data")
            })
        }
        catch (error) {
            console.log(error)
        }

    }

    const handleSaveChanges = async () => {
        if (!selectedExpense) return;

        // Update selectedExpense with the modified values
        const updatedExpense = {
            ...selectedExpense,
            expenseName: expenseName,
            category: category,
            price: price.toFixed(2),
        };

        // Here, you can perform an API call to update the data in your backend
        // For the sake of demonstration, let's update the state directly
        const updatedData = data.map((expense) =>
            expense.id === selectedExpense.id ? updatedExpense : expense
        );

        setData(updatedData); // Update state with the updated data

        var id = uid;
        console.log("Selected ID=", id)
        // Close the modal and reset state
        setShowEditModal(false);
        setSelectedExpense(null);
        setSaveExpense(null);

        var updatedValue = {
            id: id,
            expenseName: expenseName,
            category: category,
            price: price
        }
        console.log("Test=", updatedValue)
        try {
            axios.post("http://localhost:7000/updateexpense", updatedValue).then((res) => {
                toast.success("Successfully updated data")
            })
        }
        catch (error) {
            console.log(error)
        }
    };

    const deleteSaving = (id) => {
        const savingData = saving.filter((val) => val.id !== id)
        setSaving(savingData)
        try {
            axios.post("http://localhost:7000/deletesaving", { id: id }).then(async (res) => {
                if (res.status) {
                    await toast.success("Successfully updated data")
                }

            })
        }
        catch {
            toast.error("Here")
        }


    }
    const handleDelete = async (id) => {
        try {
            const updatedData = data.filter((expense) => expense.id !== id);
            setData(updatedData);
            await axios.post("http://localhost:7000/deleteexpense", { id: id }).then(async (res) => {
                await toast.success("Successfully updated data")
            })
        }

        catch (error) {
            toast.error("Failed to delete expense");
        }
    }

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
                setData(response.data)
                console.log(data)


            }


        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.status)
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
                setSaving(response.data)
                setSavingAmount(response.data)
                console.log("saving", saving)
            }


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
                                {/* <th>ID</th> */}
                                <th>Expense Name</th>
                                <th>Category</th>
                                <th>Price($)</th>
                                <th>Creation Date</th>
                                <th bg="danger">Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        {/* maping the data we fetched from the db */}
                        <tbody>
                            {data.map((value, key) => {
                                return (
                                    <tr key={key}>
                                        {/* <td>{value.id}</td> */}
                                        <td>{value.expenseName}</td>
                                        <td>{value.category}</td>
                                        <td>${value.price}</td>
                                        <td>{value.createdAt}</td>
                                        <td><Button className="btn btn-warning" onClick={() => handleEdit(value)} >Edit</Button></td>
                                        <td><Button className="btn btn-danger" onClick={() => handleDelete(value.id)}>Delete</Button></td>
                                    </tr>
                                )


                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <div>
                <div className="div-center">
                    <h1>Total Saving</h1>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        {/* data obtained with the header value */}
                        <tr>
                            {/* <th>ID</th> */}
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
                                <tr key={key}>
                                    {/* <td>{value.id}</td> */}
                                    <td>${value.saving}</td>
                                    <td>{value.createdAt}</td>
                                    <td><Button className="btn btn-warning" onClick={() => handleEditSave(value)} >Edit</Button></td>
                                    <td><Button className="btn btn-danger" onClick={() => deleteSaving(value.id)}>Delete</Button></td>
                                </tr>
                            )


                        })}
                    </tbody>
                </Table>
                {/* //handle the modals to make sure that the data is beong appropriately handled */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header closeButton bg="danger">
                                <Modal.Title>
                                    <div className="div-center">
                                        <h1>Edit Expenses</h1>
                                    </div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form >
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
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="danger" onClick={() => setShowEditModal(false)}>Close</Button>
                                <Button variant="success" onClick={handleSaveChanges}>Save changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </Modal>


                <Modal show={editModal} onHide={() => setEditModal(false)}>
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header closeButton bg="danger">
                                <Modal.Title>
                                    <div className="div-center">
                                        <h1>Edit Saving</h1>
                                    </div></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form >
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="form-head">Expense Price:$</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Example:14"
                                            value={amount}
                                            onChange={(e) => setAmount(parseFloat(e.target.value))}

                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="danger" onClick={() => setEditModal(false)}>Close</Button>
                                <Button variant="success" onClick={handleSaveAmountChange}>Save changes</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </Modal>






            </div>
            <Toaster />

        </div>
    )
}
export default ShowExpense;