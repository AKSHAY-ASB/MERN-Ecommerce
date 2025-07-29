import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./auth-slice"
import AdminProductsSlice from './admin/products-slice';
import AdminOrderSlice from './admin/order-slice';

import ShopProductSlice from './shop/product-slice';
import shopCartSlice from './shop/cart-slice';
import addressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice'
import shopSearchSlice from './shop/search-slice'
import reviewSlice from './shop/review-slice'
import commonFeatureSlice from "./common-slice"

const store = configureStore({
    reducer:{
        auth : authReducer,
        adminProducts:AdminProductsSlice,
        adminOrder:AdminOrderSlice,
        shopProducts:ShopProductSlice,
        shopCart:shopCartSlice,
        shopAddress:addressSlice,
        shopOrder:shopOrderSlice,
        shopSearch:shopSearchSlice,
        shopReview:reviewSlice,
        commonFeature:commonFeatureSlice
    }
});

export default store