import { Container, Row, Col } from "react-bootstrap";
import useGetData from "../custom-hook/useGetData";
import "../component/style/users.css";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Users() {
  const { data: userData, loading } = useGetData("users");
  console.log(userData);

  const deletUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted");
  };
  return (
    <section className="users">
      <Container>
        <Row>
          <Col>
            {loading ? (
              <Col lg="12">
                <h4 className="text-center fw-bold py-5">Loading.....</h4>
              </Col>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Profile Pic</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.map((item) => (
                    <tr key={item.uid}>
                      <td>
                        <img src={item.photoURL} alt="user img" />{" "}
                      </td>
                      <td>
                        <p>{item.displayName}</p>
                      </td>
                      <td>
                        <p>{item.email}</p>
                      </td>
                      <td>
                        <button
                          onClick={() => deletUser(item.uid)}
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
export default Users;
