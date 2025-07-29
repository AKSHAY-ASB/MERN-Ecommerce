import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImageList,
} from "@/redux/store/common-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);


  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload.success) {
        dispatch(getFeatureImageList());
         toast("image uploaded successfully.");
        setImageFile(null);
        setUploadedImageUrl('');
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImageList());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        // isEditMode={currentEditedId !== null}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="w-full mt-5">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImageList && featureImageList.length > 0 ? 
          featureImageList.map((item)=><div>
           <div className="relative">
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
          </div>)
          : null
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
