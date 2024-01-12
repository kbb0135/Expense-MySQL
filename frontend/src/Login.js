import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import './Expense.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailPattern = /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
   
    const handleLogin = async (e) => {
        e.preventDefault()
        if (email === "") {
            toast.error("Please enter email");
            e.preventDefault()
        }
        else {
            if (!emailPattern.test(email)) {
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
        }


        if (email !== "" && password.length >= 8) {
            console.log(email, password)
            var data = {
                email: email,
                password: password
            }
            try {
                await axios.post("http://localhost:7000/auth/login", data).then(async (res) => {

                    toast.success("Login Sucessful")
                    await sessionStorage.setItem('accessToken', res.data);
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/"
                    }, 1000)

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
                            console.error("Error:", error.message);
                        }
                    })
            }
            catch {
                console.log("Something went wrong")
            }


        }


    }
    return (
        <div >
            <Header />


            <div className="form-container">
                <small>EXPENSES-APP</small>
                <h2>Login</h2>



                <form onSubmit={(e) => handleLogin(e)}>
                    <div className="form-group row  w-75">
                        <label for="exampleInputEmail1" ><h5>Email Address</h5></label>
                        <input type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="form-info">
                            <small id="emailHelp" className="form-text text-muted"><b>We'll never share your email with anyone else.</b></small>
                        </div>
                    </div>

                    <div className="form-group row w-75" >
                        <label for="exampleInputPassword1"><h5>Password</h5></label>
                        <input type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-button">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;