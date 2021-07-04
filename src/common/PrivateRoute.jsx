import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router";

export const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user);
  

  const location = useLocation();

  if (user) {
    return <Route {...props} />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};
