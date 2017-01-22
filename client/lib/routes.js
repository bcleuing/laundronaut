BlazeLayout.setRoot('body');

if (Meteor.isClient) {
    /*
    Accounts.onLogin(function () {
        FlowRouter.go('home');
    });
    Accounts.onLogout(function () {
        Meteor._reload.reload();
        FlowRouter.go('home');
    });
    */
}

FlowRouter.triggers.enter([function () {
    var currentRoute = FlowRouter.current().route;
    var currentPage = currentRoute.options.name;
    Session.set('currentPage', currentPage);
    /*
    if(!Meteor.userId() && currentPage != 'home' && currentPage != 'sign-in' && currentPage != 'sign-up' && currentPage != 'sign-up-from-email-link'
        && currentPage != 'verify-email-with-id' && currentPage != 'forget-password' && currentPage != 'reset-password') {
        Session.set('signInJumpToPage', currentPage);
        FlowRouter.go('sign-in');
    }
    */
}]);

FlowRouter.route('/', {
    name: 'home',
    currentMain: 'home',
    action() {
        BlazeLayout.render('MainLayout', {main: 'Home', inverted: false});
    }
});
/*
FlowRouter.route('/sign-in', {
    name: 'sign-in',
    currentMain: 'user',
    action() {
        if(Meteor.userId()) {
            FlowRouter.go('home');
        } else {
            BlazeLayout.render('HomeLayout', {main: 'Signin', inverted: false});
        }
    }
});
FlowRouter.route('/sign-up', {
    name: 'sign-up',
    currentMain: 'user',
    action() {
        if(Meteor.userId()) {
            FlowRouter.go('home');
        } else {
            BlazeLayout.render('HomeLayout', {main: 'Signup', inverted: false});
        }
    }
});
*/
var washerRoutes = FlowRouter.group({
    prefix: '/washer',
    name: 'washer'
});
washerRoutes.route('/', {
    name: 'washer-home',
    currentMain: 'washer',
    action() {
        BlazeLayout.render('MainLayout', {main: 'WasherMain', inverted: false});
    }
});
washerRoutes.route('/detail/:id', {
    name: 'washer-detail',
    currentMain: 'washer',
    action() {
        BlazeLayout.render('MainLayout', {main: 'WasherDetail', inverted: false});
    }
});
washerRoutes.route('/new', {
    name: 'washer-new',
    currentMain: 'washer',
    action() {
        BlazeLayout.render('MainLayout', {main: 'WasherNew', inverted: false});
    }
});

var hostelRoutes = FlowRouter.group({
    prefix: '/hostel',
    name: 'hostel'
});
hostelRoutes.route('/', {
    name: 'hostel-home',
    currentMain: 'hostel',
    action() {
        BlazeLayout.render('MainLayout', {main: 'HostelMain', inverted: false});
    }
});
hostelRoutes.route('/detail/:id', {
    name: 'hostel-detail',
    currentMain: 'hostel',
    action() {
        BlazeLayout.render('MainLayout', {main: 'HostelDetail', inverted: false});
    }
});
hostelRoutes.route('/new', {
    name: 'hostel-new',
    currentMain: 'hostel',
    action() {
        BlazeLayout.render('MainLayout', {main: 'HostelNew', inverted: false});
    }
});
