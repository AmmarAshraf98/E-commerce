import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import Helmet from "../component/helmet/Helmet";
import ComSection from "../component/Ui/ComSection";
import "../component/style/checkOut.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
function CheckOut() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
//dispatch on store

  const dispatch = useDispatch();
  const t_quantity = useSelector((state) => state.cart.t_quantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Check Out">
      <ComSection title="Check Out" />
      <section className="checkOut">
        <Container>
          <Row>
            <Col lg="8">
              <Form className="mb-5">
                <h4 className=" fw-bold mb-4">Billing Information </h4>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  ></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  ></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                  ></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input
                    type="text"
                    placeholder="Street address"
                    required
                  ></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="City" required></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Postal code" required></input>
                </FormGroup>

                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" required></input>
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="check_wrap">
                <div className="check-cash d-flex align-items-center justify-content-between">
                  <h6>Total Qty :</h6>
                  <span>{t_quantity} items</span>
                </div>
                <div className="check-cash d-flex align-items-center justify-content-between">
                  <h6>Total Amount :</h6>
                  <span>$ {totalAmount}</span>
                </div>
                <div className="check-cash d-flex align-items-center justify-content-between">
                  <h6>
                    Shipping : <br /> <span>Free Shipping</span>{" "}
                  </h6>
                  <span>0</span>
                </div>
                <div className="total-cash d-flex align-items-center justify-content-between">
                  <h4>Total Cost :</h4>
                  <span className="fs-5">${totalAmount}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="shop-btn w-100 checkout-btn"
                >
                  Place an oreder
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
export default CheckOut;
