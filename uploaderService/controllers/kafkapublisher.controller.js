import KafkaService from '../kafka/kafka.js';

export const sendMessageToKafka = async (req, res) => {
    console.log('got here in upload service');
    try{
        const message= req.body
        console.log("body : ", message);
        const kafkaService = new KafkaService();
        const msgs = [
            {
                key: "key1", 
                value: JSON.stringify(message)
            }
        ]

        const result = await kafkaService.produce("transcode", msgs)
        console.log("result of produce : ", result)
        res.status(200).json("message uploaded successfully")
    } catch (error) {
        console.error('Error producing', error);
        res.status(500).json("Error producing message")
    }
}

export const pushVideoForEncodingToKafka = async(title, url) => {
    try {
        const message = {
            "title": title,
            "url": url
        }
        console.log("body : ", message)
        const kafkaconfig = new KafkaConfig()
        const msgs = [
            {
                key: "video",
                value: JSON.stringify(message)
            }
        ]
        const result = await kafkaconfig.produce("transcode", msgs)
        console.log("result of produce : ", result)
        res.status(200).json("message uploaded successfully")
 
    } catch (error) {
        console.log(error)
    }
}

