import axios from "axios";
const bookingURL = "http://localhost:3000/api/booking";

export const createBookingService = async (createBooking) => {
  const token = localStorage.getItem("token");
  return await axios.post(
    `${bookingURL}/create-booking`,
    JSON.parse(createBooking),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

