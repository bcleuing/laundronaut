Template.MainHeader.onRendered(function () {
    $(".button-collapse").sideNav();
    if (Session.get('lat') == undefined || Session.get('lon') == undefined) {
        navigator.geolocation.getCurrentPosition(function(position) {
            Session.set('lat', position.coords.latitude);
            Session.set('lon', position.coords.longitude);
        });
    }
});
