import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth-slice"
import AdminProductsSlice from './admin/products-slice';
import ShopProductSlice from './shop/product-slice';
import shopCartSlice from './shop/cart-slice';

const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts:AdminProductsSlice,
        shopProducts:ShopProductSlice,
        shopCart:shopCartSlice
    }
});

export default store