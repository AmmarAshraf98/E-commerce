import Helmet from "../component/helmet/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import ProductList from "../component/Ui/ProductList";
import { useEffect, useState } from "react";
import ComSection from "../component/Ui/ComSection";
import products from "../assets/data/products";
import "../component/style/shop.css";
import useGetData from "../custom-hook/useGetData";

function Shop() {
  const { data: realProduct, loading } = useGetData("products");
  console.log(realProduct);
  const [productData, setData] = useState([]);
  console.log(productData);
  useEffect(() => {
    setData(realProduct);
    window.scrollTo(0, 0);
  }, [realProduct]);

  //search filter
  const filter_product = (e) => {
    const value = e.target.value;
    if (value) {
      const filterd_data = realProduct.filter((e) => e.category === value);
      setData(filterd_data);
      console.log(filterd_data);
    }
  };

  const sorted = (e) => {
    const value = e.target.value;
    if (value === "ascending") {
      const x = products.sort((a, b) => a.price - b.price);
      setData(x);
      console.log(x);
    } else {
      const y = productData.sort((a, b) => b.price - a.price);
      setData(y);
    }
  };

  //serach input
  const search_product = (e) => {
    const value = e.target.value;
    const searchedProdcut = realProduct.filter((e) =>
      e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setData(searchedProdcut);
  };

  return (
    <Helmet title="Shop">
      <ComSection title={"Prodcuts"} />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className="search_input">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={search_product}
                />
                <i className="ri-search-line icona"></i>
              </div>
            </Col>

            <Col lg="3" md="6" xs="6">
              <div className="filter_selector">
                <select onChange={filter_product}>
                  <option>Filter by Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="chair">Chair</option>
                  <option value="mobile">Mobile</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>

            <Col lg="3" md="6" xs="6">
              <div className="filter_selector">
                <select onChange={sorted}>
                  <option>Sorte by Money</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {loading ? (
              <h4 className="text-center fw-bold">Loading.....</h4>
            ) : (
              <ProductList data={productData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
export default Shop;
