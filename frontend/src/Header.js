import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import './Expense.css'
import Dropdown from 'react-bootstrap/Dropdown';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
export default function Header() {
    const navigate = useNavigate();
    const [isValidToken, setIsValidToken] = useState(false) 
    const [firstName, setFirstName] = useState("")
    useEffect(() => {
        axios.post("http://localhost:7000/auth/authTokenValidation",
            { data: 1 },
            { headers: { accessToken: sessionStorage.getItem('accessToken') } }
        ).then((response) => {
            if (response.data.error) {
                console.log(response)
            }
            else {
                
                setIsValidToken(response.data.isValid)
                setFirstName(response.data.firstName)
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
    }, [])
    const handleLogOut = async() => {

        await sessionStorage.removeItem('accessToken')
        if(!localStorage.getItem('accessToken')) {
            toast.success("Succesfully Logged Out");
            await setTimeout(() =>{
                navigate("/login")
            },2000)
        }

    }



    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>EXPENSES-APP</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link"><Link to="/" className="nav-link">Home</Link></Nav.Link>
                        {
                            isValidToken ? (
                                <>
                                    <Nav.Link><Link to="/showExpense" className="nav-link">Show Expense</Link></Nav.Link>
                                    <Nav.Link><Link to="/addsaving" className="nav-link">Add Saving</Link></Nav.Link>
                                    <Nav.Link><Link to="/addexpense" className="nav-link">Add Expense</Link></Nav.Link>
                                    <Nav.Link><Link to="/visualizeexpense" className="nav-link">Visualize Expense</Link></Nav.Link>
                                    <div className="nav-user">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hello! {firstName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item >User Preference</Dropdown.Item>
                                    <Dropdown.Item onClick={()=>handleLogOut()}>LogOut</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                                </>
                            ) : (
                                <>
                                <Nav.Link><Link to="/login" className="nav-link">Login</Link></Nav.Link>
                        <Nav.Link><Link to="/register" className="nav-link">Register</Link></Nav.Link>  `</>
                            )
                        }

                        
                        



                    </Nav>
                </Container>
            </Navbar>
            <Toaster />
        </div>
    )
}
