import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { getUserProfile } from "../services/auth/auth.service";
import { toast, ToastContainer } from "react-toastify";
import Card from "react-bootstrap/Card";
import BookingsTable from "../components/SportField/BookingsTable";
import AppHeader from "../components/common/AppHeader";
import { updatedUserService } from "../services/user/User.service";

UserProfile.propTypes = {};

function UserProfile(props) {
  const handleSubmit = () => {};
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        const { currUser } = response.data.data;
        setUser(currUser);
      } catch (error) {
        const message = error.response.data.message;
        toast.error(message);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChangeUserValue = async (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateUser = async (event) => {
    try {
      const response = await updatedUserService(user);
      const message = response.data.message;
      toast.success(message);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <>
      <Container>
        <header id="header">
          <AppHeader />
        </header>

        {user ? (
          <>
            <Row>
              <Col
                md={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src={user.avatar} roundedCircle />
              </Col>
              <Col md={8}>
                <h1>User Profile</h1>
                <p>-----------------</p>
                <h2>User profile</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="firstName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={user.fullName}
                      name="fullName"
                      onChange={handleChangeUserValue}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={user.email}
                      name="email"
                      onChange={handleChangeUserValue}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleUpdateUser}>
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
            <p>Football field reservation payment list</p>
            <Row>
              <BookingsTable Bookings={user.Bookings} />
            </Row>
          </>
        ) : (
          <div>Loading api</div>
        )}
        <ToastContainer />
      </Container>
    </>
  );
}

export default UserProfile;
