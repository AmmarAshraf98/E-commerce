import { Navigate } from "react-router-dom";
import useAuth from "../custom-hook/useAuth";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  //   const navigate = useNavigate();

  const currentUser = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/SignUp" />;
}
export default ProtectedRoute;
