import axios from "axios";

export const createBookingService = (bookingPayload) => {
  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:3000/api/booking/create-booking",
    bookingPayload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const checkService = (bookingPayload) => {
  const token = localStorage.getItem("token");

  return axios.post("http://localhost:3000/api/booking/check", bookingPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
