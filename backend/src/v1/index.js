import "dotenv/config";
import express from 'express';
import Db from './configs/Db/index.js';
import authRoute from "./routes/auth.routes.js";
import categoryRoute from "./routes/category.routes.js";
import cors from "cors";
import productRoute from "./routes/product.routes.js";
import cartRoute from "./routes/cart.routes.js";
import orderRoute from "./routes/order.routes.js";
import userRoute from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandle.js"
import shippingAddressRoute from "./routes/shippingAddress.routes.js";

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors({ origin: '*' }))

// Routes 
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/products", productRoute)
app.use("/api/v1/cart", cartRoute)
app.use("/api/v1/orders", orderRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/shipping-address", shippingAddressRoute)
app.use(errorHandler);

app.get("/api/v1/healthCheck", (req, res) => {
    res.status(200).json({
        message: "Server is running........"
    })
})

Db.connect()

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});