import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTitle } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByAdmin,
  getOrderDetailsForAdmin,
  resetAdminOrderDetails,
} from "@/redux/store/admin/order-slice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrderByAdmin());
  }, [dispatch]);

  const handleGetOrderDetails = (getID) => {
    dispatch(getOrderDetailsForAdmin(getID));
  };

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-2 ${
                          item?.orderStatus === "confirmed"
                            ? "bg-green-400"
                            : item?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetAdminOrderDetails());
                        }}
                      >
                        {" "}
                        <DialogTitle>
                          <Button
                            onClick={() => handleGetOrderDetails(item?._id)}
                          >
                            View Details
                          </Button>
                        </DialogTitle>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
