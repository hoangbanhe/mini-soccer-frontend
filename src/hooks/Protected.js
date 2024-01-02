import React from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClickLogin = () => {
    navigate("/sign-in");
  };

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < new Date().getTime()) {
      localStorage.removeItem("token");
      localStorage.removeItem("avatar");
      return (
        <div>
          <Button onClick={handleClickLogin}>please login here</Button>
          <p>To view page</p>
        </div>
      );
    }
    return children;
  }
  return (
    <div>
      <Button onClick={handleClickLogin}>please login here</Button>
      <p>To view page</p>
    </div>
  );
}

export default Protected;
