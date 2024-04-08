import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000

app.get("/api/v1/healthCheck", (req, res) => {
    res.status(200).json({
        message: "Server is running........"
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
});