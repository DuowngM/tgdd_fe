import axios from "axios";
import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import { notification } from "antd";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// import { useNavigate } from "react-router-dom";
const AdminAddProduct = () => {
  // const flaguserJSON = localStorage.getItem("flaguser");
  // useEffect(() => {
  //   if (flaguser?.roles != 1) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flaguser]);
  interface CategoryList {
    category_id: number;
    category_name: string;
  }
  interface BrandList {
    brand_id: number;
    brand_name: string;
    category_id: number;
  }
  interface Product {
    product_name: string;
    product_stocks: number;
    price: number;
    categoryId: number;
    description: string;
    brandId: number;
  }
  const [newProduct, setNewProduct] = useState<Product>({
    product_name: "",
    product_stocks: 0,
    price: 0,
    categoryId: 0,
    description: "",
    brandId: 0,
  });

  const handleOnChange = (e: React.ChangeEvent<unknown>) => {
    const target = e.target as HTMLInputElement;
    setNewProduct({ ...newProduct, [target.name]: target.value });
  };
  const { product_name, product_stocks, price, description } = newProduct;
  // const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState<CategoryList[] | null>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [brand, setBrand] = useState<BrandList[] | null>([]);
  const [newId, setNewId] = useState<number>(0);
  console.log(newId);

  const [mainImage, setMainImage] = useState("");
  console.log(mainImage);
  
  const loadCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data.allCategory);
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const handleSelectCategory = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(+e.target.value);
    const response = await axios.get(
      `http://localhost:8000/brand/${e.target.value}`
    );
    setBrand(response.data.findBrand);
  };

  const handleSelectBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(+e.target.value);
  };

  const handleAddProducts = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedMedia);
      formData.append("upload_preset", "thegioididong");
      const [uploadMedia] = await Promise.all([
        axios.post(
          "https://api.cloudinary.com/v1_1/dgbl6qitv/image/upload",
          formData
        ),
      ]);
      const media = uploadMedia.data.secure_url;

      if (selectedMedia) {
        const infoNewProduct = {
          ...newProduct,
          categoryId: selectedCategory,
          brandId: selectedBrand,
          product_image: media,
          price: +price,
          product_stocks: +product_stocks,
        };
        const response = await axios.post(
          "http://localhost:8000/products",
          infoNewProduct
        );
        if (response.status === 201) {
          notification.success({
            message: "Thêm sản phẩm thành công",
            style: {
              top: 95,
            },
          });
          setPreviewSrc("");
          setMainImage("");
          setNewProduct({
            product_name: "",
            product_stocks: 0,
            price: 0,
            categoryId: 0,
            description: "",
            brandId: 0,
          });
          setNewId(response.data.newProduct[0].product_id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files && files.length > 0) {
  //     const fileArray = Array.from(files);
  //     setImages([...images, ...fileArray]);
  //   }
  // };
  const [selectedMedia, setSelectedMedia] = useState("");
  const [preview, setPreviewSrc] = useState("");
  const handleAddMedia = (event: any) => {
    setSelectedMedia(event.target.files[0]);
    // xem trước media
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event: any) {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1" style={{ paddingTop: "30px" }}>
          <h2>Thêm sản phẩm</h2>
          <table className="table">
            <tbody>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Hình ảnh
                </td>
                <td>
                  <div>
                    <label htmlFor="uploadMedia">
                      <p>
                        <AddAPhotoIcon />
                      </p>
                      <p>Add Photo/Video</p>
                    </label>
                    <input
                      type="file"
                      name="uploadMedia"
                      id="uploadMedia"
                      style={{ display: "none" }}
                      onChange={handleAddMedia}
                    />
                  </div>
                  {preview ? (
                    <div>
                      <img src={preview} width={100} />
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              {/* <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Hình ảnh chi tiet:
                </td>
                <td className="label1">
                  <input
                    type="file"
                    style={{ border: "none", paddingTop: 10 }}
                    multiple
                    onChange={handleImageChange}
                  />
                </td>
              </tr> */}
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Tên sản phẩm:
                </td>
                <td className="label1">
                  <input
                    type="text"
                    placeholder="Nhập vào"
                    className="infoProduct"
                    name="product_name"
                    value={product_name}
                    onChange={(e) => handleOnChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Ngành hàng:
                </td>
                <td className="label1">
                  <select
                    className="label3"
                    onChange={(e) => handleSelectCategory(e)}
                  >
                    <option>Chọn ngành hàng</option>
                    {category?.map((category, index) => (
                      <option key={index} value={category?.category_id}>
                        {category?.category_name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Hãng:
                </td>
                <td className="label1">
                  <select
                    className="label3"
                    onChange={(e) => handleSelectBrand(e)}
                  >
                    <option>Chọn hãng</option>
                    {brand?.map((brand, index) => (
                      <option key={index} value={brand.brand_id}>
                        {brand.brand_name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Mô tả sản phẩm:
                </td>
                <td className="label1">
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => handleOnChange(e)}
                    cols={66}
                    rows={8}
                    style={{ resize: "none" }}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Số lượng:
                </td>
                <td className="label1">
                  <input
                    type="number"
                    placeholder="Nhập số lượng"
                    className="infoProduct"
                    name="product_stocks"
                    value={product_stocks}
                    onChange={(e) => handleOnChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label" style={{ textAlign: "right" }}>
                  Giá sản phẩm:
                </td>
                <td className="label1">
                  <input
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    className="infoProduct"
                    name="price"
                    value={price}
                    onChange={(e) => handleOnChange(e)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label"></td>
                <td className="label1">
                  <button onClick={() => handleAddProducts()}>Thêm</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
