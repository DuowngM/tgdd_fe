import { NavLink, useNavigate } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import { Button, Dropdown } from "antd";
import logo from "./logo.png";
const HeaderOrder = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("flaguser");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="container_header">
      <NavLink to={"/"} className="header_order">
        <img src={logo} width={200} />
      </NavLink>
      <div
        className="header_orderl"
        style={{ border: "1px solid black", borderRadius: "10px" }}
      >
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <NavLink
                      to={"/"}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: 10,
                        textDecoration: "none",
                      }}
                    >
                      <NoteAltOutlinedIcon />
                      <p>Hồ sơ </p>
                    </NavLink>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <NavLink
                      onClick={() => handleLogout()}
                      to={"/"}
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: 10,
                        textDecoration: "none",
                      }}
                    >
                      <LogoutIcon />
                      <p>Log Out</p>
                    </NavLink>
                  ),
                },
              ],
            }}
            placement="bottom"
            arrow
          >
            <Button className="avatar__order">
              <b>{flaguser?.user_name}</b>{" "}
            </Button>
          </Dropdown>
        </div>
        <ListIcon />
        <NotificationsNoneOutlinedIcon />
      </div>
    </div>
  );
};

export default HeaderOrder;
