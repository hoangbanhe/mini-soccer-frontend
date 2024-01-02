import React, { useEffect, useMemo, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getOneSportFieldService } from "../services/SportField/SportField.service";
import { Link, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { createBookingService } from "../services/Booking/Booking.service";
import { createPaymentUrl } from "../apis/payment-apis/payment.api";
import moment from "moment";
import DatePicker from "react-datepicker";
import { convertToVND } from "../utils/money-handle.utl";
import AppHeader from "../components/common/AppHeader";
import BookingsTable from "../components/SportField/BookingsTable";
import { checkService } from "../apis/booking-apis/booking.api";
DetailsSportField.propTypes = {};

function DetailsSportField(props) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [bookDay, setBookDay] = useState(new Date());
  const [sportField, setSportField] = useState(null);

  const { id } = useParams();
  const price = useMemo(() => {
    if (startTime && endTime && sportField) {
      const momentStart = moment(startTime);
      const momentEnd = moment(endTime);

      const duration = momentEnd.diff(momentStart, "hours");

      return duration > 0 ? sportField.price_per_hour * duration : null;
    }

    return null;
  }, [startTime, endTime]);

  const isDisabledPayment = useMemo(() => {
    return Number(price) > 0 && bookDay ? false : true;
  }, [price]);

  useEffect(() => {
    const fetchSportField = async () => {
      try {
        const response = await getOneSportFieldService(id, bookDay);
        console.log(
          "🚀 ~ file: DetailsSportField.js:45 ~ fetchSportField ~ response:",
          response.data.data
        );

        const { status, message } = response.data.data;

        if (status === "NOT_BOOKING") {
          toast.error(message);
        }

        const sportFieldData = response.data.data.currSportField;
        setSportField(sportFieldData);
      } catch (error) {
        const message = error.response.data.message;
        toast.error(message);
      }
    };
    fetchSportField();
  }, [id, bookDay]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const createBookingPayload = {
        bookDay,
        startTime,
        endTime,
        total_Price: price,
        sportFieldId: sportField.id,
      };

      const check = await checkService(createBookingPayload);

      const { code, message } = check.data;

      if (code === 123) {
        toast.error(message);

        return;
      }
      const res = await createPaymentUrl({
        amount: price,
        bankCode: "VNBANK",
        language: "vn",
      });
      const vnUrl = res.data.data.vnpUrl;

      localStorage.setItem(
        "createBookingPayload",
        JSON.stringify(createBookingPayload)
      );
      window.open(vnUrl, "_blank");
    } catch (error) {}
  };

  if (!sportField) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <header id="header">
        <AppHeader />
      </header>
      <Container>
        <h1>Trang đặt sân bóng</h1>
        <Row>
          <Col sm={6} key={sportField.id}>
            <div className="holder">
              <Card>
                <Card.Img variant="top" src={sportField.spImages} />
                <Card.Body>
                  <Card.Text>
                    Tên sân: {sportField.name} - (sân: {sportField.size} người)
                  </Card.Text>
                  <Card.Text>Vị trí: {sportField.description}</Card.Text>
                  <Card.Text>
                    Thời gian mở cữa: {sportField.start_time} đến{" "}
                    {sportField.end_time}
                  </Card.Text>
                  <Card.Text>
                    Giá mỗi giờ: {convertToVND(sportField.price_per_hour)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col sm={6}>
            <Card>
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label>Ngày đặt sân</Form.Label>
                  <DatePicker
                    selected={bookDay}
                    onChange={(date) => setBookDay(date)}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label>Thời gian bắt đầu</Form.Label>
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label>Thời gian kết thúc</Form.Label>
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Form.Label>Tổng giá</Form.Label>
                  <Form.Control
                    // type="number"
                    value={convertToVND(price)}
                    name="total_price"
                    // onChange={handleChangeBookingValue}
                    required
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ alignSelf: "center", marginTop: "20px" }}
                  onClick={handlePayment}
                  disabled={isDisabledPayment}
                >
                  Thanh toán
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <BookingsTable Bookings={sportField.Bookings} />
        </Row>
      </Container>
    </div>
  );
}

export default DetailsSportField;
