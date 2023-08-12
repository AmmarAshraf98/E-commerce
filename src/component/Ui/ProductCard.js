import { Card, Col } from "react-bootstrap";
import "../style/ProductCard.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Actionss } from "../../redux/slices/CartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
function ProductCard({ data }) {
  console.log(data);
  const dispatch = useDispatch();
  const add = () => {
    dispatch(
      Actionss.Add_ToCart({
        id: data.id,
        price: data.price,
        title: data.title,
        imageUrl: data.imageUrl,
        category: data.category,
      })
    );
    toast.success("product added succesfuly");
  };

  return (
    <>
      <Col key={data.id} lg="3" md="4" sm="6">
        <Card className="card mb-2">
          <Link to={`/product/${data.id}`}>
            <motion.img
              whileHover={{ scale: 0.9 }}
              className="cardImg"
              src={data.imageUrl}
            />
          </Link>
          <Card.Title className="title p-2 m-0">
            <Link to={`/product/${data.id}`}>{data.title}</Link>
          </Card.Title>
          <Card.Text className="txt">{data.category}</Card.Text>
          <Card.Body className="body m-0 p-2">
            <Card.Text className="Money">${data.price}</Card.Text>
            <motion.span
              whileTap={{ scale: 1.2 }}
              className="icon"
              onClick={() => add()}
            >
              <i className="ri-add-line"></i>
            </motion.span>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
export default ProductCard;
