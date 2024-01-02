import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TestPayment from "./services/Payment/TestPayment";
import Protected from "./hooks/Protected";
import DetailsSportField from "./pages/DetailsSportField";
import "react-datepicker/dist/react-datepicker.css";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import UserProfile from "./pages/UserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />}></Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>

      <Route path="/sign-up" element={<SignUpPage />}></Route>

      <Route path="/test-payment" element={<TestPayment />}></Route>

      <Route path="/sport-field/:id" element={<DetailsSportField />}></Route>
      <Route path="/payment-success" element={<PaymentSuccess />}></Route>
      <Route
        path="user-profile"
        element={
          <Protected>
            <UserProfile />
          </Protected>
        }
      ></Route>
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
