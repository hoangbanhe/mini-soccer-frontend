import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "../services/auth/auth.service";
import AppHeader from "../components/common/AppHeader";
import {
  forgotPasswordUserService,
  resetPasswordService,
} from "../services/user/User.service";
import { FormControl, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

SignInPage.propTypes = {};

function SignInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChangeEmailValue = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await signIn(email, password);
      const message = response.data.message;
      const accessToken = response.data.accessToken;
      const avatar = response.data.avatar;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("avatar", avatar);
      toast.success(message);
      navigate("/");
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);

  const handleClickOpenForgotPasswordModal = () => {
    setOpenForgotPasswordModal(true);
  };

  const handleCloseOpenForgotPasswordModal = () => {
    setOpenForgotPasswordModal(false);
    setForgotPassword({
      email: "",
      otp: "",
      updatedPassword: "",
    });
  };

  const [forgotPassword, setForgotPassword] = useState({
    email: "",
    otp: "",
    updatedPassword: "",
  });

  const handleChangeForgotPasswordValue = (event) => {
    setForgotPassword({
      ...forgotPassword,
      [event.target.name]: event.target.value,
    });
  };

  const handleForgotPassword = async () => {
    try {
      const response = await forgotPasswordUserService(forgotPassword);
      const message = response.data.message;
      const emailURL = response.data.EMAIL_URL;
      toast.success(message);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await resetPasswordService(forgotPassword);
      const message = response.data.message;
      toast.success(message);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div>
      <header id="header">
        <AppHeader />
      </header>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    chuyên việt mini football
                  </h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={email}
                          onChange={handleChangeEmailValue}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handleChangePasswordValue}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a
                            className="text-primary"
                            onClick={handleClickOpenForgotPasswordModal}
                          >
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={handleLogin}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/sign-up" className="text-primary fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Modal forgot password*/}
      <>
        <Modal
          style={{
            padding: 50,
          }}
          show={openForgotPasswordModal}
          onHide={handleCloseOpenForgotPasswordModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Forgot password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text>EMAIL_ADDRESS</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={forgotPassword.email}
                name="email"
                onChange={handleChangeForgotPasswordValue}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>New password</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={forgotPassword.updatedPassword}
                name="updatedPassword"
                onChange={handleChangeForgotPasswordValue}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Otp</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={forgotPassword.otp}
                name="otp"
                onChange={handleChangeForgotPasswordValue}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleCloseOpenForgotPasswordModal}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleForgotPassword}>
              Receive otp code
            </Button>
            <Button variant="primary" onClick={handleResetPassword}>
              Reset password
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <ToastContainer />
    </div>
  );
}

export default SignInPage;
