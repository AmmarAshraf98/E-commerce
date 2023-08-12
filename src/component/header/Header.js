import { Container, Navbar, Row } from "react-bootstrap";
import logo from "../../assets/images/eco-logo.png";
import use_icon from "../../assets/images/user-icon.png";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hook/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const headlinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

function Header() {
  let cart = useSelector((state) => state.cart);

  // const [cartData, setCart] = useState(cart.cartItem);
  // console.log(cartData);
  const navigate = useNavigate();
  const currentUser = useAuth();

  const headRef = useRef(null);
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  // add and remove a class for ths document based on it's position
  const setSticky = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headRef.current.classList.add("sticky-nav");
      } else {
        headRef.current.classList.remove("sticky-nav");
      }
    });
  };
  useEffect(() => {
    setSticky();
    return window.removeEventListener("scroll", setSticky);
  }, []);

  const menuToggle = () => {
    menuRef.current.classList.toggle("active-menu");
  };

  const profileToggle = () => {
    profileActionRef.current.classList.toggle("show");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <Navbar className="header" ref={headRef}>
        <Container>
          <Row className="row1">
            <div className=" Wrapper d-flex align-items-center justify-content-between">
              <div className="logo">
                <img src={logo} alt="logo" />
                <h1>Brand</h1>
              </div>

              {/* to hide the mobile menu when touch on the screen */}
              <div className="link" ref={menuRef} onClick={menuToggle}>
                <div className="menu">
                  {headlinks.map((item, index) => (
                    <div key={index}>
                      <NavLink
                        key={index}
                        className={(navClass) =>
                          navClass.isActive ? "nav_active" : "link-item"
                        }
                        to={item.path}
                      >
                        {item.display}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="nav-icon">
                  <span className="fav-icon">
                    <i className="ri-heart-3-line"></i>
                    <span className="badg">1</span>
                  </span>

                  <span className="cart-icon">
                    <Link to={"/cart"}>
                      <i className="ri-shopping-cart-2-line"></i>
                      <span className="badg">{cart.t_quantity}</span>
                    </Link>
                  </span>

                  <div className="use-img">
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={currentUser ? currentUser.photoURL : use_icon}
                      alt=""
                      onClick={profileToggle}
                    />
                    <div
                      className="profile_actions"
                      ref={profileActionRef}
                      onMouseLeave={profileToggle}
                    >
                      {currentUser ? (
                        <span onClick={logout} className="w-100">
                          Logout
                        </span>
                      ) : (
                        <div className="signning d-flex justify-content-center flex-column align-items-center">
                          <Link to={"/signup"}>signup</Link>
                          <Link to={"/login"}>login</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mobile-menu">
                  {/* for show mobile menu when touch the menu icon */}
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
