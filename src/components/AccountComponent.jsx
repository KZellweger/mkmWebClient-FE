import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import {useHistory} from "react-router-dom";
import axios from "axios";

const ACCOUNT_REST_API_URL = 'http://localhost:8081/account/'

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

    const history = useHistory()

    const handleLogin = () => {
        //Todo
    }

    const handleChange = (field, newValue) => {
        setAccount(prev => ({
            ...prev,
            [field]: newValue
        }))
    }

    useEffect(() => {
        axios.get(ACCOUNT_REST_API_URL)
            .then(result => setAccount(result.data))
            .catch(error => alert(error.message()))
    }, [])

    return (
        <div>
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
        </div>
    )


}
