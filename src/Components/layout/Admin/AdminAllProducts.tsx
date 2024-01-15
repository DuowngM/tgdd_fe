import axios from "axios";
import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import publicAxios from "../../../configAxios/publicAxios";
import { Pagination, notification } from "antd";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
// import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import privateAxios from "../../../configAxios/pritvateAxios";
const { Search } = Input;

const AdminAddProduct = () => {
  // const flaguserJSON = localStorage.getItem("flaguser");
  // const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (flaguser?.roles != 1) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flaguser]);
  interface Products {
    product_id: number;
    product_name: string;
    product_stocks: number;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
    product_image: string;
    status: string;
  }
  interface CategoryList {
    category_id: number;
    category_name: string;
  }
  interface BrandList {
    brand_id: number;
    brand_name: string;
    category_id: number;
  }
  const [isRotating, setIsRotating] = useState(false);

  const [category, setCategory] = useState<CategoryList[] | null>([]);
  const [brand, setBrand] = useState<BrandList[] | null>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const loadProducts = async () => {
    const response = await privateAxios.get("/products/allProducts");
    setProducts(response.data.products);
  };
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const loadCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data.allCategory);
  };

  const loadBrand = async () => {
    const response = await axios.get(`http://localhost:8000/brand`);
    setBrand(response.data.allBrand);
  };

  useEffect(() => {
    loadProducts();
    loadCategory();
    loadBrand();
  }, []);

  const getBrandName = (brandId: number) => {
    const brandItem = brand?.find((item) => item.brand_id === brandId);
    return brandItem ? brandItem.brand_name : "";
  };

  const getCategoryName = (categoryId: number) => {
    const categoryItem = category?.find(
      (item) => item.category_id === categoryId
    );
    return categoryItem ? categoryItem.category_name : "";
  };

  const handleStatusProduct = async (id: number) => {
    setIsRotating(true);
    const productToUpdate: Products | any = products.find(
      (product) => product.product_id === id
    );
    if (productToUpdate.status === "Available") {
      const response = await publicAxios.patch(`products/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Thay đổi trạng thái sản phẩm",
          style: {
            top: 95,
          },
        });
        loadProducts();
      }
    } else {
      const response = await publicAxios.put(`products/${id}`);
      if (response.status === 200) {
        notification.success({
          message: "Thay đổi trạng thái sản phẩm",
          style: {
            top: 95,
          },
        });
        loadProducts();
      }
    }
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = async () => {
    const response = await publicAxios.get(
      `products/find/search?key=${searchValue}`
    );
    setProducts(response.data.products);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1" style={{ paddingTop: "30px" }}>
          <h2>Toàn bộ sản phẩm</h2>
          <Search
            placeholder="Tìm sản phẩm"
            style={{
              width: 500,
              marginTop: "20px",
              marginLeft: "20px",
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
          />
          <div className="list-product">
            <table className="list_product">
              <thead>
                <th>STT</th>
                <th>Ảnh sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng trong kho</th>
                <th>Giá</th>
                {/* <th>Mô tả</th> */}
                <th>Loại sản phẩm</th>
                <th>Hãng sản xuất</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
              </thead>
              <tbody>
                {visibleProducts &&
                  visibleProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={product.product_image} width={100} />
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.product_stocks}</td>
                      <td>{product.price.toLocaleString() + "₫"}</td>
                      {/* <td width={400}>{product.description}</td> */}
                      <td>{getCategoryName(product.categoryId)}</td>
                      <td>{getBrandName(product.brandId)}</td>
                      <td>{product.status}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleStatusProduct(product.product_id)
                          }
                          style={{
                            border: "none",
                            transform: isRotating ? "rotate(360deg)" : "none",
                            transition: "transform 1s",
                            backgroundColor: "transparent",
                          }}
                        >
                          <ChangeCircleIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={products.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAddProduct;
