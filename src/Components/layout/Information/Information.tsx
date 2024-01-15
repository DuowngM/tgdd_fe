import axios from "axios";
import "../../css/Information.css";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { notification } from "antd";
import Header from "../Header/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

const ProfileUser = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const [name, setName] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [gender, setGender] = useState<number | string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id != flaguser?.user_id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  interface UserInfo {
    user_id: number;
    phoneNumber: string;
    password: string;
    user_name: string;
    address: string;
    gender: string;
    date_of_birth: string;
    user_email: string;
  }

  const [user, setUser] = useState<UserInfo | null>(null);
  const loadUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/users/${flaguser.user_id}`
    );
    setUser(response.data.findUser);
    setName(response.data.findUser?.user_name);
    setAddress(response.data.findUser?.address);
    setGender(response.data.findUser?.gender);
    setBirthday(response.data.findUser?.date_of_birth);
    setEmail(response.data.findUser?.user_email);
  };
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedUser = {
    user_name: name,
    address,
    gender,
    date_of_birth: birthday,
    user_email: email,
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/${flaguser.user_id}`,
        updatedUser
      );
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công",
          style: {
            top: 95,
          },
        });
      }
      const updatedFlagUser = { ...flaguser, ...updatedUser };
      localStorage.setItem("flaguser", JSON.stringify(updatedFlagUser));
      loadUser();
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="container_profile">
        <Sidebar />
        <div className="profile_right">
          <div className="manager">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
          </div>
          <div className="main_profile">
            <div className="main_left">
              <table>
                <tbody>
                  <tr>
                    <td style={{ minWidth: "150px" }} className="label">
                      Số điện thoại
                    </td>
                    <td className="label1">
                      <b>{user?.phoneNumber}</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Tên</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Email</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Địa chỉ</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Giới tính</td>
                    <td className="label1">
                      <div className="radio">
                        <div className="radio">
                          <input
                            type="radio"
                            name="radio1"
                            id="Nam"
                            value={0}
                            checked={gender === 0}
                            onChange={(e) => setGender(Number(e.target.value))}
                          />
                          <label htmlFor="Nam">Nam</label>
                          <input
                            id="Nữ"
                            type="radio"
                            name="radio1"
                            style={{ marginLeft: 30 }}
                            value={1}
                            checked={gender === 1}
                            onChange={(e) => setGender(Number(e.target.value))}
                          />
                          <label htmlFor="Nữ">Nữ</label>
                          <input
                            id="Khác"
                            type="radio"
                            name="radio1"
                            style={{ marginLeft: 30 }}
                            value={2}
                            checked={gender === 2}
                            onChange={(e) => setGender(Number(e.target.value))}
                          />
                          <label htmlFor="Khác">Khác</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Ngày sinh</td>
                    <td className="label1">
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn-save" onClick={() => handleSave()}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUser;
