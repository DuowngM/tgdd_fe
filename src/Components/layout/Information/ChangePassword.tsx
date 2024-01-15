import { useEffect, useState } from "react";
import "../../css/Information.css";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";
import Footer from "../Footer/Footer";
import { notification } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import privateAxios from "../../../configAxios/pritvateAxios";
const ChangePassword = (): JSX.Element => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id != flaguser?.user_id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleOldPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (id: number) => {
    const change = {
      oldPassword,
      newPassword,
    };
    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Mật khẩu mới phải trùng nhau",
        style: {
          top: 95,
        },
      });
      return;
    }
    const response = await privateAxios.put(
      `auth/changePassword/${id}`,
      change
    );
    if (response.data.status === 401) {
      notification.error({
        message: "Sai mật khẩu",
        style: {
          top: 95,
        },
      });
      return;
    }
    if (response.status === 200) {
      notification.success({
        message: "Đổi mật khẩu thành công",
        style: {
          top: 95,
        },
      });
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Header />
      <div className="container_profile">
        <Sidebar />
        <div className="profile_right">
          <h1>Đổi mật khẩu</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Mật khẩu cũ:</label>
                </td>
                <td>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Mật khẩu mới:</label>
                </td>
                <td>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Xác nhận mật khẩu:</label>
                </td>
                <td>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={() => handleSubmit(flaguser?.user_id)}>
            Đổi mật khẩu
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChangePassword;
