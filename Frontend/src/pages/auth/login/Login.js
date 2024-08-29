import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import config from "../../config/config"

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const queryString = new URLSearchParams(formData).toString();
            const response = await fetch(`${config.BASE_URL}/api/user/login?${queryString}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                },
            })
            const result = await response.json();
            if (result.token) {
                localStorage.setItem("token", result.token)
                navigate("/users")
            } else if (result.message) {
                alert(result.message)
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setFormData({
                email: "",
                name: "",
                password: ""
            })
        }
    }
    return (
        <div className="center-form1">
            <Form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}

                    />
                </Form.Group>
                <Button variant="dark" type="submit" className="w-100">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login