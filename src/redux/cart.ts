import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicAxios from "../configAxios/publicAxios";
import { notification } from "antd";
interface State {
  currentCart: any;
  loading: boolean;
  error: boolean;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    currentCart: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(renderCart.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(renderCart.fulfilled, (state: State, action) => {
        state.loading = false;
        state.currentCart = action.payload;
      });
  },
});

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ productId, userId }: { productId: number; userId: number }) => {
    try {
      const response = await publicAxios.post("/cart", {
        productId,
        userId,
      });
      if (response.status === 201) {
        notification.success({
          message: "Thêm vào giỏ hàng thành công",
          style: {
            top: 95,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const renderCart = createAsyncThunk("cart", async (userId: number) => {
  try {
    const response = await publicAxios.get(`cart/${userId}`);
    return response.data.cart;
  } catch (error) {
    console.log(error);
  }
});
export default cartSlice.reducer;
