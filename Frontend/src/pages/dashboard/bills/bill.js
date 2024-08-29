import React, { useEffect, useState } from "react";
import config from "../../config/config"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const Bill = () => {

    const token = localStorage.getItem('token')
    const [billData, setBillDatas] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {

        const fetchUsers = async () => {
            try {

                const obj = {
                    strUserId: id
                }
                const queryString = new URLSearchParams(obj).toString();
                const response = await fetch(`${config.BASE_URL}/api/user/bills?${queryString}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    },
                })
                if (response.status == 200) {
                    const result = await response.json()
                    setBillDatas(result.data)
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

    const handlePay = async (billId) => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/bill/pay/${billId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                },
            });
            if (response.status === 200) {
                const result = await response.json();
                setBillDatas(prevData =>
                    prevData.map(bill =>
                        bill._id === billId ? { ...bill, status: 'paid' } : bill
                    )
                );
            } else {
                alert("Payment failed");
            }
        } catch (e) {
            console.log(e);
            alert("An error occurred while processing the payment");
        }
    };


    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">BILLS</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Amount</th>
                                    <th>Due date</th>
                                    <th>Bill Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billData.map((data, i) => (
                                    <tr key={data._id}>
                                        <td>{i + 1}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.dueDate}</td>
                                        <td>{data.billType}</td>
                                        <td>
                                            <Button
                                                variant={data.status === 'paid' ? 'success' : 'danger'}
                                                disabled={data.status === 'paid'}
                                                onClick={() => handlePay(data._id)}
                                            >
                                                {data.status === 'paid' ? 'Paid' : 'Pay'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default Bill