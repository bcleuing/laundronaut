SyncedCron.add({
    // // getting sensor values from washers peridically
    name: 'Fetch Sensor Values of Washers',
    schedule: function(parser) {
        return parser.text('every 50 seconds');
    },
    job: function() {
        var washers = WasherCollection.find({}).fetch();
        for (var i = 0; i < washers.length; i++) {
            var channel = washers[i].backend_channel;
            if (channel != '') {
                var washerId = washers[i]._id;
                var response = getLatestSensorValue(channel);

                if (response != null) {
                    var latestRecord = response.data;
                    var limit = 10;
                    var lastTenRecords = SensorValueCollection.find({washer_id: washerId}, {sort: {create_at: -1}, limit: limit}).fetch();
                    limit = lastTenRecords.length;

                    var lastRecordDate = (limit == 0) ? new Date(1) : lastTenRecords[limit-1].created_at;
                    var lastestRecordDate = new Date(latestRecord.created_at);
                    var latestVibrationValue = latestRecord.field1; // numeric value
                    var latestLightStatus = latestRecord.field2; // on or off

                    var washerCurrentStatus = "in-use"; // assume the washer is being used

                    if (lastRecordDate.getTime() != lastestRecordDate.getTime()) {
                        // check if the retrieved record is the same as the latest one in the database
                        if (latestVibrationValue == 0) {
                            // the washer is not vibrating
                            var notVibratingFor = 0;
                            for (var j = limit - 1; j >= 0; j--) {
                                // check how long the washer has not vibrated
                                console.log(lastTenRecords[j].vibration_value);
                                if (lastTenRecords[j].vibration_value == 0) notVibratingFor++;
                                else break;
                            }
                            console.log("notVibratingFor: " + notVibratingFor);
                            if (notVibratingFor >= 6) {
                                // assume that arduino post data to server every 30 seconds, the washer stops vibration for at least 3 minutes
                                var msg = 'This is to remind you that the washing process has been finished, please go to take back your clothes. Thank you!';
                                var response = sendMessageReminder('%2B6594214150', msg); // remind the previous user to take the clothes (hard-coded)
                                console.log(response);
                                if (latestLightStatus == 0) { // the light is OFF
                                    var offFor = 0;
                                    for (var k = limit - 1; k >= 0; k--) {
                                        if (lastTenRecords[k].light_status == 0) offFor++;
                                        else break;
                                    }
                                    if (offFor >= 6 || lastTenRecords[k].light_status == null) {
                                        // the status light of the washer has been off for at least 3 minutes
                                        washerCurrentStatus = "available";
                                    }
                                }
                            }
                        }
                        SensorValueCollection.insert({
                            "created_at": lastestRecordDate,
                            "vibration_value": latestVibrationValue,
                            "light_status": latestLightStatus,
                            "washer_id": washerId
                        });
                    } else washerCurrentStatus = "unknown";

                    WasherCollection.update({_id: washerId}, {$set: {status: washerCurrentStatus}}); // update the current status of the washer

                }
            }
        }
    }
});

getLatestSensorValue = function (channel) {
    // https://api.thingspeak.com/channels/216779/fields/1/last.json
    var result = {};
    var url = "https://api.thingspeak.com/channels/" + channel + "/feeds/last.json";
    try {
        result = Meteor.http.call("GET", url);
    } catch (err) {
        console.log(err.response);
        result = null;
    }
    return result;
};

sendMessageReminder = function (phoneNum, msg) {
    var apiKey = "GLBIHISAKS8EJEJL";
    var url = "https://api.thingspeak.com/apps/thinghttp/send_request?api_key=" + apiKey;
    var data = {
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        params: {
            api_key: apiKey,
            number: phoneNum,
            message: msg
        }
    };
    try {
        result = Meteor.http.call("POST", url, data);
    } catch (err) {
        console.log(err.response);
        result = null;
    }
    return result;
}
