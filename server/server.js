
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const filteredProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");

// mongoose.connect("mongodb+srv://akshay28seti:akshay28seti2025@cluster0.fsaj91l.mongodb.net/")
mongoose.connect("mongodb://localhost:27017/")
        .then(() => console.log("MongoDB connected successfully...."))
        .catch((error) => console.log(error));

const app = express();

const PORT = process.env.PORT || 5000 ;

app.use(
    cors({
        origin:"http://localhost:5173",
        methods:["GET", "POST", "DELETE", "PUT"],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop/products",filteredProductsRouter);
app.use("/api/shop/cart",shopCartRouter)



app.listen(PORT, ()=>console.log(`Server is now running on port : ${PORT}`));