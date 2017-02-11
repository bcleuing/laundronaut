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
            case 'reserved':
                return 'block';
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
        Session.set('reservingWasherId', washerId);
        $('#phoneNumInputModal-' + washerId).openModal();
    },
    'click .submitReserveBtn': function() {
        var washerId = Session.get('reservingWasherId');
        var userPhoneNum = $('#userPhoneNum-' + washerId).val();
        Session.set('userPhoneNum', userPhoneNum);
        Meteor.call('sendReserveAuthCodeSMS', washerId, userPhoneNum, function(err, result) {
            $('#phoneNumInputModal-' + washerId).closeModal();
            $('#authCodeInputModal-' + washerId).openModal();
        });
    },
    'click .submitAuthCodeBtn': function() {
        var washerId = Session.get('reservingWasherId');
        var authCode = $('#inputAuthCode-' + washerId).val();
        var phoneNum = Session.get('userPhoneNum');
        Meteor.call('checkAuthCode', phoneNum, authCode, function(err, result) {
            console.log(result);
            if (result) {
                Materialize.toast("The washer has been successfully reserved!", 5000);
                $('#authCodeInputModal-' + washerId).closeModal();
            }
        });
    }
});
