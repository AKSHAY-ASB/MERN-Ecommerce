import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
// time 09:22
const Address = () => {
  const initialAddressFormData = {
    address: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialAddressFormData);

  const handleManageAddress = (e) => {
    e.preventDefault();
    console.log(formData);
  };    

  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          formControls={addressFormControls}
          buttonText={"Add Address"}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
