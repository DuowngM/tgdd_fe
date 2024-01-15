import { useState } from "react";
import "../../css/Footer.css";
import axios from "axios";
import { notification } from "antd";
const Footer = () => {
  const [email, setEmail] = useState("");
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSendEmail = async () => {
    if (!isValidEmail(email)) {
      // Xử lý khi email không hợp lệ
      notification.error({
        message: "Email không hợp lệ",
        style: {
          top: 95,
        },
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/send-email", {
        email,
      });
      setEmail("");
      if (response.status === 200) {
        notification.success({
          message: "Hãy kiểm tra email của bạn",
          style: {
            top: 95,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <footer className="footer">
        {/* main footer */}
        <div className="main-footer">
          <div className="hr"></div>
          <div className="grid wide">
            <div className="row sm-gutter main-footer-info">
              <div className="col l-2-4 m-4 c-6">
                <h3 className="footer__heading">CHĂM SÓC KHÁCH HÀNG</h3>
                <ul className="footer-list">
                  <li>
                    <a href="#" className="footer-item-link">
                      Trung Tâm Trợ Giúp
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      TGDD Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      TGDD Mall
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Hướng Dẫn Mua Hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Hướng Dẫn Bán Hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Thanh Toán
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      TGDD Xu
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Vận Chuyển
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Trả Hàng &amp; Hoàn Tiền
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Chăm Sóc Khách Hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Chính Sách Bảo Hành
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l-2-4 m-4 c-6">
                <h3 className="footer__heading">VỀ TGDD</h3>
                <ul className="footer-list">
                  <li>
                    <a href="#" className="footer-item-link">
                      Giới Thiệu Về TGDD Việt Nam
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Tuyển Dụng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Điều Khoản TGDD
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Chính Sách Bảo Mật
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Chính Hãng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Kênh Người Bán
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Flash Sales
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Chương Trình Tiếp Thị Liên Kết TGDD
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-item-link">
                      Liên Hệ Với Truyền Thông
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col l-2-4 m-4 c-12 pay-and-ship">
                <div>
                  <h3 className="footer__heading">THANH TOÁN</h3>
                  <div className="footer-sale-ship">
                    <img
                      src="../assets/pay/1.PNG"
                      alt="pay"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/pay/2.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/pay/3.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/pay/4.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/pay/5.PNG"
                      className="footer-item-sale-ship"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="footer__heading">ĐƠN VỊ VẬN CHUYỂN</h3>
                  <div className="footer-sale-ship">
                    <img
                      src="../assets/ship/1.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/2.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/3.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/4.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/5.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/6.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/7.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/8.PNG"
                      className="footer-item-sale-ship"
                    />
                    <img
                      src="../assets/ship/9.PNG"
                      className="footer-item-sale-ship"
                    />
                  </div>
                </div>
              </div>
              <div className="col l-2-4 m-4 c-6">
                <h3 className="footer__heading">THEO DÕI CHÚNG TÔI</h3>
                <ul className="footer-list">
                  <li>
                    <a
                      href="#"
                      className="footer-item-link footer-item-link-fb"
                    >
                      <i className="footer-item-icon fab fa-facebook-square" />
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="footer-item-link footer-item-link-is"
                    >
                      <i className="footer-item-icon fab fa-instagram-square" />
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="footer-item-link footer-item-link-li"
                    >
                      <i className="footer-item-icon fab fa-linkedin" />
                      LinkedIn
                    </a>
                  </li>
                </ul>
                <div>
                  <input
                    type="text"
                    style={{ paddingLeft: "5px", outline: "none" }}
                    placeholder="Nhập email để nhận quảng cáo"
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                  <button onClick={handleSendEmail} style={{ width: "50px" }}>
                    Gửi
                  </button>
                </div>
              </div>
              <div className="col l-2-4 m-8 c-6">
                <h3 className="footer__heading">TẢI ỨNG DỤNG TGDD</h3>
                <div className="footer-download">
                  <a href="#" className="footer-download-link">
                    <img
                      src="../assets/qr/qr-code.png"
                      className="footer-download-qr"
                    />
                  </a>
                  <div className="footer-download-app">
                    <a href="#" className="footer-download-link">
                      <img
                        src="../assets/qr/gg-play.png"
                        className="footer-download-app-img"
                      />
                    </a>
                    <a href="#" className="footer-download-link">
                      <img
                        src="../assets/qr/app-store.png"
                        className="footer-download-app-img"
                      />
                    </a>
                    <a href="#" className="footer-download-link">
                      <img
                        src="../assets/qr/app-gallery.png"
                        className="footer-download-app-img"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* copyright */}
            <div className="row1">
              <div className="grid">
                <p className="copyright-title">
                  © 2023 TGDD. Tất cả các quyền được bảo lưu
                </p>
              </div>
              <div className="grid">
                <p className="copyright-title">
                  Quốc gia & khu vực: Singapore | Indonesia | Đài Loan | Thái
                  Lan | Malaysia | Việt Nam | Philippines | Brazil | México |
                  Chile | Colombia
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* other footer */}
        <div className="other-footer">
          <div className="grid wide">
            <div className="row other-footer-heading">
              <div className="col l-2">
                <a href="#" className="other-footer-link">
                  CHÍNH SÁCH BẢO MẬT
                </a>
              </div>
              <div className="col l-2">
                <a href="#" className="other-footer-link">
                  QUY CHẾ HOẠT ĐỘNG
                </a>
              </div>
              <div className="col l-2">
                <a href="#" className="other-footer-link">
                  CHÍNH SÁCH VẬN CHUYỂN
                </a>
              </div>
              <div className="col l-2">
                <a href="#" className="other-footer-link">
                  TRẢ HÀNG VÀ HOÀN TIỀN
                </a>
              </div>
            </div>
            <div className="row">
              <div className="grid other-footer-info">
                <div style={{ marginTop: 50 }} className="image">
                  <a href="#" className="footer-download-link">
                    <img
                      src="../assets/done/logoCCDV.png"
                      className="footer-download-app-img"
                    />
                  </a>
                  <a href="#" className="footer-download-link">
                    <img
                      src="../assets/done/logoCCDV.png"
                      className="footer-download-app-img"
                    />
                  </a>
                  <a href="#" className="footer-download-link">
                    <img
                      src="../assets/done/logoCCDV.png"
                      className="footer-download-app-img"
                    />
                  </a>
                </div>
                <p className="other-footer-title">Công ty TNHH TGDD</p>
                <p className="other-footer-more">
                  Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu
                  Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt
                  Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.tgdd.vn
                </p>
                <p className="other-footer-more">
                  Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại
                  liên hệ: 024 73081221 (ext 4678)
                </p>
                <p className="other-footer-more">
                  Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch &amp; Đầu tư TP
                  Hà Nội cấp lần đầu ngày 10/02/2015
                </p>
                <p className="other-footer-more">
                  Ngày sản xuất © 2015 - Bản quyền gốc thuộc về Công ty TNHH
                  TGDD
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
