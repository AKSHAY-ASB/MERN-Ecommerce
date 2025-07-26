import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrderByAdmin = createAsyncThunk(
  "/order/getAllOrderByAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/get/`
    );
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

export const updateOrderStatusAdmin = createAsyncThunk(
  "/order/updateOrderStatusAdmin",
  async ({id,orderStatus}) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/orders/update/${id}`,{orderStatus}
    );
    return response.data;
  }
);

const initialState = {
  orderList: [],
  orderDetails: null,
};

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
        resetAdminOrderDetails :(state) => {
        state.orderDetails= null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrderByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderByAdmin.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderList = action.payload.data);
      })
      .addCase(getAllOrderByAdmin.rejected, (state) => {
        (state.isLoading = false), (state.orderList = []);
      })

      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        (state.isLoading = false), (state.orderDetails = action.payload.data);
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        (state.isLoading = false), (state.orderDetails = null);
      })

      //   .addCase(updateOrderStatusAdmin.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(updateOrderStatusAdmin.fulfilled, (state, action) => {
      //   console.log(action,"action");
      //   (state.isLoading = false), (state.orderDetails = action.payload.data);
      // })
      // .addCase(updateOrderStatusAdmin.rejected, (state) => {
      //   (state.isLoading = false), (state.orderDetails = null);
      // });
  },
});

export const {resetAdminOrderDetails} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
