import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import './Expense.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
export default function Header() {



    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>EXPENSES-APP</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link className="nav-link"><Link to="/" className="nav-link">Home</Link></Nav.Link>
                        <Nav.Link><Link to="/showExpense" className="nav-link">Show Expense</Link></Nav.Link>
                        <Nav.Link><Link to="/addsaving" className="nav-link">Add Saving</Link></Nav.Link>
                        <Nav.Link><Link to="/addexpense" className="nav-link">Add Expense</Link></Nav.Link>
                        <Nav.Link><Link to="/visualizeexpense" className="nav-link">Visualize Expense</Link></Nav.Link>
                        <Nav.Link><Link to="/login" className="nav-link">Login</Link></Nav.Link>
                        <Nav.Link><Link to="/register" className="nav-link">Register</Link></Nav.Link>
                        <div className="nav-user">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Hello! User
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>



                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
