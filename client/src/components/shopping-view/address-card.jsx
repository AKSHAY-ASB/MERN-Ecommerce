import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({ AddressInfo,handleDeleteAddress,handleEditAddress }) => {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label>Address :{AddressInfo?.address}</Label>
        <Label>City :{AddressInfo?.city}</Label>
        <Label>Pincode :{AddressInfo?.pincode}</Label>
        <Label>Phone :{AddressInfo?.phone}</Label>
        <Label>Notes :{AddressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={()=>handleEditAddress(AddressInfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(AddressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
