import { Col, Container, Row, Table } from "react-bootstrap";
import Helmet from "../component/helmet/Helmet";
import ComSection from "../component/Ui/ComSection";
import { useSelector, useDispatch } from "react-redux";
import "../component/style/cart.css";
import { motion } from "framer-motion";
import { Actionss } from "../redux/slices/CartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Cart() {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totall = useSelector((state) => state.cart.totalAmount);
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(cartItem);
    console.log(totall);
  }, []);

  console.log(totall);
  return (
    <Helmet title={"Cart"}>
      <ComSection title="Shopping Cart" />
      <section className="cart_table">
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="section-title">Items</h2>
            </Col>

            <Col lg="9" md="12">
              {cartItem.length === 0 ? (
                <h2 className="text-center fs-4">No Items added To Cart</h2>
              ) : (
                <Table bordered hover variant="secondary" responsive="sm">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem?.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </Table>
              )}
            </Col>

            <Col lg="3" md="6">
              <div className="mb-2 mt-2">
                <h6 className="fs-4 fw-boold d-flex align-items-center justify-content-between">
                  SubTotal <span className="fs-5">{totall}$</span>
                </h6>
              </div>
              <p className="fs-6">
                Taxes and shipping will be calculated in checkout
              </p>
              <div>
                <button className="shop-btn w-100 mt-3">
                  <Link to="/checkOut">checkout</Link>
                </button>
                <button className="shop-btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

const Tr = ({ item }) => {
  console.log(item);
  const dispatch = useDispatch();
  const deletItem = () => {
    dispatch(Actionss.Delet_Item(item.id));
  };
  const addItem = () => {
    dispatch(Actionss.Increase(item.id));
  };
  const Decrease_Item = () => {
    dispatch(Actionss.Decrease(item.id));
  };
  return (
    <tr>
      <td>
        <img className="table_img" src={item.imageUrl} alt="s" />
      </td>
      <td className="title">
        <span>{item.title}</span>
      </td>
      <td className="price">{`${item.price} $`}</td>
      <td>{item.quantity}</td>
      <td className="operations">
        <div>
          <motion.span onClick={deletItem} whileTap={{ rotate: 9 }}>
            <motion.i
              whileTap={{ scale: 1.2 }}
              className="ri-delete-bin-line"
            ></motion.i>
          </motion.span>
          <motion.span onClick={Decrease_Item}>
            <motion.i className="ri-subtract-line"></motion.i>
          </motion.span>
          <motion.i
            onClick={addItem}
            whileTap={{ scale: 2.2 }}
            className="ri-add-fill"
          ></motion.i>
        </div>
      </td>
    </tr>
  );
};
export default Cart;
