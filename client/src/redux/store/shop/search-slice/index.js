import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    searchResults:[]
}



export const getSearchResults = createAsyncThunk(
  "/order/getSearchResults",
  async (keywords) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/search/${keywords}`,
    );
    return result?.data;
  }
);


const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers:{  
      resetSearchResult:(state)=>{
        state.searchResults = [];
      } 
    },
    extraReducers:(builder) => {
        builder.addCase(getSearchResults.pending, (state)=>{
            state.isLoading= true
        }).addCase(getSearchResults.fulfilled, (state,action)=>{
            state.isLoading= false,
            state.searchResults = action.payload.data;
        }).addCase(getSearchResults.rejected, state=>{
            state.isLoading= true,
             state.searchResults = []
        })
    }
});


export const {resetSearchResult} = searchSlice.actions

export default searchSlice.reducer
