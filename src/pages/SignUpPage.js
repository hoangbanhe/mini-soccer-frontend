import React, { useState } from "react";
import propTypes from "prop-types";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "../services/auth/auth.service";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AppHeader from "../components/common/AppHeader";

SignUpPage.propTypes = {};

function SignUpPage(props) {
  const navigate = useNavigate();
  const [signUpPayLoad, setSignUpPayLoad] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlechangeSignUpPayLoad = (event) => {
    setSignUpPayLoad({
      ...signUpPayLoad,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { fullName, email, password, confirmPassword } = signUpPayLoad;

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      if (confirmPassword !== password) {
        toast.error("Password not match");
        return;
      }
      const response = await signUp(signUpPayLoad);
      const message = response.data.message;
      toast.success(message);

      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          navigate("/sign-in");
        }, [4000]);
      }, [4000]);
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      setIsLoading(false);
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
                  <p className=" mb-5">
                    Please enter your fullName, email and password!
                  </p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Full name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Full name"
                          name="fullName"
                          value={fullName}
                          onChange={handlechangeSignUpPayLoad}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={email}
                          onChange={handlechangeSignUpPayLoad}
                        />
                      </Form.Group>

                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <Form.Group
                          className="mb-3 w-50"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handlechangeSignUpPayLoad}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3 w-50"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Confirm password</Form.Label>
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                            }}
                          >
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={handlechangeSignUpPayLoad}
                            />
                            <Button onClick={handleShowPassword}>
                              {showPassword ? (
                                <AiFillEyeInvisible />
                              ) : (
                                <AiFillEye />
                              )}
                            </Button>
                          </div>
                        </Form.Group>
                      </div>

                      <div className="d-grid">
                        <Button variant="primary" onClick={handleSignUp}>
                          {isLoading ? "Loading..." : "Sign up"}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Do have an account?{" "}
                        <a href="/sign-in" className="text-primary fw-bold">
                          Login here
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
      <ToastContainer />
    </div>
  );
}
export default SignUpPage;
