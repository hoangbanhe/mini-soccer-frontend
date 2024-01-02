import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";
import "./PaymentSuccess.css";
import { useSearchParams } from "react-router-dom";
import { convertToVND } from "../../utils/money-handle.utl";
import { convertYYYYMMDDHHmmsstToVNTime } from "../../utils/time-handle.utl";

import { toast } from "react-toastify";
import { checkStatusPaymentService } from "../../apis/payment-apis/payment.api";
import Spinner from "react-bootstrap/Spinner";
import { createBookingService } from "../../services/Booking/Booking.service";

PaymentSuccess.propTypes = {};

function PaymentSuccess(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const { vnp_Amount } = params;
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkStatusPayment = async () => {
      try {
        setIsLoading(true);
        const res = await checkStatusPaymentService(params);
        const { RspCode, message, data } = res.data;

        if (RspCode === "00" && message === "success") {
          setPaymentInfo(res.data.data);
          setIsLoading(false);

          const createBookingPayload = localStorage.getItem(
            "createBookingPayload"
          );
          console.log(
            "🚀 ~ file: PaymentSuccess.js:37 ~ checkStatusPayment ~ createBookingPayload:",
            createBookingPayload
          );

          console.log(
            "🚀 ~ file: PaymentSuccess.js:37 ~ checkStatusPayment ~ createBookingPayload:",
            JSON.parse(createBookingPayload)
          );

          if (createBookingPayload) {
            const createBookingRes = await createBookingService(
              createBookingPayload
            );

            toast.success("Payment successfully");
            toast.success(createBookingRes.data.message);
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkStatusPayment();
  }, []);

  return (
    <div className="mainContainer">
      {loading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {paymentInfo && (
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 20,
            }}
          >
            <div
              style={{
                backgroundColor: "#E4F3ED",
                padding: 20,
                borderRadius: "50%",
              }}
            >
              <FaCheckCircle color="#23A26D" size="50" />
            </div>

            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: 27,
                  fontWeight: 400,
                }}
              >
                Payment Success
              </p>

              <p
                style={{
                  fontFamily: "Poppins",
                  fontSize: 40,
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                {convertToVND(vnp_Amount)}
              </p>
            </div>
          </div>

          <div style={{ padding: 20 }}>
            <div className="payment-content-row">
              <p className="payment-content-label">Ref Number</p>
              <p className="payment-content-info">{paymentInfo.bankTranNo}</p>
            </div>

            <div className="payment-content-row">
              <p className="payment-content-label">Payment Time</p>
              <p className="payment-content-info">
                {convertYYYYMMDDHHmmsstToVNTime(paymentInfo.payDate)}
              </p>
            </div>

            <div className="payment-content-row">
              <p className="payment-content-label">Payment method</p>
              <p className="payment-content-info">{paymentInfo.bankCode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
