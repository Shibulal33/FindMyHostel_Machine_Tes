import React, { useEffect, useState } from "react";
import config from "../config/config"
import { useNavigate, Routes, Route, useLocation, Link } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import Bill from "./bills/bill";

const DashBoard = () => {

    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/user/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status == 200) {
                    const result = await response.json()
                    setUsers(result.data)
                } else {
                    alert("Dashboard not available")
                    // navigate('/login')
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (token) {
            fetchUsers()
        } else {
            navigate('/login')
        }

    }, [token, navigate])

    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">USER LIST</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>View Bill</th>
                                    <th>Create Bill</th>
                                    <th>Vacate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => (
                                    <tr key={user._id}>
                                        <td>{i + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span
                                                style={{
                                                    height: "10px",
                                                    width: "10px",
                                                    backgroundColor: user.status === "active" ? "green" : "red",
                                                    borderRadius: "50%",
                                                    display: "inline-block",
                                                    marginRight: "5px"
                                                }}
                                            ></span>
                                            {user.status}</td>
                                        <td>
                                            <Link to={
                                                `/users/bills/${user._id}`
                                            }>
                                                View
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={
                                                `/bills/${user._id}`
                                            }>
                                                Create
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={
                                                `/users/vacate/${user._id}` ///users//vacate/:id
                                            }>
                                                Vacate User
                                            </Link>
                                        </td>
                                        {/* <td>
                                            <Button onClick={handleClick_createBill(user._id)}>
                                                Create BIll
                                            </Button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>
            <Routes>
                <Route path="bills/:id" element={<Bill />} />
            </Routes>
        </div>

    )
}

export default DashBoard