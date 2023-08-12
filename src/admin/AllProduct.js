import { Container, Row, Col } from "react-bootstrap";
import "../component/style/All_product.css";
import useGetData from "../custom-hook/useGetData";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function AllProduct() {
  const { data: productData, loading } = useGetData("products");

  const deletProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.success("Deleted");
  };

  return (
    <section className="All_prod">
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <Col lg="12">
                <h4 className="text-center py-5 fw-bold">Loading .....</h4>
              </Col>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imageUrl} alt="" />
                      </td>
                      <td>
                        <p>{item.title}</p>
                      </td>
                      <td>
                        <p>{item.category}</p>
                      </td>
                      <td>
                        <p>{item.price}</p>
                      </td>
                      <td>
                        <button
                          onClick={() => deletProduct(item.id)}
                          className="btn btn-danger"
                        >
                          Delet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default AllProduct;
