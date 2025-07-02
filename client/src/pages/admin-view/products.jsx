import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AddProductFormElements } from "@/config";
import React, { useState } from "react";


const initialFormData = {
  image:"",
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salesPrice:"",
  totalStock:""
}

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);

  const [formData, setFormData]= useState(initialFormData);

  const onSubmit = () => {

  }

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 "></div>
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => {
            setOpenCreateProductDialog(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6 px-4">
                <CommonForm 
                  formControls={AddProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText="Add"
                  onSubmit={onSubmit}
                />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;
