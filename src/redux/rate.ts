import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicAxios from "../configAxios/publicAxios";
import { notification } from "antd";
interface State {
  currentRate: any;
  loading: boolean;
  error: boolean;
}
const rateSlice = createSlice({
  name: "rate",
  initialState: {
    currentRate: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(renderRate.pending, (state: State) => {
        state.loading = true;
      })
      .addCase(renderRate.fulfilled, (state: State, action) => {
        state.loading = false;
        state.currentRate = action.payload;
      });
  },
});
export const ratings = createAsyncThunk(
  "handleRate",
  async ({
    pro_id,
    rate,
    comment,
    userId,
  }: {
    pro_id: number;
    rate: number;
    comment: string;
    userId: number;
  }) => {
    try {
      const response = await publicAxios.post("rate", {
        pro_id,
        rate,
        comment,
        userId,
      });
      if (response.status === 201) {
        notification.success({
          message: "Đánh giá thành công",
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
export const renderRate = createAsyncThunk("rate", async (pro_id: number) => {
  try {
    const response = await publicAxios.get(`rate/${pro_id}`);
    return response.data.rate;
  } catch (error) {
    console.log(error);
  }
});
export default rateSlice.reducer;
