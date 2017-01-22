Template.HostelMain.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allHostels');
    });
});
Template.HostelMain.helpers({
    hostels: function() {
        return HostelCollection.find();
    }
});
