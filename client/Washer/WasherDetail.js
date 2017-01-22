var washerId;

Template.WasherDetail.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allWashers');
    });
    washerId = FlowRouter.getParam('id');
});

Template.WasherDetail.helpers({
    washer: function() {
        return WasherCollection.find({_id: washerId});
    }
});
