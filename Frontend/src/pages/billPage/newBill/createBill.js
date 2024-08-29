import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./createBill.css"
import { useNavigate, useParams } from "react-router-dom";
import config from "../../config/config"

const CreateBill = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        billType: "other",
        dueDate: "",
        password: "",
        amount: null,
        status: "pending"
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
                userId: id, //
                amount: parseInt(formData.amount),
                dueDate: formData.dueDate,
                status: formData.status,
                billType: formData.billType,


            }

            const response = await fetch(`${config.BASE_URL}/api/bill/bills`, {
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
                alert("Created successfully!")
                navigate("/users")
            } else {
                alert("sign up failed")
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setFormData({
                billType: "other",
                dueDate: "",
                password: "",
                amount: 0,
                status: "pending"
            })
        }
    }


    return (
        <div className="center-form">
            <Form onSubmit={handleSubmit}>
                <h1>Create Bill</h1>

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

                <Form.Group>
                    <Form.Label>Due Date<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="dueDate"
                        placeholder="Enter Due Date. Ed:- 2024-01-01"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Status<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        // type="text"
                        as="select"
                        name="status"
                        placeholder="select status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    </Form.Control>

                </Form.Group>

                <Form.Group>
                    <Form.Label>Bill Type<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        // type="text"
                        as="select"
                        name="billType"
                        placeholder="Enter Bill Type"
                        value={formData.billType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="other">Other</option>
                        <option value="security">Security</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                    SUBMIT
                </Button>

            </Form>
        </div>
    )
}

export default CreateBill