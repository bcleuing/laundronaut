HostelCollection = new Mongo.Collection('hostels');

Meteor.startup(() => {
    if (HostelCollection.find({}).count() === 0) {
        var data = JSON.parse(Assets.getText("dummyHostels.json"));
        data.forEach(function (item, index, array) {
            HostelCollection.insert(item);
        });
        console.log('Inserted Hostels');
    }
});

Meteor.publish('allHostels', function () {
    return HostelCollection.find({}, {sort: {name: 1}});
});

Hostel = {
    addNewHostel: function(profile) {
        HostelCollection.insert(profile);
    }
}
