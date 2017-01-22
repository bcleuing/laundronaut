WasherCollection = new Mongo.Collection('washers');
SensorValueCollection = new Mongo.Collection('sensorValues');

Meteor.startup(() => {
    if (WasherCollection.find({}).count() === 0) {
        var data = JSON.parse(Assets.getText("dummyWashers.json"));
        data.forEach(function (item, index, array) {
            WasherCollection.insert(item);
        });
        console.log('Inserted Washers');
    }
});

Meteor.publish('allWashers', function () {
    return WasherCollection.find({}, {sort: {name: 1}});
});

Washer = {
    addNewWasher: function(profile) {
        WasherCollection.insert(profile);
    }
}
