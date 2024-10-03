import express from "express";
import uploadRouter from "./routes/uploadRouter.js";
import cors from "cors";
import kafkaPublisher from "./routes/kafkaPublisher.js";

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/publish', kafkaPublisher);
app.use('/api/upload', uploadRouter);

app.get('/', (req, res) => {
  res.send('HHLD youtube service is running');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});