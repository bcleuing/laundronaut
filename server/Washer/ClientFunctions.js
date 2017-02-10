Meteor.methods({
    addNewWasher: function(profile) {
        Washer.addNewWasher(profile);
    },
    sendReserveAuthCodeSMS: function(washerId, phoneNum) {
        var possible = "0123456789";
        var authCode = "";
        for (var i = 0; i < 5; i++) authCode += possible.charAt(Math.floor(Math.random() * possible.length));
        sendMessageReminder("%2B65" + phoneNum, "Auth Code: " + authCode); // %2B65: +65 (Singapore Country Code)
    }
});
