import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import ComSection from "../component/Ui/ComSection";
import Helmet from "../component/helmet/Helmet";
import "../component/style/login.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const credintial = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credintial.user;
      console.log(user);
      toast.success("Logged In Successfully");
      setLoading(false);
      if (user.displayName === "ammar") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("somthing is wrong");
    }
  };

  return (
    <Helmet title="login">
      <ComSection title="login" />
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h4 className="text-center fw-bold">Loading . . . . .</h4>
              </Col>
            ) : (
              <Col lg="6" className="m-auto">
                <h3 className="fw-bold mb-4 text-center loglog">Login</h3>
                <Form className="text-center auth_form" onSubmit={logIn}>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      className="w-100"
                      required
                      placeholder="Enter you email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      className="w-100"
                      required
                      placeholder="Enter you password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 1.1 }}
                    className="shop-btn auth_btn fw-bold"
                  >
                    Login
                  </motion.button>
                  <p className="fs-6 mt-5">
                    Don't have an account?{" "}
                    <Link to={"/signUp"} className="create_account">
                      Create an account
                    </Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Login;
