Template.WasherNew.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allHostels');
    });
});

Template.WasherNew.onRendered(function() {
    // $('select').material_select();
});

Template.WasherNew.helpers({
    hostels: function() {
        return HostelCollection.find({}, {name: 1});
    }
});

Template.WasherNew.events({
    'submit form': function(event) {
        event.preventDefault();
        var washerName = $('#washerName').val();
        var targetHostel = $('#targetHostel').val();

        if (washerName == "" || targetHostel == "") {
            Materialize.toast("Please fill in all fields.", 5000);
        } else {
            var profile = {
                name: washerName,
                status: "available",
                hostel_id: targetHostel
            }
            $('button').addClass("disabled");
            Meteor.call('addNewWasher', profile, function() {
                Materialize.toast("Washer added successfully");
                $('button').removeClass("disabled");
                $('form')[0].reset();
            });
        }
    }
})
