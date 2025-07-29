import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/redux/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/redux/store/shop/product-slice";
import { Label } from "../ui/label";
import StartRatingComponents from "../common/star-rating";
import { addReviews, getReviews } from "@/redux/store/shop/review-slice";

const ProductDetailDialog = ({ open, setOpen, productDetails }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (productDetails !== "") dispatch(getReviews(productDetails?._id));
  }, [dispatch, productDetails]);

     const averageReviews = reviews && reviews.length > 0 ? 
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      reviews.length : 0;

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddReview = () => {
    dispatch(
      addReviews({
        productId: productDetails?._id,
        userId: user.id,
        userName: user.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg('');
        dispatch(getReviews(productDetails?._id));
        toast("Review added successfully.");
      }
    });
  };

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

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:[max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground ">
                ${productDetails?.salePrice}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
            <StartRatingComponents rating={averageReviews} />
            </div>
            <span className="text-muted-foreground">{averageReviews.toFixed(2)}</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full cursor-not-allowed opacity-60">
                Out of stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((item) => (
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>{item.userName[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{item.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                         <StartRatingComponents rating={item.reviewValue}/>
                        </div>
                        <p className="text-muted-foreground">
                          {item.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No Reviews</h1>
                )}
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a Review</Label>
              <div className="flex gap-1">
                <StartRatingComponents
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review...."
              />
              <Button
                disabled={reviewMsg.trim() === ""}
                onClick={handleAddReview}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
