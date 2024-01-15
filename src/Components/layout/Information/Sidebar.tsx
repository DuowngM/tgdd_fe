import { NavLink } from "react-router-dom";
import "../../css/Information.css";
const Sidebar = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  return (
    <>
      <div className="profile_left" style={{ width: 300 }}>
        <div className="avatar_left">
          <div className="avatar_left1">
            <b>{flaguser?.user_name}</b>
          </div>
        </div>{" "}
        <div>
          <div className="option_profile">
            <NavLink
              to={`/information/account/${flaguser.user_id}`}
              className="nav-link"
              style={{ color: "black", textDecoration: "none" }}
            >
              Tài Khoản Của Tôi
            </NavLink>
          </div>
          <div className="option_profile">
            <NavLink
              to={`/information/orders/${flaguser.user_id}`}
              className="nav-link"
              style={{ color: "black", textDecoration: "none" }}
            >
              Đơn Mua
            </NavLink>
          </div>
          <div className="option_profile">
            <NavLink
              to={`/information/changePassword/${flaguser.user_id}`}
              className="nav-link"
              style={{ color: "black", textDecoration: "none" }}
            >
              Đổi mật khẩu
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
