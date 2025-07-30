import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    featureImageList:[]
}



export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,{image}
    );
    return result?.data;
  }
);

export const getFeatureImageList = createAsyncThunk(
  "/order/getFeatureImageList",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );
    return result?.data;
  }
);


const commonSlice = createSlice({
    name:"commonSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(addFeatureImage.pending, (state)=>{
            state.isLoading= true
        }).addCase(addFeatureImage.fulfilled, (state,action)=>{
            state.isLoading= false,
            state.featureImageList = action.payload.data;
        }).addCase(addFeatureImage.rejected, state=>{
            state.isLoading= true,
             state.featureImageList = []
        })
         builder.addCase(getFeatureImageList.pending, (state)=>{
            state.isLoading= true
        }).addCase(getFeatureImageList.fulfilled, (state,action)=>{
            state.isLoading= false,
            state.featureImageList = action.payload.data;
        }).addCase(getFeatureImageList.rejected, state=>{
            state.isLoading= true,
             state.featureImageList = []
        })
    }
});

export default commonSlice.reducer
