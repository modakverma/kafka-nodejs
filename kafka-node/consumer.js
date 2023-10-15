const express = require("express");
const { Kafka } = require('kafkajs'); 
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

let latestMessage = '';
async function init() {
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092']
    });
    
    const consumer = kafka.consumer({ groupId: 'group-1' });

    await consumer.connect();
    await consumer.subscribe({
        topic: "rider-updates",
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`[${topic}]: PART:${partition}:`, message.value.toString());
            latestMessage = message.value.toString(); 
        }
    });
}

const produceRoute = require('./producer'); 
app.use('/api', produceRoute);

app.get('/', (req, res) => {
    res.status(200).send(latestMessage);
});

app.listen(4000, () => {
    console.log(`Express app is listening on port 4000`);
    init();
});
