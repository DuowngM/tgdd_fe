import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import { notification } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import publicAxios from "../../../configAxios/publicAxios";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
// import { useNavigate } from "react-router-dom";
import moment from "moment";
import privateAxios from "../../../configAxios/pritvateAxios";
const AdminOrder = () => {
  // const flaguserJSON = localStorage.getItem("flaguser");
  // const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (flaguser?.roles != 1) {
  //     navigate("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [flaguser]);
  interface Order {
    order_id: number;
    customerId: number;
    total: number;
    note: string;
    createdDate: string;
    status: string;
    method: string;
    user_name: string;
    phoneNumber: number;
  }

  const [order, setOrder] = useState<Order[]>([]);
  const loadOrder = async () => {
    const response = await publicAxios.get("order");
    console.log(response);

    setOrder(response.data.order);
  };
  useEffect(() => {
    loadOrder();
  }, []);
  interface OrderDetails {
    order_id: number;
    quantity: number;
    address: string;
    product_image: string;
    product_name: string;
    price: number;
    total: number;
  }
  const [show, setShow] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);
  const handleClose = () => {
    setShow(false);
    setSelectedOrderId(null);
  };

  const handleShow = () => setShow(true);
  const handleViewOrder = async (orderId: number) => {
    handleShow();
    setSelectedOrderId(orderId);
    const response = await privateAxios.get(`order-details/${orderId}`);
    if (response.data.status === 200) {
      setOrderDetails(response.data.orderDetails);
    }
  };

  const handleComplete = async (orderId: number) => {
    const response = await privateAxios.put(`order/${orderId}`);
    if (response.status === 200) {
      notification.success({
        message: "Cập nhật trạng thái thành công",
        style: {
          top: 95,
        },
      });
      loadOrder();
    }
  };
  const handleCancel = async (orderId: number) => {
    const response = await publicAxios.patch(`order/${orderId}`);
    if (response.status === 200) {
      notification.success({
        message: "Cập nhật trạng thái thành công",
        style: {
          top: 95,
        },
      });
      loadOrder();
    }
  };
  const handleDeleteProduct = async (orderId: number) => {
    const response = await publicAxios.delete(`order/${orderId}`);
    if (response.status === 200) {
      notification.success({
        message: "Xóa đơn thành công",
        style: {
          top: 95,
        },
      });
      loadOrder();
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1" style={{ paddingTop: "30px" }}>
          <h2>Quản lí đơn hàng</h2>
          <div className="list-product">
            <table className="order-user">
              <thead>
                <th>STT</th>
                <th>Số điện thoại</th>
                <th>Tổng tiền</th>
                <th>Tên người mua</th>
                <th>Ngày mua</th>
                <th>Trạng thái</th>
                <th>Phương thức</th>
                <th>Xem</th>
                <th colSpan={3}>Chức năng</th>
              </thead>
              <tbody>
                {order?.map((order, index) => (
                  <>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.phoneNumber}</td>
                      <td>{order.total.toLocaleString() + "₫"}</td>
                      <td>{order.user_name}</td>
                      <td>
                        {moment(order.createdDate).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </td>
                      <td>{order.status}</td>
                      <td>{order.method}</td>
                      <td>
                        <button
                          className="btn-view"
                          onClick={() => handleViewOrder(order.order_id)}
                        >
                          Chi tiết
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleComplete(order.order_id)}
                          className="btn-order"
                          disabled={order.status === "Hoàn thành"}
                        >
                          Hoàn thành
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleCancel(order.order_id)}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                          disabled={order.status === "Đã hủy"}
                        >
                          <CancelIcon />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProduct(order.order_id)}
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <Modal show={show && selectedOrderId !== null} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <table className="order-details">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                      <th>Địa chỉ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.map((orderDetail, index) => (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{orderDetail.product_name}</td>
                          <td>
                            <img src={orderDetail.product_image} width={100} />
                          </td>
                          <td>{orderDetail.price.toLocaleString() + "₫"}</td>
                          <td>{orderDetail.quantity}</td>
                          <td>
                            {(
                              orderDetail.price * orderDetail.quantity
                            ).toLocaleString() + "₫"}
                          </td>
                          <td>{orderDetail.address}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
