import React, { useEffect, useState } from "react";
import config from "../config/config"
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";

const VacateUser = () => {

    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/user/vacate/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': "application/json",
                    },
                })
                if (response.status === 200) {
                    alert("User successfully vacated")
                    const result = await response.json()
                    setData(result.amount)
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

    }, [navigate])



    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">VACATE</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Paid Amount</th>
                                    <th>Pending Amount</th>
                                    <th>Refund Amount</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* {data.map((data) => ( */}
                                <tr key={data._id}>
                                    <td>{data.paidAmount}</td>
                                    <td>{data.pendingAmount}</td>
                                    <td>{data.refundAmount}</td>

                                </tr>
                                {/* ))} */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default VacateUser