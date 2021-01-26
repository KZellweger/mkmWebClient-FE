import React from 'react';
import {Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import logo from '../assets/Test.png';

export default function NavigationBar() {
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
        </Navbar>
    )
}