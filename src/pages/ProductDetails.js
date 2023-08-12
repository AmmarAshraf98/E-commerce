import { motion } from "framer-motion";
import "../component/style/productDetails.css";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../component/helmet/Helmet";
import ComSection from "../component/Ui/ComSection";
import { useDispatch } from "react-redux";
import { Actionss } from "../redux/slices/CartSlice";
import { useEffect, useRef, useState } from "react";
import ProductList from "../component/Ui/ProductList";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import useGetData from "../custom-hook/useGetData";

function ProductDetails() {
  const dispatch = useDispatch();
  const [tap, setTap] = useState("desc");

  const [rate, setRate] = useState(null);
  const review_User = useRef("");
  const review_msg = useRef("");

  const { data: products } = useGetData("products");
  const { producId } = useParams();
  const [product, setProducts] = useState({});

  //get product i selected
  useEffect(() => {
    const docRef = doc(db, "products", producId);
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProducts(docSnap.data());
      }
    };
    getProduct();
  }, [producId]);

  const {
    category,
    imageUrl,
    desc,
    // avgRating,
    review,
    // reviewObj,
    price,
    title,
    shortDes,
  } = product;

  const [reviews, setRevews] = useState([]);
  console.log("review", review);

  const rel_products = products?.filter((e) => e.category === category);

  //function add protuct to cart
  const add = () => {
    dispatch(
      Actionss.Add_ToCart({
        id: product.id,
        price: product.price,
        desc: product.title,
        img: product.imageUrl,
        category: product.category,
      })
    );
    toast.success("Product added Succesfully");
  };

  //submitting reviw form
  const submitHundler = (e) => {
    e.preventDefault();
    const user = review_User.current.value;
    const message = review_msg.current.value;
    const reviewObj = {
      userName: user,
      message: message,
      rate,
    };
    // setRevews(...review, reviewObj);
    setRevews([...reviews, reviewObj]);
    const docRef = doc(db, "products", producId);
    console.log(docRef);
    console.log(review);
    toast.success("Thanks for Message");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={category}>
      <ComSection title={title} />

      <section className="details pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <div className="img_wrap">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={imageUrl}
                  alt=""
                ></motion.img>
              </div>
            </Col>
            <Col lg="6">
              <div className="details_div">
                <h2>{title}</h2>

                <div className="rating_star mb-3 d-flex align-items-center gap-5">
                  <div className="starts">
                    <span className="">
                      <i className="ri-star-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-line"></i>
                    </span>{" "}
                  </div>

                  <p>{/* ( Rating : <span>{avgRating}</span> ) */}</p>
                </div>

                <div className="d-flex align-items-center gap-5">
                  <p className="price">
                    Price : <span>{price}</span>$
                  </p>
                  <p className="category">
                    Category : <span>{category}</span>
                  </p>
                </div>

                <p className="description mt-3 mb-2">{shortDes}</p>
                {/* add to cart button */}
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="shop-btn buy_btn"
                  onClick={add}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="tap_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tap === "desc" ? "active_tap" : ""}`}
                  onClick={() => setTap("desc")}
                >
                  description
                </h6>

                <h6
                  className={`${tap === "rev" ? "active_tap" : ""}`}
                  onClick={() => setTap("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>

              {tap === "rev" ? (
                <div className="mt-4 ">
                  {reviews.map((e, index) => (
                    <div
                      key={index}
                      className="reviews d-flex align-items-center gap-2"
                    >
                      <p className="rev_text">{e.message}</p>
                      <span className="rev_rate">({e.rate} / 5)</span>
                    </div>
                  ))}

                  <div className="review_form">
                    <h4>Let Your Review</h4>
                    {/* form  */}
                    <form action="" onSubmit={submitHundler}>
                      <div className="form_group">
                        <input
                          ref={review_User}
                          type="text"
                          placeholder="Please Enter Your Name"
                          required
                        />
                      </div>

                      <div className="form_group spans  d-flex align-items-center justify-content-between">
                        <motion.span
                          whileTap={{ rotate: 220, scale: 1.1 }}
                          onClick={() => {
                            setRate(1);
                          }}
                        >
                          1 <i value="1" className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ rotate: 220, scale: 1.1 }}
                          onClick={() => {
                            setRate(2);
                            console.log(rate);
                          }}
                        >
                          2 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ rotate: 220, scale: 1.1 }}
                          onClick={() => {
                            setRate(3);
                            console.log(rate);
                          }}
                        >
                          3 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ rotate: 220, scale: 1.1 }}
                          onClick={() => {
                            setRate(4);
                            console.log(rate);
                          }}
                        >
                          4 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ rotate: 220, scale: 1.1 }}
                          onClick={() => {
                            setRate(5);
                            console.log(rate);
                          }}
                        >
                          5 <i className="ri-star-s-fill"></i>
                        </motion.span>
                      </div>

                      <div className="form_group">
                        <textarea
                          ref={review_msg}
                          rows={4}
                          type="text"
                          placeholder="Please Put Your Review Message"
                          required
                        />
                      </div>
                      <button type="submit" className="shop-btn form_btn">
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="mt-4">{desc}</div>
              )}
            </Col>

            <Col lg="12" className="mt-5 d-block">
              <h2 className="text-center mb-4">You Might Like This</h2>
            </Col>
            <ProductList data={rel_products} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
export default ProductDetails;
