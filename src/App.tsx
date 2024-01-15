import { Routes, Route } from "react-router-dom"; 
import Home from "./Components/layout/Home/Home";
import Register from "./Components/layout/Authentication/Register";
import Login from "./Components/layout/Authentication/Login";
import Information from "./Components/layout/Information/Information";
import Orders from "./Components/layout/Information/Orders";
import AdminAddProduct from "./Components/layout/Admin/AdminAddProduct";
import AdminAllProducts from "./Components/layout/Admin/AdminAllProducts";
import Cart from "./Components/layout/Cart/Cart";
import AdminOrder from "./Components/layout/Admin/AdminOrder";
import AdminVoucher from "./Components/layout/Admin/AdminVoucher";
import Category from "./Components/layout/Home/Category";
import ChangePassword from "./Components/layout/Information/ChangePassword";
import Details from "./Components/layout/Details/Details";
import Search from "./Components/layout/Search/Search";
import AdminUsers from "./Components/layout/Admin/AdminUsers";
import PrivateRouter from "./Components/layout/privateRouter/privateRouter";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/information/account/:id" element={<Information />} />
        <Route path="information/orders/:id" element={<Orders />} />
        <Route path="/admin/addProducts" element={<PrivateRouter />}>
          <Route path="/admin/addProducts" element={<AdminAddProduct />} />
        </Route>
        <Route path="/admin/allProducts" element={<PrivateRouter />}>
          <Route path="/admin/allProducts" element={<AdminAllProducts />} />
        </Route>
        <Route path="/admin/orders" element={<PrivateRouter />}>
          <Route path="/admin/orders" element={<AdminOrder />} />
        </Route>
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/search-product" element={<Search />} />
        <Route path="/admin/voucher" element={<AdminVoucher />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/category/:id" element={<Category />} />
        <Route
          path="information/changePassword/:id"
          element={<ChangePassword />}
        />
        <Route path="/details-product/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
