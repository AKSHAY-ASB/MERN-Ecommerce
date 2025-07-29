import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "@/redux/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "sonner";

const Address = ({setCurrentSelectedAddress,selectedId}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const initialAddressFormData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditAddress, setCurrentEditAddress] = useState(null);

  const handleManageAddress = (e) => {
    e.preventDefault();

    if(addressList.length >= 3 && currentEditAddress === null) {
      setFormData(initialAddressFormData);
      toast.error("You can add only 3 addresses")
      return;
    } 

    currentEditAddress !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditAddress,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setCurrentEditAddress(null);
            setFormData(initialAddressFormData);
            toast.success(data?.payload?.message);
          }
        })
      : dispatch(addNewAddress({ ...formData, userId: user?.id })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAddress(user?.id));
              setFormData(initialAddressFormData);
               toast.success(data?.payload?.message);
            }
          }
        );
  };

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditAddress(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      pincode: getCurrentAddress.pincode,
      phone: getCurrentAddress.phone,
      notes: getCurrentAddress.notes,
    });
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => {
        const value = formData[key];
        return typeof value === "string"
          ? value.trim() !== ""
          : value !== undefined && value !== null;
      })
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch, user?.id]);

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast.success(data?.payload?.message);
      }
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length
          ? addressList.map((item) => (
              <AddressCard
                AddressInfo={item}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
                key={item._id}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                selectedId={selectedId}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditAddress ? "Update Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          formControls={addressFormControls}
          buttonText={currentEditAddress ? "Update Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
