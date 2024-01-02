import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { convertToVND } from "../../utils/money-handle.utl";

BookingsTable.propTypes = {};

function BookingsTable({ Bookings }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Book day</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Price</th>
          <th>Status</th>
          <th>Create at</th>
        </tr>
      </thead>
      <tbody>
        {Bookings.length > 0 ? (
          <>
            {Bookings.map((booking, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{moment(booking.bookDay).format("DD/MM/YYYY")}</td>
                  <td>{moment(booking.start_time).format("h:mm:ss a")}</td>
                  <td>{moment(booking.end_time).format("h:mm:ss a")}</td>
                  <td>{convertToVND(booking.total_Price)}</td>
                  <td>{booking.status}</td>
                  <td>
                    {moment(booking.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <p>Chưa có đơn đặt sân</p>
        )}
      </tbody>
    </Table>
  );
}

export default BookingsTable;
