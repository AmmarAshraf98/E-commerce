import "../component/style/AdminNav.css";
import { Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../custom-hook/useAuth";
import { motion } from "framer-motion";
import { useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";

const nav_items = [
  { path: "/dashboard", display: "Dashboard" },
  { path: "dashboard/all_product", display: "All-Products" },
  { path: "dashboard/orders", display: "Orders" },
  { path: "dashboard/users", display: "Users" },
];
function AdminNav() {
  const navigate = useNavigate();
  const currentUser = useAuth();
  const profileActionRef = useRef(null);

  const profileToggel = () => {
    profileActionRef.current.classList.toggle("show");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        // navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <header className="admin-header">
        <div className="admin-nav">
          <Container>
            <div className="wrraper-div">
              <div className="logo">
                <h2 className=""> Brand</h2>
              </div>

              <div className="searxh-box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              <div className="icon-box">
                <span className="notification">
                  <i className="ri-notification-3-line"></i>
                </span>

                <span className="setting">
                  <i className="ri-settings-4-line"></i>
                </span>

                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser && currentUser.photoURL}
                  alt="admin"
                  onClick={profileToggel}
                />
                <div
                  className="actions_tap"
                  ref={profileActionRef}
                  onMouseLeave={profileToggel}
                >
                  <span className="logoutSpan" onClick={logout}>
                    Log out
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="dashbord_links">
        <Container>
          <Row>
            <ul className="link_wrapper">
              {nav_items.map((item, index) => (
                <li className="item_link" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "isActive" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default AdminNav;
