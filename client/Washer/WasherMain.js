Template.WasherMain.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allWashers');
        this.subscribe('allHostels');
    });
});

Template.WasherMain.helpers({
    washers: function() {
        return WasherCollection.find();
    }
});

Template.WasherCard.onRendered(function() {
    $('.tooltipped').tooltip({delay: 50});
});

Template.WasherCard.helpers({
    hostel: function(hostelId) {
        return HostelCollection.find({_id: hostelId});
    },
    getStatusColor: function() {
        var status = this.status;
        switch (status) {
            case 'available':
                return 'green';
            case 'in-use':
                return 'red';
            default:
                return 'black';
        }
    },
    getStatusIcon: function () {
        var status = this.status;
        switch (status) {
            case 'available':
                return 'check_circle';
            case 'in-use':
                return 'clear';
            default:
                return 'help_outline';
        }
    },
    inWasherPage: function() {
        var currentRoute = FlowRouter.current().route;
        return currentRoute.options.name == 'washer-home';
    },
    washerAvailable: function() {
        return this.status == 'available';
    }
});
Template.WasherCard.events({
    'click .reserveBtn': function() {
        var washerId = this._id;
        $('#phoneNumInputModal-' + washerId).openModal();
    },
    'click .submitReserveBtn': function() {
        var washerId = this._id;
        var userPhoneNum = $('#userPhoneNum-' + washerId).val();
        $('#authCodeDiv-' + washerId).show();
        $('#phoneNumDiv-' + washerId).hide();

        Meteor.call('sendReserveAuthCodeSMS', washerId, userPhoneNum, function(err, result) {

        });
    }
});
