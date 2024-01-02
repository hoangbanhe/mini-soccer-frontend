import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";

AppFooter.propTypes = {};

function AppFooter(props) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <Container fluid>
      <div className="copyright">
        &copy; 2022 Corporate. All Right Reserved.
      </div>
      <div className="socials">
        <ul>
          <li>
            <a href="https://www.facebook.com">
              <BsFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com">
              <AiFillTwitterCircle />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com">
              <AiFillLinkedin />
            </a>
          </li>
        </ul>
      </div>
      {showTopBtn && <div className="go-top" onClick={goTop}></div>}
    </Container>
  );
}

export default AppFooter;
