import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import useGetData from "../custom-hook/useGetData";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { data: products } = useGetData("products");
  const { data: users } = useGetData("users");
  const navigate = useNavigate();
  const go = () => {
    navigate("/dashboard/users");
  };
  const goProducts = () => {
    navigate("/dashboard/all_product");
  };
  return (
    <section className="services">
      <Container>
        <Row>
          <Col lg="3" md="4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="service-item"
              style={{ background: "#fdefe6" }}
            >
              <div className="item-content">
                <h3>Total Sales</h3>
                <p className=" pt-1 fw-bold">98100 $</p>
              </div>
            </motion.div>
          </Col>
          <Col lg="3" md="4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="service-item"
              style={{ background: "#ceebe9" }}
            >
              <div className="item-content">
                <h3>Orders</h3>
                <p className="pt-1 fw-bold">232</p>
              </div>
            </motion.div>
          </Col>
          <Col lg="3" md="4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="service-item"
              style={{ background: "#e2f2b2" }}
              onClick={goProducts}
            >
              <div className="item-content">
                <h3>Total Products</h3>
                <p className="pt-1 fw-bold">{products?.length}</p>
              </div>
            </motion.div>
          </Col>
          <Col lg="3" md="4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="service-item"
              style={{ background: "#d6e5fb" }}
              onClick={go}
            >
              <div className="item-content">
                <h3>Total Users</h3>
                <p className="pt-1 fw-bold">{users?.length}</p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Dashboard;
