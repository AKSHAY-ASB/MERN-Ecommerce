import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReviews = createAsyncThunk(
  "/order/addReviews",
  async (formData) => {
    const result = await axios.post(`http://localhost:5000/api/shop/review/add`, 
     formData
    );
    return result?.data;
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`
    );
    return result?.data;
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state)=>{
        state.isLoading= true
    }).addCase(getReviews.fulfilled, (state,action)=>{
        state.isLoading= false,
        state.reviews = action.payload.data
    }).addCase(getReviews.rejected, (state)=>{
        state.isLoading= false,
        state.reviews = [];
    })
  },
});

export default reviewSlice.reducer;
