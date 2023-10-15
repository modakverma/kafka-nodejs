const {kafka} = require('./client')

async function init(){
    const admin = kafka.admin();
    console.log("Admin Connecting...");
    await admin.connect();
    console.log("Admin Connection Success...");
    console.log('creating topic [rider-updates]')
    await admin.createTopics({
       topics: [{
           topic: 'rider-updates',
           numPartitions: 2,
       }]
    })
    console.log("topic created success [rider-updates]");
    console.log("Disconnecting Admin...");
    await admin.disconnect();
}
init();