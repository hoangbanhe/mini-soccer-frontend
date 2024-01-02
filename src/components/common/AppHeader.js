import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Dropdown from "react-bootstrap/Dropdown";

AppHeader.propTypes = {};

function AppHeader(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const [isLogined, setIsLogined] = useState(false);

  const handleOpenUserProfile = () => {
    navigate("/user-profile ");
  };

  const handleLogout = () => {
    navigate("/sign-in");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        setIsLogined(false);
        navigate("/sign-in");
        localStorage.removeItem("token");
      }

      setIsLogined(true);
    }
  }, []);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Chuyên việt Mini football</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#works">Works</Nav.Link>
            <Nav.Link href="#teams">Teams</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link> */}

            {isLogined ? (
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    height: 30,
                  }}
                >
                  <div
                    style={{
                      width: 45,
                      height: 45,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      backgroundImage: `url(${avatar})`,
                      backgroundSize: "contain",
                      cursor: "pointer",
                    }}
                  ></div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleOpenUserProfile}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link href="/sign-in">Sign in</Nav.Link>
                <Nav.Link href="/sign-up">Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
