import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/redux/store/shop/order-slice";
import { toast } from "sonner";

const ShoppingCheckout = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const cartTotalAmount =
    cartItems && cartItems.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.sakePrice > 0
              ? currentItem.salePrice
              : currentItem.salePrice) *
              currentItem.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {
    if (!cartItems.items || cartItems.items.length === 0) {
      toast("Your cart is empty. Please add items to proceed.");
      return;
    }

    if (currentSelectedAddress !== "") {
      toast("Please select one address to proceed.");
    }

    const orderData = {
      userId: user.id,
      cartId: cartItems?._id,
      cartItems: cartItems?.items?.map((singleCartItem) => ({
        productId: singleCartItem.productId,
        title: singleCartItem.title,
        image: singleCartItem.image,
        price:
          singleCartItem.salePrice > 0
            ? singleCartItem.salePrice
            : singleCartItem.price,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: cartTotalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      PayerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  };

  if (approvalURL && currentSelectedAddress !== null) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="account"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((items) => (
                <UserCartItemsContent cartItem={items} key={items.productId} />
              ))
            : null}
          <div className="space-x-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${cartTotalAmount}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart ? "Processing paypal payment..." :"Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
