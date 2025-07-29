import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/shopping-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/redux/store/shop/product-slice";
import ShoppingProductTile from "../../components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/redux/store/shop/cart-slice";
import { toast } from "sonner";

const ShoppingListing = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySearchParams = searchParams.get("category");
  //fetch all products
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { cartItems } = useSelector((state) => state.shopCart);

  const { user } = useSelector((state) => state.auth);

  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");

        queryParams.push(`${key} = ${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  };

  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filter, sortParams: sort })
      );
  }, [dispatch, sort, filter]);

  useEffect(() => {
    setSort("priceLowToHigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, setSearchParams]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilters = { ...filter };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection == -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        copyFilters[getSectionId].push(getCurrentOption);
      else copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilter(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId,getTotalStock) => {

    let getCartItems = cartItems.items || [];

    if(getCartItems?.length){
      const indexOfCurrentItem = getCartItems.findIndex(item=>item.productId === getCurrentProductId);
      if(indexOfCurrentItem >-1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > getTotalStock){
            toast.error(`Only ${getQuantity} quantity can be added for this product`);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="w-full bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{productList?.length}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
          {productList && productList?.length > 0
            ? productList.map((items) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={items}
                  key={items?._id}
                  handleAddToCart={handleAddToCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingListing;
