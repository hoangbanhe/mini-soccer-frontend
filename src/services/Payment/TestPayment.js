import React, { useState } from "react";
import PropTypes from "prop-types";
import { createPaymentUrl } from "../../apis/payment-apis/payment.api";

TestPayment.propTypes = {};

function TestPayment(props) {
  const [amount, setAmount] = useState(null);
  console.log("🚀 ~ file: TestPayment.js:9 ~ TestPayment ~ amount:", amount);
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await createPaymentUrl({
        amount: amount || 10000,
        bankCode: "VNBANK",
        language: "vn",
      });
      const vnUrl = res.data.data.vnpUrl;
      window.open(vnUrl, "_blank");
    } catch (error) {}
  };
  return (
    <div>
      <div>
        <label for="quantity">So tien thanh toan</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="100000000"
          onInput={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handlePayment}>Thanh toan</button>
    </div>
  );
}

export default TestPayment;
