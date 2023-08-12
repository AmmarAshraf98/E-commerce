import Helmet from "../component/helmet/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroimg from "../assets/images/hero-img.png";
import { motion } from "framer-motion";
import Services from "../component/services/Services";
import ProductList from "../component/Ui/ProductList";
// import products from "../assets/data/products";
import { useEffect, useState } from "react";
import counterImg from "../assets/images/counter-timer-img.png";
import Clock from "../component/Ui/Clock";
import "../component/style/home.css";
import "../component/style/clock.css";
import useGetData from "../custom-hook/useGetData";

function Home() {
  const date = new Date().getFullYear();
  //get data
  // const loading = false;
  // const { data: productData, loading } = useGetData("products");
  // const [trending, settrending] = useState([]);
  // const [bestSaler, setbestSaler] = useState([]);
  // const [mobileProduc, setmobileProduc] = useState([]);
  // const [wireless, setwireless] = useState([]);
  // const [popularProd, setpopularProd] = useState([]);

  // //filter
  // useEffect(() => {
  //   //trending data
  //   const trendingFelter = productData?.filter(
  //     (ele) => ele.category === "chair"
  //   );
  //   settrending(trendingFelter);

  //   //bestSaler data
  //   const bestSalerFilter = productData?.filter(
  //     (ele) => ele.category === "sofa"
  //   );
  //   setbestSaler(bestSalerFilter);

  //   //mobile data
  //   const moblieProdFilter = productData?.filter(
  //     (ele) => ele.category === "mobile"
  //   );
  //   setmobileProduc(moblieProdFilter);

  //   //headphone data
  //   const wirelessFilter = productData?.filter(
  //     (ele) => ele.category === "wireless"
  //   );
  //   setwireless(wirelessFilter);

  //   //popularProduct data
  //   const productFilter = productData.filter((ele) => ele.category === "watch");
  //   setpopularProd(productFilter);
  //   console.log(productData);
  // }, [productData]);

  const { data: productData, loading } = useGetData("products");

  const [products, settrending] = useState([]);
  const [bestSaler, setbestSaler] = useState([]);
  const [mobileProduc, setmobileProduc] = useState([]);
  const [wireless, setwireless] = useState([]);
  const [popularProd, setpopularProd] = useState([]);
  console.log(productData);
  useEffect(() => {
    //trending data
    const trendingFelter = productData?.filter(
      (ele) => ele.category === "watch"
    );
    settrending(trendingFelter);

    // bestSaler data
    const bestSalerFilter = productData?.filter(
      (ele) => ele.category === "mobile"
    );
    setbestSaler(bestSalerFilter);

    //mobile data
    const moblieProdFilter = productData?.filter(
      (ele) => ele.category === "sofa"
    );
    setmobileProduc(moblieProdFilter);

    //headphone data
    const wirelessFilter = productData?.filter(
      (ele) => ele.category === "chair"
    );
    setwireless(wirelessFilter);

    //popularProduct data
    const productFilter = productData?.filter(
      (ele) => ele.category === "wireless"
    );
    setpopularProd(productFilter);
    console.log(trendingFelter);
  }, [productData]);
  console.log(products);
  return (
    <Helmet title={"home"}>
      <section className="land">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="section-content">
                <p>Trending Product in {date}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                </p>
                <motion.button whileTap={{ scale: 1.1 }} className="shop-btn">
                  <Link to={"/shop"}>Shop Now</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="section-img">
                <img src={heroimg} alt="Land_Image"></img>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />
      <section className="trending-product">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Trending Product</h2>
            </Col>
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={products} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best-sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Best Sales</h2>
            </Col>
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={bestSaler} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer-count">
        <Container>
          <Row>
            <Col lg="6" md="6" className="clock-col">
              <div className="clock-content">
                <h3 className="mb-2 fs-6 text-white">
                  Limit Offers on Ice cream
                </h3>
                <h4 className="mb-3 fs-5 text-white">Oct 17, 2023</h4>
              </div>
              <Clock />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="store-btn shop-btn "
              >
                <Link to={"/shop"}>Visit Store</Link>
              </motion.button>
            </Col>
            <Col
              lg="6"
              md="6"
              className="text-lg-end text-md-end center-img p-5"
            >
              <img src={counterImg} alt=""></img>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new_arrival">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">New Arrival</h2>
            </Col>
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={mobileProduc} />
            )}
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={wireless} />
            )}
          </Row>
        </Container>
      </section>

      <section className="new_arrival">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section-title">Popular in Category</h2>
            </Col>
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={popularProd} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
export default Home;
