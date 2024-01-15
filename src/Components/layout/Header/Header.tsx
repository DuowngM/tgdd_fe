import "../../css/Header.css";
import logo from "./logo.png";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import WatchIcon from "@mui/icons-material/Watch";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import SimCardIcon from "@mui/icons-material/SimCard";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import publicAxios from "../../../configAxios/publicAxios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("flaguser");
    localStorage.removeItem("token");
    navigate("/");
  };
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  interface Cart {
    cart_id: number;
    user_id: number;
    productId: number;
    quantity: number;
  }
  const [cart, setCart] = useState<Cart[] | null>([]);
  console.log(cart);

  const loadCart = async () => {
    const response = await publicAxios.get(`cart/${flaguser?.user_id}`);
    if (response.data.status === 200) {
      setCart(response.data.cart);
    }
  };
  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [search, setSearch] = useState<string | null>("");
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search-product?key=${search}`);
  };
  const renderCart: any = useAppSelector((state) => state.cart.currentCart);
  return (
    <>
      <header className="header">
        <div className="header__top">
          <div className="header_top-container">
            <a href="/">
              <img src={logo} width={200} />
            </a>
            <div className="header_address">
              Xem giá tồn kho tại: <br /> <span>City</span>
            </div>
            <form className="header_search" onSubmit={(e) => handleSearch(e)}>
              <input
                id="skw"
                type="text"
                className="input-search"
                placeholder="Bạn tìm gì..."
                name="key"
                onChange={(e) => setSearch(e.target.value)}
                maxLength={100}
              />
              <button type="submit" className="button_search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <div
              className="name-order"
              style={{ width: "159px", textAlign: "center" }}
            >
              {flaguser ? (
                <>
                  <span>
                    <Link
                      to={`/information/account/${flaguser?.user_id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <b>{flaguser.phoneNumber}</b>
                    </Link>
                  </span>{" "}
                  <button className="btn-authen" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <span>
                  <button
                    className="btn-authen"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </button>
                  /
                  <button
                    className="btn-authen"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </button>
                </span>
              )}
            </div>
            <div className="header_cart">
              <div className="box-cart">
                <span
                  className="cart-number has-cart"
                  style={{
                    display: "inline-block",
                    position: "absolute",
                    left: "74%",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {flaguser ? renderCart?.length : 0}
                </span>
                <i
                  className="fa-solid fa-cart-shopping"
                  style={{ fontSize: "20px", padding: "10px" }}
                ></i>
              </div>
              <Link
                to={`/cart/${flaguser?.user_id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "60px",
                }}
              >
                Giỏ hàng
              </Link>
            </div>
          </div>
        </div>
        <div className="header__main">
          <div className="header_main-container">
            <ul className="main-menu">
              <NavLink to="/category/1">
                <li>
                  {" "}
                  <PhoneAndroidIcon />
                  Điện thoại
                </li>
              </NavLink>
              <NavLink to="/category/2">
                <li>
                  <LaptopMacIcon /> Laptop
                </li>
              </NavLink>
              <NavLink to="/category/4">
                <li>
                  <TabletMacIcon /> Tablet
                </li>
              </NavLink>
              <NavLink to="/category/5">
                <li>
                  <HeadphonesIcon /> Phụ kiện
                </li>
              </NavLink>
              <NavLink to="/category/3">
                <li>
                  <WatchIcon />
                  Smartwatch
                </li>
              </NavLink>
              <a href="">
                <li>
                  {" "}
                  <WatchLaterIcon />
                  Đồng hồ
                </li>
              </a>
              <a href="">
                <li>
                  <SmartphoneIcon />
                  Máy cũ giá rẻ
                </li>
              </a>
              <a href="">
                <li>
                  <DesktopMacIcon />
                  PC, máy in
                </li>
              </a>
              <a href="">
                <li>
                  <SimCardIcon />
                  Sim, thẻ cào
                </li>
              </a>
              <a href="">
                <li>
                  <FlashOnIcon />
                  Dịch vụ tiện ích
                </li>
              </a>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
