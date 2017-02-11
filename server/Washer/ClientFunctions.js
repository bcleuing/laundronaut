Meteor.methods({
    addNewWasher: function(profile) {
        Washer.addNewWasher(profile);
    },
    sendReserveAuthCodeSMS: function(washerId, phoneNum) {
        var possible = "0123456789";
        var authCode = "";
        for (var i = 0; i < 5; i++) authCode += possible.charAt(Math.floor(Math.random() * possible.length));
        sendMessageReminder("%2B65" + phoneNum, "Auth Code: " + authCode); // %2B65: +65 (Singapore Country Code)
        ReserveCollection.insert({
            washer_id: washerId,
            phone_num: phoneNum,
            auth_code: authCode,
            verified: false,
            create_at: new Date()
        }); // insert the reserve record to the database for reference
        return true;
    },
    checkAuthCode: function(userPhoneNum, inputAuthCode) {
        var record = ReserveCollection.find({phone_num: userPhoneNum, auth_code: inputAuthCode}, {washer_id: 1}).fetch();
        if (record.length >= 1) {
            // auth code matches, successfully verified
            var targetWasherId = record[0].washer_id;
            ReserveCollection.update({
                _id: record[0]._id,
                phone_num: userPhoneNum,
                auth_code: inputAuthCode
            }, {$set: {verified: true}});
            WasherCollection.update({_id: targetWasherId}, {$set: {status: "reserved"}});
            return true;
        } else return false;
    }
});
