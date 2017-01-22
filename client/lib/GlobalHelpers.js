WasherCollection = new Mongo.Collection('washers');
HostelCollection = new Mongo.Collection('hostels');

Handlebars.registerHelper('checkEmpty', function (value) {
    return value !== '';
});
Handlebars.registerHelper('checkIsSigned', function () {
    if(Meteor.userId()) {
        return true;
    }
    return false;
});
Handlebars.registerHelper('checkSelected', function(check) {
    if(this.value == check) {
        return 'selected="selected"';
    }
    return '';
});
Handlebars.registerHelper('equals', function(a, b) {
    return a == b;
});
Handlebars.registerHelper("firstLetterToUpper", function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
});
Handlebars.registerHelper("formatDate", function(timestamp) {
    return moment(new Date(timestamp)).format('MMM D, H:mm');
});
Handlebars.registerHelper('getCurrentYear', function () {
    return moment().year();
});
Handlebars.registerHelper('getHostelGeoTag', function (id) {
    Meteor.subscribe('allHostels');
    var raw = HostelCollection.find({_id: id}).fetch();
    return (raw.length > 0) ? raw[0].geoTag : null;
});
Handlebars.registerHelper('getAllHostels', function () {
    Meteor.subscribe('allHostels');
    return HostelCollection.find({});
});
Handlebars.registerHelper("prettifyDate", function (timestamp) {
    return moment(new Date(timestamp)).fromNow();
});
