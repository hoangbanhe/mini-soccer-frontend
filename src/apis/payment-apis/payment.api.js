import axios from "axios";

export const createPaymentUrl = (paymentInfo) => {
  return axios.post(
    "http://localhost:3000/api/payment/create-payment-url",
    paymentInfo
  );
};

export const checkStatusPaymentService = (params) => {
  return axios.get("http://localhost:3000/api/payment/get-payment-detail", {
    params,
  });
};
