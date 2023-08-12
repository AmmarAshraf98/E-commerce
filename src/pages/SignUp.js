import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import ComSection from "../component/Ui/ComSection";
import Helmet from "../component/helmet/Helmet";
import "../component/style/login.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../firebase.config";
import { toast } from "react-toastify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentail.user;
      // create location for the pic
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      // upload img
      const uploadTask = await uploadBytesResumable(storageRef, file);
      //after upload img

      //get url for img i just upload in and set with user's data in the database table in next step
      const downloadURL = await getDownloadURL(uploadTask.ref);
      await updateProfile(user, {
        displayName: username,
        photoURL: downloadURL,
      });

      //store user data in firestore database in table
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
        photoURL: downloadURL,
      });

      //this varable (userCredentail) is obj wich (user) is one of it's properity
      setLoading(false);
      toast.success("Sign Up successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="signup">
      <ComSection title="Sign Up" />
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h4 className="text-center fw-bold">Loading . . . . .</h4>
              </Col>
            ) : (
              <Col lg="6" className="m-auto">
                <h3 className="fw-bold mb-4 text-center">Sign Up</h3>
                <Form className="text-center auth_form" onSubmit={signup}>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      className="w-100"
                      required
                      placeholder="Enter user name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>

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
                      required
                      placeholder="Enter you password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup className="form_group">
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      required
                    />
                  </FormGroup>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 1.1 }}
                    className="shop-btn auth_btn fw-bold"
                  >
                    Create an Account
                  </motion.button>

                  <p className="fs-6 mt-5">
                    Allready have an account?{" "}
                    <Link to={"/login"} className="create_account">
                      Login
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
};
export default SignUp;
