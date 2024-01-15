import React, { useState } from "react";
import "../../css/Register.css";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Header from "../Header/Header";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { registerRedux } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const registerState = useAppSelector((state) => state.auth.currentUser);

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(registerRedux({ phoneNumber, password }));
    setPhoneNumber("");
    setPassword("");
    if (registerState) {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <section className="wrapper">
        <div className="img-icon">
          <img
            className="site-icon "
            src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270.png"
            alt="Site Icon"
          />
        </div>
        <div className="step1">
          <h3>ĐĂNG KÝ</h3>
          <form id="frmGetVerifyCode" onSubmit={handleRegister}>
            <div className="input-area">
              <PhoneIphoneIcon
                style={{ position: "relative", top: "45px", left: "20px" }}
              />
              <input
                type="tel"
                name="txtPhoneNumber"
                id="txtPhoneNumber"
                placeholder="Nhập số điện thoại"
                autoComplete="off"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <LockOpenIcon
                style={{ position: "relative", top: "45px", left: "20px" }}
              />
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="hide" />
            <button type="submit" className="btn-continue">
              TIẾP TỤC
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
