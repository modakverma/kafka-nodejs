const {kafka} = require('./client');
const express = require("express");
const router = express.Router();

router.post('/produce',async(req,res)=>{
const {name,loc} = req.body;
    const producer = kafka.producer();
    console.log('Connecting Producer...');
    await producer.connect();
    console.log("producer connected successfully...");

       await producer.send({
        topic: 'rider-updates',
        messages:[
            {
                partition: loc.toLowerCase() === "north"?0:1,
                key: 'location-update',
                value: JSON.stringify({
                    name:name,
                    loc:loc
                })
            }
        ]
    })
    res.status(200).send({
        messages:"successs"
    })
    // await producer.disconnect();
})
module.exports = router;