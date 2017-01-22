var hostelId;

Template.HostelDetail.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allHostels');
        this.subscribe('allWashers');
    });
    hostelId = FlowRouter.getParam('id');
});
Template.HostelDetail.helpers({
    hostel: function() {
        return HostelCollection.find({_id: hostelId});
    },
    washers: function() {
        return WasherCollection.find({hostel_id: hostelId});
    }
});
