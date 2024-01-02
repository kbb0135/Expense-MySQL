import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import './Expense.css'
export default function Header() {
    

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Expenses-APP</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link><Link to="/" className="nav-link">Expense Data</Link></Nav.Link>
                       <Nav.Link><Link to="/addexpense" className="nav-link">Add Expense</Link></Nav.Link>
                        <Nav.Link><Link to="/visualizeexpense" className="nav-link">Visualize Expense</Link></Nav.Link>
                        <Nav.Link className="nav-link"><Link to="/test" className="nav-link">Test</Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
