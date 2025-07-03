import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/redux/store/admin/products-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "./product-tile";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const dispatch = useDispatch();
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prev) => ({
        ...prev,
        image: uploadedImageUrl,
      }));
    }
  }, [uploadedImageUrl]);

  const { productList } = useSelector((state) => state?.adminProducts);

  const onSubmit = (event) => {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Products Added Successfully.");
          }
        });
  };

  function handleDeleteProduct(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
     if(data?.payload?.success){
        dispatch(fetchAllProducts());
         toast.success(data?.payload?.message);
     }
    })
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="mb-5 w-full  justify-end">
        <Button
          className="mb-5 flex justify-end ml-auto"
          onClick={() => setOpenCreateProductDialog(true)}
        >
          Add New Product
        </Button>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {productList && productList.length > 0
            ? productList.map((items) => (
                <AdminProductTile
                  key={items._id}
                  setOpenCreateProductDialog={setOpenCreateProductDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={items}
                  setFormData={setFormData}
                  handleDeleteProduct={handleDeleteProduct}
                />
              ))
            : null}
        </div>
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => {
            setOpenCreateProductDialog(false);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>
                {currentEditedId !== null ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                setImageLoadingState={setImageLoadingState}
                imageLoadingState={imageLoadingState}
                isEditMode={currentEditedId !== null}
              />
            </div>

            <div className="px-4">
              <CommonForm
                formControls={AddProductFormElements}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Update" : "Add"}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdminProducts;
