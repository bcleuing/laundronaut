Meteor.methods({
    addNewHostel: function(profile) {
        HostelCollection.insert(profile);
    },
});
