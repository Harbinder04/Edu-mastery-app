import { Kafka } from 'kafkajs';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class KafkaService {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKERS],
            ssl: {
                rejectUnauthorized: false,
                ca: [fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')],
                key: fs.readFileSync(path.resolve('./service.key'), 'utf-8'),
                cert: fs.readFileSync(path.resolve('./service.cert'), 'utf-8')
            },
            sasl: {
                mechanism: process.env.KAFKA_SASL_MECHANISM,
                username: process.env.KAFKA_SASL_USERNAME,
                password: process.env.KAFKA_SASL_PASSWORD
            }
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: process.env.KAFKA_CONSUMER_GROUP_ID });
    }

    async produce(topic, messages) {
        try {
            const result = await this.producer.connect();
            console.log('Producer connected', result);
            await this.producer.send({
                topic,
                messages
            });
        } catch (error) {
            console.error('Error producing', error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, fromBeginning = false) {
        try {
            await this.consumer.connect();
            console.log('Consumer connected');
            await this.consumer.subscribe({ topic, fromBeginning });
            await this.consumer.run({
                eachMessage: async result => {
                    console.log(`RVD message ${result.message.value.toString()}`);
                }
            });
        } catch (error) {
            console.error('Error consuming', error);
        }
    }
}

export default KafkaService;