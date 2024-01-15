import { NavLink } from "react-router-dom";
import "../../css/SidebarAdmin.css";
import InventoryIcon from "@mui/icons-material/Inventory";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
const ShopUser = () => {
  return (
    <div>
      <div className="shop_left" style={{ padding: "20px" }}>
        <div>
          <div className="option_shop">
            <div>
              <h5>
                <InventoryIcon />
                Quản Lý Sản Phẩm
              </h5>
              <NavLink
                to={"/admin/allProducts"}
                style={{ textDecoration: "none" }}
              >
                <p>Tất Cả Sản Phẩm</p>
              </NavLink>
              <NavLink
                to={"/admin/addProducts"}
                style={{ textDecoration: "none" }}
              >
                <p>Thêm Sản Phẩm</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div>
              <h5>
                <SavingsIcon />
                Quản Lý Đơn Hàng
              </h5>
              <NavLink to={"/admin/orders"} style={{ textDecoration: "none" }}>
                <p>Tất Cả Đơn Hàng</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div>
              <h5>
                <CreditCardIcon />
                Voucher
              </h5>
              <NavLink to={"/admin/voucher"} style={{ textDecoration: "none" }}>
                <p>Thêm Voucher</p>
              </NavLink>
            </div>
          </div>
          <div className="option_shop">
            <div>
              <h5>
                <PersonIcon />
                Quản lý người dùng
              </h5>
              <NavLink to={"/admin/users"} style={{ textDecoration: "none" }}>
                <p>Danh sách người dùng</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopUser;
