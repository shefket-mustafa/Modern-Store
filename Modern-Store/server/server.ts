import dotenv from 'dotenv';
import express  from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoutes';
import { adminRoutes } from './routes/adminRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter)
app.use("/admin", adminRoutes)

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("API is running...")
});

mongoose.connect(MONGO_URI as string)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
}) 


