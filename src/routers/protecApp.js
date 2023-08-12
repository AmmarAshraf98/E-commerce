import useAuth from "../custom-hook/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import errorImg from "../assets/images/depositphotos_52839753-stock-photo-error-illustration.jpg";

function ProtectApp() {
  const navigate = useNavigate();
  const user = useAuth();
  const name = user.displayName === "ammar";
  return name ? (
    <Outlet />
  ) : (
    <div className="text-center">
      <img
        src={errorImg}
        style={{ width: "15%", height: "15%", cursor: "pointer" }}
        alt="error"
        onClick={() => navigate("/")}
      />
      <h4 className="py-5">
        Opps... You Have No Access Here !<br /> <br /> Please click pic and
        let's Back to safe pages
      </h4>
    </div>
  );
}

export default ProtectApp;
