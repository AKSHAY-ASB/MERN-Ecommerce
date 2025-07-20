import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "addresses/addNewAddress",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/address/add",
        data
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "addresses/fetchAddress",

  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/address/get/${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editAddress = createAsyncThunk(
  "addresses/editAddress",
  async ({ userId, addressId, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/shop/address/update/${userId}/${addressId}`,
         data 
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async ({ userId, addressId }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/shop/address/delete/${userId}/${addressId}`,
        
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(addNewAddress.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });

    builder.addCase(fetchAddress.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload.data;
    });
    builder.addCase(fetchAddress.rejected, (state) => {
      state.isLoading = false;
      state.addressList = [];
    });
    
  },
});

export default addressSlice.reducer;
