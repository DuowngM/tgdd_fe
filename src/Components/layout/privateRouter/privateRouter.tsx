import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;

  return flaguser.roles === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
