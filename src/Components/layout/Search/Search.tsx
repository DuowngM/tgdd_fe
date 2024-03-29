import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import publicAxios from "../../../configAxios/publicAxios";
import { Link } from "react-router-dom";
import { Card, notification } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { addToCart } from "../../../redux/cart";
import "../../css/Search.css";
import { renderCart } from "../../../redux/cart";
const Search = () => {
  interface Products {
    product_id: number;
    product_name: string;
    product_stocks: number;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
    status: string;
    product_image: string;
  }
  const [key, setKey] = useState<string | null>("");
  const [products, setProducts] = useState<Products[]>([]);
  
  const location = useLocation();
  const handleGetKey = () => {
    const searchParams = new URLSearchParams(location.search);
    setKey(searchParams.get("key"));
  };

  const loadProducts = async () => {
    const response = await publicAxios.get(`/products/find/search?key=${key}`);
    const allProducts = response.data.products;
    const available = allProducts.filter(
      (products: Products) => products.status === "Available"
    );
    const sortedProducts = available.sort((a: Products, b: Products) =>
      a.product_name.localeCompare(b.product_name)
    );
    setProducts(sortedProducts);
  };

  useEffect(() => {
    handleGetKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (key) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const flaguserJSON = localStorage.getItem("flaguser");  
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const dispatch = useAppDispatch();
  const userId = flaguser?.user_id;
  const navigate = useNavigate();
  const [changeLocal, setChangeLocal] = useState(0);
  const handleAddToCart = (productId: number) => {
    if (!flaguser) {
      notification.error({
        message: "Đăng nhập trước khi mua hàng",
        style: {
          top: 95,
        },
      });
      navigate("/login");
      return;
    }
    dispatch(addToCart({ productId, userId }));
    localStorage.setItem(
      "change",
      JSON.stringify(Math.floor(Math.random() * 1000000000))
    );
    const change = localStorage.getItem("change");
    const effectChange = change ? JSON.parse(change) : undefined;
    setChangeLocal(effectChange);
  };
  useEffect(() => {
    dispatch(renderCart(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeLocal]);
  return (
    <>
      <Header />
      <div className="search-product">
        <h1>Từ khóa tìm kiếm: {key}</h1>
        <div className="list-product">
          {products?.map((product, index) => (
            <div className="element-product" key={index}>
              <Link
                to={`/details-product/${product.product_id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  hoverable
                  style={{
                    width: 200,
                    minHeight: 500,
                    paddingTop: 20,
                    marginLeft: 50,
                  }}
                  cover={
                    <div
                      style={{ height: "200px" }}
                      onClick={() =>
                        navigate(`/details-product/${product.product_id}`)
                      }
                    >
                      <img
                        style={{ width: "100%" }}
                        alt="example"
                        src={product.product_image}
                      />
                    </div>
                  }
                  key={index}
                >
                  <div className="info-product">
                    <p className="name-product">
                      <b>{product.product_name}</b>
                    </p>
                    <p className="price-product">
                      {product.price.toLocaleString() + "₫"}
                    </p>
                    <p>
                      Stocks:{" "}
                      {product.product_stocks === 0
                        ? "Hết hàng"
                        : product.product_stocks}
                    </p>
                    <button
                      className={`btn-add ${
                        product.product_stocks === 0 ? "btn-disabled" : ""
                      }`}
                      onClick={() => handleAddToCart(product.product_id)}
                      disabled={product.product_stocks === 0}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;
