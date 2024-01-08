import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import './Expense.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


export default function Registration() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const emailPattern = /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (firstName === "") {
            toast.error("Please enter first Name")
            e.preventDefault()
        }
        if (lastName === "") {
            toast.error("Please enter last Name");
            e.preventDefault()
        }
        if (email === "") {
            toast.error("Please enter email");
            e.preventDefault()
        }
        else {
            if(!emailPattern.test(email)) {
                toast.error("Please enter valid email");
                e.preventDefault();
            }
        }
        
        if (password === "") {
            toast.error("Password cannot be empty");
            e.preventDefault()
        }
        else {
            if (password.length < 8) {
                toast.error("Password should be atleast 8 character long")
                e.preventDefault();
            }
            else if (password.length >= 8) {
                if (password !== cPassword) {
                    toast.error("Password didn't match")
                    e.preventDefault();
                }
            }
        }
        
        if (firstName !== "" && lastName !=="" &&emailPattern.test(email) && password.length >=8 && password === cPassword) {
            console.log(firstName, lastName, email, password, cPassword)
            var data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            await axios.post("http://localhost:7000/auth", data).then((res)=> {
                toast.success(res.data)
                console.log(res.data)
                setTimeout(()=> {
                    navigate("/login")
                },1000)
            })
            .catch((error)=> {
                if(error.response) {
                    toast.error(error.response.data.error)
                    console.log(error.response)
                }
                else if(error.request) {
                    toast.error("Server is not responding")
                }
                else {
                    toast.error(`Error ${error.message}`)
                }
            })

        }

    }
    // Function to handle form submission 
    return (

        <div >
            <Header />


            <div className="form-container">
                <small>EXPENSES-APP</small>
                <h2>SignUp</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group row  w-75">
                        <label htmlFor="exampleInputEmail1"><h5>First Name</h5></label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group row  w-75 col-sm-2 col-form-label custom-label">
                        <label htmlFor="exampleInputEmail1"><h5>Last Name</h5></label>
                        <input type="text"
                            className="form-control"
                            aria-describedby="emailHelp"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="form-group row  w-75 col-sm-2 col-form-label custom-label">
                        <label htmlFor="exampleInputEmail1"><h5>Email Address</h5></label>
                        <input type="email"
                            className="form-control"

                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>

                    <div className="form-group row w-75 col-sm-2 col-form-label custom-label" >
                        <label htmlFor="exampleInputPassword1" ><h5>Password</h5></label>
                        <input type="password"
                            className="form-control"

                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group row w-75 col-sm-2 col-form-label custom-label" >
                        <label htmlFor="exampleInputPassword1" ><h5>ConfirmPassword</h5></label>
                        <input type="password"
                            className="form-control"

                            placeholder="Password"
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-button">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                <Toaster />
            </div>

        </div>
    );
}

