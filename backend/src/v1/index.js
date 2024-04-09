import "dotenv/config";
import express from 'express';
import Db from './configs/Db/index.js';
import authRoute from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/api/v1/auth", authRoute)

app.get("/api/v1/healthCheck", (req, res) => {
    res.status(200).json({
        message: "Server is running........"
    })
})

Db.connect()

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});