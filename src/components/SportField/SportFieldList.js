import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getAllSportFieldService } from "../../services/SportField/SportField.service";
import { Link } from "react-router-dom";
SportFieldList.propTypes = {};

function SportFieldList(props) {
  const [allSportFields, setAllSportFields] = useState([]);
  const [selectSize, setSelectSize] = useState(null);
  const [selectArrange, setSelectArrange] = useState(null);

  //
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const paginationButtons = [];

  const handleChangePage = (index) => {
    setPage(index);
  };

  const handleChangePerPage = (event) => {
    setPerPage(event.target.value);
  };
  for (let index = 1; index <= totalPage; index++) {
    paginationButtons.push(
      <Button
        variant={index === page ? "primary" : ""}
        onClick={() => handleChangePage(index)}
        key={index}
      >
        {index}
      </Button>
    );
  }
  //

  useEffect(() => {
    const fetchSportField = async () => {
      try {
        const params = {
          size: selectSize,
          price_per_hour: selectArrange,
          page,
          perPage,
        };
        const response = await getAllSportFieldService(params);
        const { totalPage, total, allSportFields } = response.data.data;
        setAllSportFields(allSportFields);
        setTotalPage(totalPage);
        setAllSportFields(response.data.data.allSportFields);
      } catch (error) {
        const message = error.response.data.message;
        toast.error(message);
      }
    };
    fetchSportField();
  }, [selectSize, selectArrange]);

  const handleSelectSizeValue = (event) => {
    const selectedValue = event.target.value;
    setSelectSize(selectedValue);
  };

  const handleSelectArrangeValue = (event) => {
    const selectedValue = event.target.value;
    setSelectArrange(selectedValue);
  };

  return (
    <section id="blog" className="block blog-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Latest from sportField</h2>
          <div className="subtitle">get our latest news from sportField</div>

          <div
            style={{
              margin: 20,
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <div>
              <label for="cars">Chọn cỡ sân :</label>

              <select
                name="sportField"
                id="sportFields"
                onChange={handleSelectSizeValue}
                value={selectSize}
              >
                <option value={null}>Tất cả sân</option>

                <option value="5">sân 5</option>
                <option value="7">sân 7</option>
              </select>
            </div>
            <div>
              <label for="cars">Lọc theo giá :</label>

              <select
                name="arrange"
                id="arranges"
                onChange={handleSelectArrangeValue}
                value={selectArrange}
              >
                <option value={null}>Chọn giá</option>

                <option value={JSON.stringify(["price_per_hour", "ASC"])}>
                  Tăng dần
                </option>
                <option value={JSON.stringify(["price_per_hour", "DESC"])}>
                  Giảm dần
                </option>
              </select>
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              gap: 5,
              justifyContent: "flex-end",
              paddingRight: 10,
            }}
          >
            <Form.Select
              className="w-auto"
              onChange={handleChangePerPage}
              aria-label="Default select example"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Select>
            {paginationButtons}
          </div>   */}
        </div>
        <Row>
          {allSportFields.map((sportField) => {
            const { spImages } = sportField;
            return (
              <Col sm={4} key={sportField.id}>
                <div className="holder">
                  <Card>
                    <Card.Img variant="top" src={spImages[0]} />
                    <Card.Body>
                      <Card.Text>{sportField.name}</Card.Text>
                      <Card.Text>Vị trí: {sportField.description}</Card.Text>
                      <Card.Text>Size: {sportField.size}</Card.Text>
                      <Card.Text>
                        Giá mỗi giờ: {sportField.price_per_hour}
                      </Card.Text>
                      <Link
                        to={`/sport-field/${sportField.id}`}
                        className="btn btn-primary"
                      >
                        Đặt sân
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default SportFieldList;
