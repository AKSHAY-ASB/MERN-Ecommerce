import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Airplay,
  AirVent,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heading,
  Image,
  Shirt,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/redux/store/shop/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/redux/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailDialog from "@/components/shopping-view/product-details";
import { getFeatureImageList } from "@/redux/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: Image },
  { id: "puma", label: "Puma", icon: Airplay },
  { id: "reebok", label: "Reebok", icon: Heading },
  { id: "hrx", label: "HRX", icon: AirVent },
];

const ShoppingHome = () => {
  // const slides = [banner1, banner2, banner3];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
   const { featureImageList } = useSelector((state) => state.commonFeature);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

   useEffect(() => {
      dispatch(getFeatureImageList());
    }, [dispatch]);

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

    useEffect(() => {
      if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);
  

  const handleAddToCart = (getCurrentProductId) => {
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
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList.map((slide, index) => (
          <img
            src={slide.image}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
        >
          <ChevronRightIcon className="w-6 h-6" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            shop by category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-5 gap-4 px-4">
          {categoriesWithIcon.map((item) => (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              key={item.id}
              onClick={() => handleNavigateToListingPage(item, "category")}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            shop by category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-5 gap-4 px-4">
          {brandWithIcon.map((item) => (
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow"
              key={item.id}
              onClick={() => handleNavigateToListingPage(item, "brand")}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 px-4">
            {productList && productList.length > 0
              ? productList.map((item) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    key={item.id}
                    product={item}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
