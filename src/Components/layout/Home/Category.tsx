import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, notification } from "antd";
import { useAppDispatch } from "../../../redux/hook";
import { addToCart } from "../../../redux/cart";
import { Link } from "react-router-dom";
import { renderCart } from "../../../redux/cart";
const Category = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const dispatch = useAppDispatch();
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
  const { id } = useParams();

  const [products, setProducts] = useState<Products[] | null>([]);
  const loadProducts = async () => {
    const response = await axios.get(`http://localhost:8000/products/${id}`);
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
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const navigate = useNavigate();
  const userId = flaguser?.user_id;
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
      <section className="main-menu-product">
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
      </section>
      <Footer />
    </>
  );
};

export default Category;
