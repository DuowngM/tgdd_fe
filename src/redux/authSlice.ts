import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { notification } from "antd";
interface State {
  currentUser: string;
  loading: boolean;
  error: boolean;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "",
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerRedux.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(registerRedux.fulfilled, (state: State, action) => {
        state.loading = false;
        if (action.payload === "") {
          state.currentUser = "";
        } else {
          state.currentUser = action.payload;
        }
      });
  },
});
export const registerRedux = createAsyncThunk(
  "auth/register",
  async ({
    phoneNumber,
    password,
  }: {
    phoneNumber: string;
    password: string;
  }) => {
    if (phoneNumber === "" || password === "") {
      notification.error({
        message: "Số điện thoại hoặc mật khẩu không được để trống",
        style: {
          top: 95,
        },
      });
      return "error";
    }
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        phoneNumber,
        password,
      });
      if (response.status === 201) {
        notification.success({
          message: "Đăng ký thành công",
          style: {
            top: 95,
          },
        });
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        notification.error({
          message: "Số điện thoại đã được đăng ký",
          style: {
            top: 95,
          },
        });
      }
    }
    return "";
  }
);
export default authSlice.reducer;
