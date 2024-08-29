import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import config from "../../config/config"

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        amount: null,
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            let obj = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "tenant",
                dueDate: "2025-01-01",
                amount: parseInt(formData.amount)

            }

            const response = await fetch(`${config.BASE_URL}/api/user/users`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(obj)
            })
            const result = await response.json();
            console.log(result);
            if (response.status == 200) {
                console.log(result);
                navigate("/login")
            } else {
                alert("sign up failed")
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setFormData({
                email: "",
                name: "",
                password: "",
                amount: 0
            })
        }
    }


    return (
        <div className="center-form">
            <Form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Amount<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    Signup
                </Button>
            </Form>
        </div>
    )
}

export default Signup