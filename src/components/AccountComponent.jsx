import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Row} from "react-bootstrap";
import LoadingSpinner from "../utils/LoadingSpinner";

import {ACCOUNT,PRODUCT} from "../constants/api-endpoints";

export default function AccountComponent() {
    const [account, setAccount] = useState({
        userId: 0,
        userName: '',
        userType: '',
        firstName: '',
        lastName: '',
        registrationDate: '',
        totalBalance: 0
    })

    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleLogin = () => {
        //Todo
    }

    // TODO: actual endpoints should maybe be defined by actions. We will se when we integrate Redux middelware
    const deleteMkmDB = () => {
        axios.get(PRODUCT + "/reset")
            .then(res => console.log(res.status))
            .catch(error => alert(error.message))
    }
    const readMkmDB = () => {
            setLoading(true)
            axios.get(PRODUCT + "/import")
                .then(res => setLoading(false))
                .catch(error => setLoading(false))

    }
    const mergeMkmDB = () => {
        axios.get(PRODUCT + "/update")
            .then(res => console.log(res.status))
            .catch(error => alert(error.message))
    }

    const handleChange = (field, newValue) => {
        setAccount(prev => ({
            ...prev,
            [field]: newValue
        }))
    }

    useEffect(() => {
        axios.get(ACCOUNT)
            .then(result => setAccount(result.data))
            .catch(error => alert(error.message))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                <Col>
                    <Button variant="danger" onClick={() => {
                        if (window.confirm('Are you sure you want to clear the Database?\n This will delete all known Information about Products and Expansions')) deleteMkmDB()
                    }}>Clear Product Database</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => {
                        if (window.confirm('Are you sure you want to reload the Database?')) readMkmDB()
                    }}>Read MKM Product Catalogue</Button>
                </Col>
                <Col>
                    <Button variant="danger" onClick={() => {
                        if (window.confirm('Are you sure you want to update the Database?')) mergeMkmDB()
                    }}>Update MKM Product Catalogue</Button>
                </Col>
                </Row>
            </Container>
            <hr/>
            {loading ? <LoadingSpinner /> :
            <Table striped bordered hover variant="dark">
                <tbody className="text-center">
                <tr>
                    <td>Account Id</td>
                    <td>{account.userId}</td>
                </tr>
                <tr>
                    <td>Username</td>
                    <td>{account.userName}</td>
                </tr>
                <tr>
                    <td>Registration Date</td>
                    <td>{account.registrationDate}</td>
                </tr>
                <tr>
                    <td>UserType</td>
                    <td>{account.userType}</td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>{account.firstName}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{account.lastName}</td>
                </tr>
                <tr>
                    <td>Total Balance</td>
                    <td>{account.totalBalance}</td>
                </tr>
                </tbody>
            </Table>
            }
        </div>
    )


}
