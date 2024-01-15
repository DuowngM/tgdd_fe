import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import publicAxios from "../../../configAxios/publicAxios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import privateAxios from "../../../configAxios/pritvateAxios";
const AdminUsers = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.roles != 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);
  interface Users {
    user_id: number;
    phoneNumber: number;
    password: string;
    user_name: string;
    address: string;
    gender: number;
    date_of_birth: string;
    roles: number;
    user_email: string;
    status: string;
  }
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const response = await publicAxios.get("users");
    if (response.status === 200) {
      setUsers(response.data.allUsers);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const handleLock = async (id: number) => {
    try {
      const response = await privateAxios.patch(`users/status/${id}`);

      if (response.status === 200) {
        const lock_user = response.data.findUser;
        const lock_email = lock_user.user_email;

        await privateAxios.post(`http://localhost:8000/send-email/lock_user`, {
          lock_email,
        });
         
        notification.success({
          message: "Đã khóa tài khoản",
          style: {
            top: 95,
          },
        });
        loadUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnLock = async (id: number) => {
    try {
      const response = await publicAxios.put(`users/status/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Đã mở khóa tài khoản",
          style: {
            top: 95,
          },
        });
        loadUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1" style={{ paddingTop: "30px" }}>
          <h2>Danh sách người dùng</h2>
          <div className="list-product">
            <table className="list_product">
              <thead>
                <th>STT</th>
                <th>Tên người dùng</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Giới tính</th>
                <th>Email</th>
                <th>Role</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
              </thead>
              <tbody>
                {users?.map((user: Users, index: number) => (
                  <>
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      <td>{user.user_name}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.address}</td>
                      <td>
                        {" "}
                        {user.gender === 0 && "Nam"}
                        {user.gender === 1 && "Nữ"}
                        {user.gender === 2 && "Khác"}
                      </td>
                      <td>{user.user_email}</td>
                      <td>
                        {" "}
                        {user.roles === 0 && "User"}
                        {user.roles === 1 && "Administrator"}
                      </td>
                      <td>{user.status}</td>
                      <td>
                        {user.status === "Available" ? (
                          <td
                            className="icon_"
                            onClick={() => handleLock(user.user_id)}
                          >
                            <LockOpenOutlinedIcon />
                          </td>
                        ) : (
                          <td
                            className="icon_"
                            onClick={() => handleUnLock(user.user_id)}
                          >
                            <LockOutlinedIcon />
                          </td>
                        )}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminUsers;
