import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnfpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cnfpassword } = credentials;
        if (password !== cnfpassword) {
            props.showAlert("Password must be same", "info");
        }
        else {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json()
            if (json.success) {
                localStorage.setItem('token', json.authtoken)
                history.push('/');
                props.showAlert("Account Created Successfully!", "success");
            }
            else {
                props.showAlert("Invalid Credentials", "danger");
            }
        }
    }

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" onChange={handleOnChange} name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={handleOnChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleOnChange} name="password" minLength={8} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cnfpassword" onChange={handleOnChange} name="cnfpassword" minLength={8} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
