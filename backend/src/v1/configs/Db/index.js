import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
        console.log("Connect successfully !")
    } catch (error) {
        console.log("Connection error" + error)
        process.exit(1);
    }
}

export default { connect }
