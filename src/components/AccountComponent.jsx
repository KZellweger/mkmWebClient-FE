import React, {useEffect} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import {deleteProductDB, getAccount, readProductsFromMkm, updateProductsDB} from "../actions/accountActions";
import LoadingSpinner from "../utils/LoadingSpinner";


export default function AccountComponent() {
    const account = useSelector(state => state.account)
    const loading = useSelector(state => state.common.loading.account)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAccount())
    },[])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Button variant="danger" onClick={() => {
                            if (window.confirm('Are you sure you want to clear the Database?\n This will delete all known Information about Products and Expansions')) dispatch(deleteProductDB())
                        }}>Clear Product Database</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => {
                            if (window.confirm('Are you sure you want to reload the Database?')) dispatch(readProductsFromMkm())
                        }}>Read MKM Product Catalogue</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => {
                            if (window.confirm('Are you sure you want to update the Database?')) dispatch(updateProductsDB())
                        }}>Update MKM Product Catalogue</Button>
                    </Col>
                </Row>
            </Container>
            <hr/>
            {loading ? <LoadingSpinner/> :
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
