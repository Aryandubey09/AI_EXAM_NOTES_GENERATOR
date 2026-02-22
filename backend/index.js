import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from './utils/connectDb.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import notesRouter from './routes/generate.route.js';
import pdfRouter from './routes/pdf.route.js';
import creditRouter from './routes/credits.route.js';
import { stripeWebhook } from './controllers/credit.controller.js';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post(
    "api/credits/webhook",
    express.raw({type: "application/json"}),
    stripeWebhook
)
app.use(cors({
    origin: ["https://ai-exam-notes-client.onrender.com"],  
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));



app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit", creditRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDb();
});
