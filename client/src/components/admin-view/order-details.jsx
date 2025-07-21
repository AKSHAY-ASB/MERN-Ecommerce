import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";

const AdminOrderDetailsView = () => {

    const initialFormData = {
     status:""
    };

    const handleUpdateStatus = (e) => {
        e.preventDefault();
    };  

    const [formData, setFormData] = React.useState(initialFormData);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>12345</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>22/07/2025</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$42000</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <p>Product Name</p>
                  <p>$100</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Information</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Aksha Buchade</span>
                <span>2495 D Ward shukrawar peth, kesapur galli, kolhapur</span>
                <span>Maharashtra</span>
                <span>416002</span>
                <sapn>8989898989</sapn>
                <span>notes</span>
              </div>
            </div>
          </div>

          <div>
            <CommonForm
              formControls={[{
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "pending" },
                  { id: "inprocess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              }]}
              formData={formData}
              setFormData={setFormData}
              buttonText={'Update Order Status'}
              onSubmit={() => {handleUpdateStatus }}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
