import "./footer.css";
import "../../App.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col lg="4" md="6" className="mb-5 mb-lg-0">
            <div className="footer-text">
              <h1 className="text-white mb-3">Brand</h1>
              <p className="footer-p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-5 mb-lg-0">
            <div className="top-category">
              <h4 className="top-category-title">Top Category</h4>
              <ListGroup as="ul">
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="#">Mobile Phones </Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="2" md="6" className="mb-5 mb-lg-0">
            <div className="top-category">
              <h4 className="top-category-title">Useful Links</h4>
              <ListGroup as="ul">
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="/shop">Shop </Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
                <ListGroupItem as="li" className="ps-0 border-0">
                  <Link to="#">Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="6">
            <div className="top-category">
              <h4>Contact Us</h4>
              <ListGroup as="ul">
                <ListGroupItem
                  as="li"
                  className="ps-0 border-0 d-flex align-items-center gap-2"
                >
                  <span>
                    <i className=" ri-map-pin-line"></i>
                  </span>
                  <p> 7 School Street, Munsha'at Ganzoor</p>
                </ListGroupItem>

                <ListGroupItem
                  as="li"
                  className="ps-0 border-0 d-flex align-items-center gap-2"
                >
                  <span>
                    <i className=" ri-phone-line"></i>
                  </span>
                  <p>+20 1015947685</p>
                </ListGroupItem>

                <ListGroupItem
                  as="li"
                  className="ps-0 border-0 d-flex align-items-center gap-2"
                >
                  <span>
                    <i className=" ri-mail-line"></i>
                  </span>
                  <p className="mail">AmmarAshraf121998@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12" className="text-center">
            <p className="footer-copyright">
              Copyright @ {year} developed by Ammar Ashraf, All right reserved
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Footer;
