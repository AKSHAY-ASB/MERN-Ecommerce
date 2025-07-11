import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";

const UserCartWrapper = ({ cartItems }) => {
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
        <Button className="w-full mt-6">Checkout</Button>
      </SheetHeader>
    </SheetContent>
  );
};

export default UserCartWrapper;
