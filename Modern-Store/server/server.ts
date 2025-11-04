import dotenv from 'dotenv';
import express  from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
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


