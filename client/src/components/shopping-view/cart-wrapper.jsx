import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet, setIsOpenSidebar }) => {
  const navigate = useNavigate();

  const cartTotalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.sakePrice > 0
              ? currentItem.salePrice
              : currentItem.salePrice) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <div className="space-x-4">
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item) => (
              <UserCartItemsContent cartItem={item} key={item.id} />
            ))}
        </div>
        <div className="space-x-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${cartTotalAmount}</span>
          </div>
        </div>
      </SheetHeader>
      <Button
        className="w-full mt-6"
        onClick={() => {
          cartItems && cartItems.length > 0 && navigate("/shop/checkout");
          setOpenCartSheet(false);
          setIsOpenSidebar(false);
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
