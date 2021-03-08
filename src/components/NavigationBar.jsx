import React, {useEffect} from 'react';
import {Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {useDispatch, useSelector} from "react-redux";
import {getRequestCounter} from "../actions/accountActions";
import logo from '../assets/Test.png';
//TODO: Use MaterialUI Components
export default function NavigationBar() {
    const account = useSelector(state => state.account)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRequestCounter())
    },[])
    return (
        <Navbar bg="dark" variant="dark" sticky={"top"}>
            <NavbarBrand href="#home">
                <img
                    src={logo}
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Test Logo"
                />
            </NavbarBrand>
            <Nav className="mr-auto">
                <Nav.Link href="/stock">My Stock</Nav.Link>
                <Nav.Link href="/upload">Upload from CSV</Nav.Link>
                <Nav.Link href="/statistics">Statistics</Nav.Link>
                <Nav.Link href="/account">Account Overview</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>{account.requestUsed + " of " + account.requestLimit + " Requests used"}</Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}