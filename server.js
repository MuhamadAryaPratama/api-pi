import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import IncomingGoodsRoute from "./routes/IncomingGoodsRoute.js";
import OutgoingGoodsRoute from "./routes/OutgoingGoodsRoute.js";

dotenv.config();

const app = express();

// (async()=>{
//     await db.sync();
// })();

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(IncomingGoodsRoute);
app.use(OutgoingGoodsRoute);

// store.sync();

app.listen(5000, () => {
    console.log('Server up and running...');
});
