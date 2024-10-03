import express from 'express';
import cors from 'cors';
// import dotenv from 'dotenv';
import KafkaService from '../uploaderService/kafka/kafka';
import convertToHLS from './hls/transocode.js';
import s3ToS3 from './hls/s3Tos3.js';

// dotenv.config();
const PORT = 8081;
const app = express();
cosn
app.use(cors({
    allowedHeaders: ["*"],
    origin: "*",
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Transcoding service is running');
});

app.get('/transcode', async (req, res) => {
    s3ToS3();
    res.send('Transcoding started');
});

const kafkaService = new KafkaService();
kafkaService.consume('transcode', (value) => {
    console.log("Got data from kafka : ", value)
});

app.listen(PORT, () => {
    console.log(`Transcoding service is running on port ${PORT}`);
});