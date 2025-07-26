const Order = require("../../models/Order");

const getAllOrderByAllUserForAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Orders not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Orders not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Order Not Found",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;

    const order = await Order.findById(id);

      if (!order) {
      return res.status(404).json({
        success: false,
        message: "Orders not found",
      });
    }

    const result = await Order.findByIdAndUpdate(id,{orderStatus});
    console.log("result",result);

    res.status(200).json({
        success:true,
        message:"Order status updated successfully"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Order Not Found",
    });
  }
};

module.exports = { getAllOrderByAllUserForAdmin, getOrderDetailsForAdmin ,updateOrderStatus};
