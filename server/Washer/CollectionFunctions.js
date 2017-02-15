WasherCollection = new Mongo.Collection('washers');
SensorValueCollection = new Mongo.Collection('sensorValues');
ReserveCollection = new Mongo.Collection('washerReserves');

Meteor.startup(() => {
    if (WasherCollection.find({}).count() === 0) {
        var data = JSON.parse(Assets.getText("dummyWashers.json"));
        data.forEach(function (item, index, array) {
            WasherCollection.insert(item);
        });
        console.log('Inserted Washers');
    }
    var brokerUrl = 'mqtt://broker.hivemq.com';

    var mqtt = require('mqtt');
    var client  = mqtt.connect(brokerUrl);

    client.on('connect', function () {
        client.subscribe('is439/group7/G1666112R');
        client.publish('is439/group7/G1666112R', 'Hello mqtt');
    });

    client.on('message', function (topic, message) {
        // var parsedMsg = JSON.parse(message);
        console.log(message.toString());
        /*
        SensorValueCollection.insert({
            "created_at": new Date(),
            "vibration_value": latestVibrationValue,
            "light_status": latestLightStatus,
            "washer_id": washerId
        });
        */
        // client.end();
    });

});

Meteor.publish('allWashers', function () {
    return WasherCollection.find({}, {sort: {name: 1}});
});

Washer = {
    addNewWasher: function(profile) {
        WasherCollection.insert(profile);
    }
}
