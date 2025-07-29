import { Input } from "@/components/ui/input";
import {
  getSearchResults,
  resetSearchResult,
} from "@/redux/store/shop/search-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "@/redux/store/shop/cart-slice";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { fetchProductDetails } from "@/redux/store/shop/product-slice";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {

    let getCartItems = cartItems.items || [];

    if (getCartItems?.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(
            `Only ${getQuantity} quantity can be added for this product`
          );
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  };

    useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

      const handleGetProductDetails = (getCurrentProductId) => {
        dispatch(fetchProductDetails(getCurrentProductId));
      };
    

  useEffect(() => {
    if (keywords && keywords.trim() !== "" && keywords.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keywords=${keywords}`));
        dispatch(getSearchResults(keywords));
      }, 1000);
    } else {
      dispatch(resetSearchResult());
    }
  }, [keywords]);
  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keywords}
            name="keywords"
            onChange={(event) => setKeywords(event.target.value)}
            className="py-6"
            placeholder="Search Products.."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-3 font-extrabold">No result found</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default SearchProducts;
