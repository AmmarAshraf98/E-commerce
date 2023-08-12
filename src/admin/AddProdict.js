import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import "../component/style/Add_product.css";
import { useState } from "react";
import Helmet from "../component/helmet/Helmet";

import { storage, db } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [pImg, setPimg] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);
      //refrence & name for new collection
      const docRef = await collection(db, "products");
      //reference & name for the img i upload
      const storageRef = ref(storage, `productImgs/${Date.now() + pImg.name}`);
      //upload img at the reference i created
      const uploadTask = await uploadBytesResumable(storageRef, pImg);
      //download img i just upload to set in docRef with it's other data
      const downloadURL = await getDownloadURL(uploadTask.ref);

      await addDoc(docRef, {
        title: title,
        shortDes: shortDes,
        desc: desc,
        price: price,
        imageUrl: downloadURL,
        category: category,
      });
      setLoading(false);
      toast.success("Producut Added Successfully");
      navigate("/dashboard/all_product");
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };
  return (
    <Helmet title="add_product">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12">
                <h4 className="text-center fw-bold">Loading . . . . .</h4>
              </Col>
            ) : (
              <Col lg="12">
                <h2 className="mb-5">Add Product</h2>
                <Form onSubmit={add}>
                  <FormGroup className="form_group">
                    <span>Product title</span>
                    <input
                      type="text"
                      placeholder="Double sofa"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Short description</span>
                    <input
                      type="text"
                      placeholder="Lorem......"
                      value={shortDes}
                      onChange={(e) => setShortDes(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <span>Describtion</span>
                    <input
                      type="text"
                      placeholder="Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center gap-5 justify-content-center">
                    <FormGroup className="form_group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        placeholder="120 $"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup className="form_group w-50">
                      <span>Category</span>
                      <select
                        className="category_select w-100 mb-3 p-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                        <option value="mobile">Mobile</option>
                      </select>
                    </FormGroup>
                  </div>
                  <FormGroup className="form_group">
                    <span>Image</span>
                    <input
                      type="file"
                      onChange={(e) => setPimg(e.target.files[0])}
                    />
                  </FormGroup>
                  <button className="shop-btn " type="submit">
                    Add Product
                  </button>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
export default AddProduct;
